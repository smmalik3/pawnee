# Pawnee Smart Civic Engagement Desk PRD

## Product Summary

The Pawnee Smart Civic Engagement Desk is an AWS-native React application for the town of Pawnee that helps local government teams recognize, reward, and deepen citizen engagement. The product combines a citizen-facing dashboard with an internal agent workspace so staff can see a resident's engagement history, loyalty status, recent service interactions, and AI-powered next best actions during calls, emails, and in-person visits.

The original Salesforce-centered concept is replaced with an AWS-native architecture and demo target. The agent experience will live inside the React application and integrate with AWS services for identity, data, workflows, analytics, and AI assistance.

## Problem Statement

Pawnee has community participation data spread across programs, volunteer activities, feedback channels, and service interactions. Agents lack a unified view of citizen history and have no systematic way to recognize loyalty, personalize follow-up actions, or identify service quality issues. Citizens also lack a simple way to understand how their participation translates into status, opportunities, and recognition.

## Goals

1. Create a unified citizen engagement record that tracks participation, points, tiers, and service history.
2. Give agents real-time context and recommendations during service interactions.
3. Motivate citizens to participate more often through visibility, recognition, and tailored next actions.
4. Capture post-interaction ratings so supervisors can identify coaching and training needs.
5. Deliver an AWS-native demo that proves the citizen dashboard, agent console, loyalty engine, and AI guidance loop.

## Non-Goals

1. Full enterprise CRM replacement.
2. Deep case management for every municipal department in the first release.
3. Multi-town or white-label support in MVP.
4. Advanced rewards marketplace or financial redemption flows in MVP.

## Users and Personas

### Primary Personas

**Citizen Resident**
Uses the portal to view points, status, history, recommended opportunities, and to rate service experiences.

**Service Agent**
Uses the agent console to identify the citizen, understand their history, acknowledge milestones, resolve issues, and recommend relevant next actions.

**Supervisor / Program Manager**
Uses reporting views to monitor engagement trends, agent-rated experiences, coaching opportunities, and program participation performance.

**System Administrator**
Configures programs, point rules, tier thresholds, recommendation logic inputs, and access control.

## User Problems

### Citizen Problems

1. I cannot easily see how engaged I am with my town.
2. I do not know what programs or activities fit my interests.
3. I am not recognized for ongoing participation.
4. I have no transparent view of my service history or status.

### Agent Problems

1. I do not have a single view of the citizen during an interaction.
2. I cannot quickly tailor service based on the person's history and status.
3. I lack guidance on the best next action to offer.
4. I cannot easily record or act on citizen feedback quality signals.

### Management Problems

1. I cannot tie engagement activity to service outcomes.
2. I do not have a structured view of agent coaching opportunities.
3. I cannot easily see which programs drive the most community participation.

## Product Vision

Treat civic engagement like an ongoing relationship rather than a series of disconnected transactions. Every citizen interaction should feel informed, appreciative, and action-oriented.

## MVP Scope

### Citizen Experience

1. Secure sign-in.
2. Dashboard with points balance, tier/status, recent activities, and recommended next actions.
3. Engagement history timeline.
4. Post-service rating capture.
5. Program discovery and enrollment request flow.

### Agent Experience

1. Citizen lookup and profile summary.
2. Real-time loyalty snapshot with engagement history.
3. AI-generated next best actions.
4. Suggested recognition prompts for milestones.
5. Quick links to knowledge guidance for common programs and processes.
6. Ability to enroll a citizen in a program or create a follow-up task.

### Supervisor Experience

1. Ratings dashboard by agent, location, and service type.
2. Trends for participation, enrollments, and loyalty growth.
3. Coaching flags based on low ratings or repeated issue patterns.

### Admin Experience

1. Program catalog management.
2. Point rules and tier configuration.
3. Recommendation rule tuning.
4. Role-based access management.

## Future Scope

1. Contact-center telephony integration.
2. Omnichannel journey orchestration for SMS and email reminders.
3. Automated case summarization and follow-up drafting.
4. Reward redemption partnerships with local community programs.
5. Predictive churn or disengagement models.

## Key Features

### 1. Citizen Loyalty Engine

Tracks program participation, volunteering, survey responses, event attendance, and service engagement. Assigns points and updates status tiers such as Civic Supporter, Gold Citizen, and Volunteer Champion.

