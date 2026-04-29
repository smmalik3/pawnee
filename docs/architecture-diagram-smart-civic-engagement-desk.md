# Pawnee Smart Civic Engagement Desk Architecture

## 1. Solution Architecture (Visual)

```mermaid
flowchart LR
  subgraph Client[Citizen Experience]
    C1[React App on AWS Amplify]
  end

  subgraph Identity[Identity and Access]
    I1[Amazon Cognito\nUser Pool + App Client]
  end

  subgraph API[Application API]
    A1[API Gateway HTTP API\nJWT Authorizer]
    L1[Lambda: citizen-api\nNode.js 20]
  end

  subgraph Data[Data Layer - DynamoDB]
    D1[citizens]
    D2[programs]
    D3[engagement-events]
    D4[enrollments]
    D5[feedback]
    D6[interactions]
  end

  subgraph Ops[Operations]
    O1[CloudWatch Logs]
  end

  C1 -->|Sign-in| I1
  C1 -->|JWT token + API calls| A1
  A1 --> L1
  L1 --> D1
  L1 --> D2
  L1 --> D3
  L1 --> D4
  L1 --> D5
  L1 --> D6
  L1 --> O1
```

## 2. Primary User Flow (Visual)

```mermaid
sequenceDiagram
  participant User as Citizen
  participant App as React App
  participant Cognito as Cognito
  participant API as API Gateway
  participant Lambda as citizen-api Lambda
  participant DDB as DynamoDB

  User->>App: Sign in
  App->>Cognito: Authenticate user
  Cognito-->>App: JWT token

  User->>App: Open dashboard
  App->>API: GET /citizen/dashboard (Bearer token)
  API->>Lambda: Invoke request
  Lambda->>DDB: Read profile, events, programs, enrollments
  DDB-->>Lambda: Citizen + activity + program data
  Lambda-->>API: Dashboard payload
  API-->>App: Dashboard JSON

  User->>App: Enroll in program
  App->>API: POST /programs/{id}/enroll
  API->>Lambda: Invoke
  Lambda->>DDB: Write enrollment + event
  DDB-->>Lambda: Success
  Lambda-->>App: Enrollment confirmation

  User->>App: Submit service feedback
  App->>API: POST /feedback
  API->>Lambda: Invoke
  Lambda->>DDB: Write feedback + event
  Lambda-->>App: Feedback confirmation
```

## 3. Backend Responsibilities by Endpoint

- `GET /health`: backend health status.
- `GET /citizen/profile`: citizen identity/profile payload.
- `GET /citizen/dashboard`: points, tier, recommendations, timeline.
- `GET /programs`: active community programs.
- `POST /programs/{program_id}/enroll`: enroll and log event.
- `GET /activity`: engagement timeline.
- `GET /interactions`: service interactions available for feedback.
- `POST /feedback`: submit rating/comment with duplicate protection.

## 4. Security and Deployment Notes

- API endpoints (except health) are protected with Cognito JWT authorizer.
- Lambda has least-privilege IAM scoped to required DynamoDB tables.
- Data uses DynamoDB server-side encryption and point-in-time recovery.
- Infrastructure is provisioned via Terraform under `infra/terraform`.
- Frontend deployment is Amplify-managed and intentionally not included in Terraform per project decision.
