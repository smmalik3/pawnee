import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const citizensTable = process.env.CITIZENS_TABLE;
const programsTable = process.env.PROGRAMS_TABLE;
const engagementEventsTable = process.env.ENGAGEMENT_EVENTS_TABLE;
const enrollmentsTable = process.env.ENROLLMENTS_TABLE;
const feedbackTable = process.env.FEEDBACK_TABLE;
const interactionsTable = process.env.INTERACTIONS_TABLE;

const TIERS = [
  { name: "Civic Supporter", minPoints: 0 },
  { name: "Gold Citizen", minPoints: 40 },
  { name: "Volunteer Champion", minPoints: 80 },
];

const json = (statusCode, payload) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const nowIso = () => new Date().toISOString();

function parseBody(event) {
  if (!event.body || event.isBase64Encoded) return {};
  try {
    return JSON.parse(event.body);
  } catch {
    return {};
  }
}

function getClaims(event) {
  return event?.requestContext?.authorizer?.jwt?.claims ?? {};
}

function getUserId(event) {
  const claims = getClaims(event);
  return (
    claims["custom:resident_id"] || claims.email || claims.sub || "PAW-10027"
  );
}

function getEmail(event) {
  return getClaims(event).email || "ann.perkins@pawnee.gov";
}

async function safeSeedPut(commandInput) {
  try {
    await ddb.send(new PutCommand(commandInput));
  } catch (error) {
    if (error.name !== "ConditionalCheckFailedException") {
      throw error;
    }
  }
}

async function ensureSeedData(citizenId, email) {
  const existing = await ddb.send(
    new GetCommand({
      TableName: citizensTable,
      Key: { citizen_id: citizenId },
    }),
  );

  if (existing.Item) return;

  await ddb.send(
    new PutCommand({
      TableName: citizensTable,
      Item: {
        citizen_id: citizenId,
        name: "Ann Perkins",
        email,
        neighborhood: "Southside",
        interests: ["Environment", "Volunteer", "Neighborhood"],
        created_at: nowIso(),
      },
    }),
  );

  const baseEvents = [
    {
      event_ts: "2026-04-12T10:00:00.000Z",
      title: "Town Hall Attendance",
      source: "Civic Voice",
      points: 8,
    },
    {
      event_ts: "2026-04-22T15:00:00.000Z",
      title: "Volunteer Shift - Community Garden",
      source: "Volunteer Program",
      points: 20,
    },
    {
      event_ts: "2026-04-25T09:30:00.000Z",
      title: "Public Feedback Survey Completed",
      source: "Citizen Survey",
      points: 5,
    },
  ];

  for (const event of baseEvents) {
    await safeSeedPut({
      TableName: engagementEventsTable,
      Item: {
        citizen_id: citizenId,
        event_ts: event.event_ts,
        title: event.title,
        source: event.source,
        points: event.points,
      },
      ConditionExpression:
        "attribute_not_exists(citizen_id) AND attribute_not_exists(event_ts)",
    });
  }

  const interactions = [
    {
      interaction_id: "s1",
      date: "2026-04-20",
      topic: "Permit Status Clarification",
      channel: "Phone",
    },
    {
      interaction_id: "s2",
      date: "2026-04-26",
      topic: "Streetlight Outage Follow-up",
      channel: "In person",
    },
  ];

  for (const interaction of interactions) {
    await safeSeedPut({
      TableName: interactionsTable,
      Item: {
        citizen_id: citizenId,
        interaction_id: interaction.interaction_id,
        date: interaction.date,
        topic: interaction.topic,
        channel: interaction.channel,
      },
      ConditionExpression:
        "attribute_not_exists(citizen_id) AND attribute_not_exists(interaction_id)",
    });
  }
}

function getTier(points) {
  let currentIndex = 0;
  TIERS.forEach((tier, idx) => {
    if (points >= tier.minPoints) currentIndex = idx;
  });

  const current = TIERS[currentIndex];
  const next = TIERS[currentIndex + 1];
  if (!next) {
    return { name: current.name, progress: 100 };
  }

  const span = next.minPoints - current.minPoints;
  const progress = Math.round(((points - current.minPoints) / span) * 100);
  return { name: current.name, progress: Math.max(0, Math.min(100, progress)) };
}