### 2. Citizen Dashboard

Provides transparent visibility into points, status, participation history, recommendations, and recent service interactions.

### 3. Agent Console

Shows a citizen summary card with engagement metrics, recent actions, current issues, and AI-driven recommendations for service and advocacy opportunities.

### 4. Experience Rating Loop

Allows citizens to rate service interactions and optionally add comments. Routes poor experiences into supervisor review queues.

### 5. AI Recommendation Layer

Uses AWS-hosted models and business rules to propose next best actions, recognition language, knowledge snippets, and escalation cues.

### 6. Management Insights

Aggregates service quality trends, participation outcomes, and loyalty growth so management can improve programs and training.

## Functional Requirements

### Identity and Access

1. The system must support secure authentication for citizens, agents, supervisors, and admins.
2. The system must enforce role-based access to citizen and operational data.

### Engagement Tracking

3. The system must record engagement events with event type, date, source, points earned, and related program.
4. The system must maintain a citizen points balance and current tier.
5. The system must preserve an engagement timeline view.

### Agent Workspace

6. Agents must be able to search for a citizen by name, email, phone, or resident ID.
7. The system must show the citizen's current points, tier, recent activities, and recent service ratings.
8. The system must provide AI recommendations for next best actions during the interaction.
9. The system must provide contextual knowledge guidance for the current interaction.
10. Agents must be able to enroll the citizen into eligible programs or create follow-up tasks.

### Citizen Portal

11. Citizens must be able to view their points, tier, history, and recommended actions.
12. Citizens must be able to browse programs and submit enrollment interest.
13. Citizens must be able to rate their service experience after an interaction.

### Supervisor Analytics

14. Supervisors must be able to review ratings trends and agent performance summaries.
15. The system must flag low-rated interactions for coaching review.
16. Supervisors must be able to view participation and loyalty metrics across programs.

### Administration

17. Admins must be able to define point rules per event type.
18. Admins must be able to define tier thresholds and labels.
19. Admins must be able to manage program metadata and recommendation inputs.

## Non-Functional Requirements

1. Page loads for primary dashboard views should complete within 2 seconds under normal MVP load.
2. Recommendation responses should return within 3 seconds for common agent interactions.
3. Personally identifiable information must be encrypted in transit and at rest.
4. The system must maintain auditable event history for loyalty and service actions.
5. The architecture should support phased AWS deployment with separate environments for dev, test, and prod.

## Success Metrics

1. 25% increase in repeat participation across pilot programs within 6 months.
2. 15% increase in citizen satisfaction for supported service centers.
3. 30% of agent interactions include a logged next best action or program recommendation.
4. 80% of pilot users view their citizen dashboard at least once per month.
5. 100% of low-rating interactions are visible to supervisors within one business day.

## Assumed AWS-Native Architecture

### Frontend

1. React app deployed on AWS Amplify Hosting or S3 + CloudFront.
2. Shared design system for citizen and agent interfaces.

### Backend

1. API layer with API Gateway and Lambda or AppSync for GraphQL.
2. Primary transactional store in DynamoDB or Aurora Serverless depending on relational needs.
3. Event ingestion via EventBridge.
4. Async workflows via SQS and Step Functions where needed.

### Identity and Notifications

1. Amazon Cognito for authentication.
2. SES and SNS for notifications.

### AI and Knowledge Support

1. Amazon Bedrock for recommendations, summarization, and recognition prompts.
2. Knowledge content stored in a searchable internal knowledge base.

## Risks and Open Questions

1. Which municipal systems will provide source engagement events in the pilot?
2. Will program enrollment be directly transacted in the app or submitted as a request?
3. What data retention requirements apply to service ratings and citizen comments?
4. What explanation standard is required for AI-generated recommendations?

## Demo Definition

The demo should show:

1. A citizen earning points through a community action.
2. The citizen dashboard updating points, tier, and recommendations.
3. An agent opening the citizen profile during a service interaction.
4. AI-generated recognition and next best action suggestions.
5. The citizen rating the interaction.
6. A supervisor view surfacing the rating and coaching signal.

## Delivery Recommendation

Build MVP in two phases:

1. Core platform: identity, loyalty ledger, citizen dashboard, agent console, rating capture.
2. Intelligence layer: recommendations, knowledge assist, supervisor insights, workflow automation.