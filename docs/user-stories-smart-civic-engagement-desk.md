# Pawnee Smart Civic Engagement Desk User Stories

## Epic 1: Citizen Identity and Profile

### Story 1.1

As a citizen, I want to securely sign in so that I can view my engagement dashboard.

Acceptance Criteria:

1. A citizen can sign in with a valid account.
2. Unauthorized users cannot access dashboard routes.
3. The citizen lands on the dashboard after successful sign-in.

### Story 1.2

As a citizen, I want to view my profile summary so that I understand my current tier and points balance.

Acceptance Criteria:

1. The dashboard shows total points and current tier.
2. The dashboard shows tier progress toward the next milestone when available.
3. Profile data is tailored to the signed-in citizen only.

## Epic 2: Engagement Tracking and Rewards

### Story 2.1

As a system administrator, I want to define point rules by engagement event so that participation is rewarded consistently.

Acceptance Criteria:

1. Admins can create and edit event-to-point mappings.
2. Changes are stored with audit metadata.
3. New engagement events apply the active point rule.

### Story 2.2

As a citizen, I want my engagement history displayed in a timeline so that I can see how I earned points.

Acceptance Criteria:

1. Each timeline item shows event type, date, source, and points earned.
2. The timeline is sorted newest to oldest.
3. Empty states explain how to begin earning points.

### Story 2.3

As a citizen, I want to see my civic status tier so that I feel recognized for continued participation.

Acceptance Criteria:

1. Tier labels appear on the citizen dashboard and agent profile view.
2. Tier changes occur automatically when thresholds are reached.
3. Tier-change events are recorded in history.

## Epic 3: Program Discovery and Enrollment

### Story 3.1

As a citizen, I want recommended community programs so that I can discover relevant next actions.

Acceptance Criteria:

1. The dashboard shows at least three recommended actions when available.
2. Each recommendation includes a title, description, and expected points impact when relevant.
3. Recommendations reflect the citizen's recent engagement history or preferences.

### Story 3.2

As an agent, I want to enroll a citizen in a program from the profile screen so that I can convert interest into action during an interaction.

Acceptance Criteria:

1. Agents can select an eligible program from the citizen view.
2. Enrollment submissions create a record linked to the citizen.
3. The citizen receives confirmation of the enrollment or request.

## Epic 4: Agent Service Console

### Story 4.1

As an agent, I want to search for a citizen by common identifiers so that I can quickly open the correct profile.

Acceptance Criteria:

1. Search supports name, email, phone, and resident ID.
2. Results display enough context to avoid mismatches.
3. The selected profile opens within the target performance threshold.

### Story 4.2

As an agent, I want to see the citizen's loyalty snapshot and recent engagement history so that I can personalize the conversation.

Acceptance Criteria:

1. The profile card shows points, tier, and recent activities.
2. Recent ratings and open issues are visible when applicable.
3. Data updates are based on the latest saved records.

### Story 4.3

As an agent, I want AI-generated next best actions so that I can suggest meaningful programs or follow-up steps.

Acceptance Criteria:

1. Recommendations are generated from citizen context and configured rules.
2. Each recommendation includes a rationale or context label.
3. Agents can record whether a recommendation was offered or accepted.

### Story 4.4

As an agent, I want suggested recognition prompts so that I can acknowledge the citizen's civic loyalty naturally.

Acceptance Criteria:

1. The profile view shows milestone-based recognition suggestions when applicable.
2. Prompts reference current or recent engagement context.
3. Prompts are hidden when there is no milestone signal.

### Story 4.5

As an agent, I want relevant knowledge guidance on the current profile so that I can answer program and service questions accurately.

Acceptance Criteria:

1. Knowledge suggestions are displayed in the agent workspace.
2. Suggestions can be filtered by service or program context.
3. Agents can open the full guidance without leaving the workspace.

## Epic 5: Citizen Feedback and Coaching

### Story 5.1

As a citizen, I want to rate my recent service experience so that the town can improve service quality.

Acceptance Criteria:

1. Citizens can submit a rating tied to a recent interaction.
2. Optional comments can be added.
3. Duplicate submissions for the same interaction are prevented or clearly handled.

### Story 5.2

As a supervisor, I want low-rated interactions surfaced quickly so that I can identify coaching opportunities.

Acceptance Criteria:

1. Ratings below a configurable threshold appear in a review queue.
2. The queue shows agent, location, interaction date, and citizen sentiment.
3. Supervisors can mark items as reviewed and add coaching notes.

## Epic 6: Reporting and Management Insights

### Story 6.1

As a supervisor, I want a dashboard of engagement and rating trends so that I can evaluate program health and team performance.

Acceptance Criteria:

1. The dashboard shows trend charts for participation, ratings, and enrollments.
2. Data can be filtered by date range and program.
3. Charts are exportable or shareable in a simple format.

## Epic 7: Platform Administration

### Story 7.1

As an administrator, I want to manage tiers and thresholds so that recognition levels match town policy.

Acceptance Criteria:

1. Admins can create and update tier names and thresholds.
2. Threshold changes apply to future recalculations.
3. Invalid threshold configurations are blocked.

### Story 7.2

As an administrator, I want to manage program metadata so that recommendations and enrollment experiences stay accurate.

Acceptance Criteria:

1. Admins can update program descriptions, dates, eligibility, and point values.
2. Inactive programs no longer appear in citizen recommendations.
3. Changes are reflected in both citizen and agent views.

## Priority Recommendation

### MVP Now

Stories 1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 4.1, 4.2, 4.3, 5.1, 5.2, 7.1, 7.2

### Phase 2

Stories 3.2, 4.4, 4.5, 6.1