async function listPrograms() {
  const result = await ddb.send(
    new ScanCommand({
      TableName: programsTable,
    }),
  );

  return (result.Items || []).sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

async function listEnrollments(citizenId) {
  const result = await ddb.send(
    new QueryCommand({
      TableName: enrollmentsTable,
      KeyConditionExpression: "citizen_id = :cid",
      ExpressionAttributeValues: {
        ":cid": citizenId,
      },
    }),
  );

  return result.Items || [];
}

async function listEvents(citizenId) {
  const result = await ddb.send(
    new QueryCommand({
      TableName: engagementEventsTable,
      KeyConditionExpression: "citizen_id = :cid",
      ExpressionAttributeValues: {
        ":cid": citizenId,
      },
      ScanIndexForward: false,
    }),
  );

  return result.Items || [];
}

async function routeProfile(citizenId) {
  const result = await ddb.send(
    new GetCommand({
      TableName: citizensTable,
      Key: { citizen_id: citizenId },
    }),
  );

  if (!result.Item) return json(404, { message: "Citizen profile not found" });
  return json(200, { profile: result.Item });
}

async function routeDashboard(citizenId) {
  const [profileResult, events, enrollments, allPrograms] = await Promise.all([
    ddb.send(
      new GetCommand({
        TableName: citizensTable,
        Key: { citizen_id: citizenId },
      }),
    ),
    listEvents(citizenId),
    listEnrollments(citizenId),
    listPrograms(),
  ]);

  const profile = profileResult.Item || {};
  const points = events.reduce((sum, item) => sum + Number(item.points || 0), 0);
  const tier = getTier(points);

  const enrolledProgramIds = new Set(enrollments.map((item) => item.program_id));
  const interests = new Set(profile.interests || []);

  const recommendations = allPrograms
    .filter((program) => program.active && !enrolledProgramIds.has(program.program_id))
    .sort((a, b) => {
      const aPriority = interests.has(a.category) ? 0 : 1;
      const bPriority = interests.has(b.category) ? 0 : 1;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return Number(b.points || 0) - Number(a.points || 0);
    })
    .slice(0, 3);

  return json(200, {
    points,
    tier: tier.name,
    tier_progress: tier.progress,
    recommendations,
    timeline: events,
    enrolled_programs: enrollments,
  });
}

async function routePrograms() {
  return json(200, { programs: await listPrograms() });
}

async function routeEnroll(citizenId, programId) {
  if (!programId) return json(400, { message: "program_id route parameter is required" });

  const programResult = await ddb.send(
    new GetCommand({
      TableName: programsTable,
      Key: { program_id: programId },
    }),
  );

  if (!programResult.Item) return json(404, { message: "Program not found" });
  if (!programResult.Item.active) return json(400, { message: "Program is inactive" });

  try {
    await ddb.send(
      new PutCommand({
        TableName: enrollmentsTable,
        Item: {
          citizen_id: citizenId,
          program_id: programId,
          enrolled_at: nowIso(),
          program_title: programResult.Item.title,
          category: programResult.Item.category,
          points: Number(programResult.Item.points || 0),
        },
        ConditionExpression:
          "attribute_not_exists(citizen_id) AND attribute_not_exists(program_id)",
      }),
    );
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return json(409, { message: "Citizen is already enrolled in this program" });
    }
    throw error;
  }

  await ddb.send(
    new PutCommand({
      TableName: engagementEventsTable,
      Item: {
        citizen_id: citizenId,
        event_ts: nowIso(),
        title: `Enrolled: ${programResult.Item.title}`,
        source: "Program Enrollment",
        points: Number(programResult.Item.points || 0),
      },
    }),
  );

  return json(201, { message: "Enrollment successful", program: programResult.Item });
}

async function routeActivity(citizenId) {
  return json(200, { timeline: await listEvents(citizenId) });
}

async function routeInteractions(citizenId) {
  const result = await ddb.send(
    new QueryCommand({
      TableName: interactionsTable,
      KeyConditionExpression: "citizen_id = :cid",
      ExpressionAttributeValues: {
        ":cid": citizenId,
      },
      ScanIndexForward: false,
    }),
  );

  return json(200, { interactions: result.Items || [] });
}

async function routeFeedback(citizenId, event) {
  const body = parseBody(event);
  const interactionId = body.interaction_id;
  const rating = Number(body.rating);
  const comment = body.comment || "";

  if (!interactionId || !rating) {
    return json(400, { message: "interaction_id and rating are required" });
  }

  if (rating < 1 || rating > 5) {
    return json(400, { message: "rating must be between 1 and 5" });
  }

  const interaction = await ddb.send(
    new GetCommand({
      TableName: interactionsTable,
      Key: {
        citizen_id: citizenId,
        interaction_id: interactionId,
      },
    }),
  );

  if (!interaction.Item) return json(404, { message: "Interaction not found" });

  try {
    await ddb.send(
      new PutCommand({
        TableName: feedbackTable,
        Item: {
          citizen_id: citizenId,
          interaction_id: interactionId,
          rating,
          comment,
          submitted_at: nowIso(),
        },
        ConditionExpression:
          "attribute_not_exists(citizen_id) AND attribute_not_exists(interaction_id)",
      }),
    );
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return json(409, { message: "Feedback already submitted for this interaction" });
    }
    throw error;
  }

  await ddb.send(
    new PutCommand({
      TableName: engagementEventsTable,
      Item: {
        citizen_id: citizenId,
        event_ts: nowIso(),
        title: "Service feedback submitted",
        source: "Service Quality",
        points: 2,
      },
    }),
  );

  return json(201, { message: "Feedback submitted" });
}

export async function handler(event) {
  const method = event?.requestContext?.http?.method || "GET";
  const path = event?.rawPath || "/";

  if (method === "GET" && path === "/health") {
    return json(200, { status: "ok", service: "pawnee-citizen-api" });
  }

  const citizenId = getUserId(event);
  const email = getEmail(event);
  await ensureSeedData(citizenId, email);

  if (method === "GET" && path === "/citizen/profile") {
    return routeProfile(citizenId);
  }

  if (method === "GET" && path === "/citizen/dashboard") {
    return routeDashboard(citizenId);
  }

  if (method === "GET" && path === "/programs") {
    return routePrograms();
  }

  if (method === "POST" && path.startsWith("/programs/") && path.endsWith("/enroll")) {
    const parts = path.split("/").filter(Boolean);
    const programId = parts.length === 3 ? parts[1] : "";
    return routeEnroll(citizenId, programId);
  }

  if (method === "GET" && path === "/activity") {
    return routeActivity(citizenId);
  }

  if (method === "GET" && path === "/interactions") {
    return routeInteractions(citizenId);
  }

  if (method === "POST" && path === "/feedback") {
    return routeFeedback(citizenId, event);
  }

  return json(404, { message: `No route for ${method} ${path}` });
}
