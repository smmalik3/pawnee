# Build Plan: Pawnee Smart Civic Engagement Desk

## Recommended Implementation Order

### Sprint 1: Foundation

1. Set up React application structure.
2. Set up authentication and role-aware routing.
3. Create base data model for citizens, engagement events, tiers, programs, and ratings.
4. Build citizen dashboard shell and agent console shell.

### Sprint 2: Loyalty Core

1. Implement engagement ledger and points calculation.
2. Implement citizen dashboard cards and activity timeline.
3. Build citizen search and agent profile summary.

### Sprint 3: Intelligence and Feedback

1. Add recommendation service integration.
2. Add recognition prompts and knowledge guidance surfaces.
3. Add service rating capture and supervisor queue.

### Sprint 4: Reporting and Demo Polish

1. Add supervisor trend views.
2. Add admin configuration screens.
3. Seed realistic demo data and walkthrough scripts.
4. Harden deploy pipeline for AWS environments.

## Suggested Initial Data Model

1. Citizen
2. EngagementEvent
3. Program
4. Enrollment
5. LoyaltyTier
6. ServiceInteraction
7. ExperienceRating
8. Recommendation

## Build Decision to Make First

Choose whether the backend will be:

1. GraphQL-first with AppSync.
2. REST-first with API Gateway and Lambda.

GraphQL is likely the better fit if the citizen dashboard and agent console both need flexible, shared profile data.