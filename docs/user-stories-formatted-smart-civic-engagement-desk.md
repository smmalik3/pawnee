# Pawnee Smart Civic Engagement Desk User Stories (Formatted)

# US-1: Secure citizen sign-in for dashboard access

**Type:** :large_blue_circle: User Story

## Description

Secure citizen sign-in for dashboard access.
**Description:** As a Citizen, I want to securely sign in, so that I can view my engagement dashboard.
**Acceptance Criteria:**
AC01
**GIVEN** a registered citizen is on the sign-in page
**WHEN** valid credentials are submitted
**THEN** the citizen is authenticated and redirected to the dashboard.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a registered citizen is on the sign-in page

**WHEN:** valid credentials are submitted

**THEN:** the citizen is authenticated and redirected to the dashboard.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Includes authentication flow wiring, role mapping, and protected route navigation.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Citizen sign-in flow is validated end-to-end.

---

# US-2: Show points and tier on citizen dashboard

**Type:** :large_blue_circle: User Story

## Description

Show points and tier on citizen dashboard.
**Description:** As a Citizen, I want to view my points and current tier, so that I can understand my civic engagement status.
**Acceptance Criteria:**
AC01
**GIVEN** a signed-in citizen opens the dashboard
**WHEN** profile summary loads
**THEN** points total and current tier are displayed.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a signed-in citizen opens the dashboard

**WHEN:** profile summary loads

**THEN:** points total and current tier are displayed.

## Story Points

**Estimated Effort:** 3 story points

**Justification:** UI summary cards with existing profile data bindings.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Points and tier cards are validated on citizen dashboard.

---

# US-3: Configure point rules by engagement event

**Type:** :large_blue_circle: User Story

## Description

Configure point rules by engagement event.
**Description:** As an Administrator, I want to define event-to-point mappings, so that citizen participation is rewarded consistently.
**Acceptance Criteria:**
AC01
**GIVEN** an admin opens point-rule settings
**WHEN** a rule is created or updated
**THEN** new engagement events apply the active mapping.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an admin opens point-rule settings

**WHEN:** a rule is created or updated

**THEN:** new engagement events apply the active mapping.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Requires admin CRUD, validation, and persistence with audit metadata.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Point-rule changes are auditable and validated.

---

# US-4: Display engagement history timeline

**Type:** :large_blue_circle: User Story

## Description

Display engagement history timeline.
**Description:** As a Citizen, I want to see my engagement events in a timeline, so that I can understand how I earned points.
**Acceptance Criteria:**
AC01
**GIVEN** a signed-in citizen opens activity history
**WHEN** timeline data is retrieved
**THEN** events show type, date, source, and points in newest-first order.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a signed-in citizen opens activity history

**WHEN:** timeline data is retrieved

**THEN:** events show type, date, source, and points in newest-first order.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Requires timeline component, event model mapping, and empty-state handling.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Timeline sorting and data fields are validated.

---

# US-5: Auto-update civic status tier by thresholds

**Type:** :large_blue_circle: User Story

## Description

Auto-update civic status tier by thresholds.
**Description:** As a Citizen, I want my tier to update as I earn points, so that I am recognized for continued participation.
**Acceptance Criteria:**
AC01
**GIVEN** a citizen reaches a configured threshold
**WHEN** points are recalculated
**THEN** the new tier is assigned and recorded.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a citizen reaches a configured threshold

**WHEN:** points are recalculated

**THEN:** the new tier is assigned and recorded.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Requires rules evaluation, transition logic, and event audit trail.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Tier transition logic is validated against configured thresholds.

---

# US-6: Recommend community programs to citizens

**Type:** :large_blue_circle: User Story

## Description

Recommend community programs to citizens.
**Description:** As a Citizen, I want relevant program recommendations, so that I can discover useful next actions.
**Acceptance Criteria:**
AC01
**GIVEN** a citizen opens the dashboard
**WHEN** recommendation service responds
**THEN** at least three context-aware actions are shown when available.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a citizen opens the dashboard

**WHEN:** recommendation service responds

**THEN:** at least three context-aware actions are shown when available.

## Story Points

**Estimated Effort:** 8 story points

**Justification:** Integrates recommendation logic, ranking, and UI rendering with fallback handling.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Recommendation relevance and display behavior are validated.

---

# US-7: Enroll citizen in a program from agent console

**Type:** :large_blue_circle: User Story

## Description

Enroll citizen in a program from agent console.
**Description:** As an Agent, I want to enroll a citizen in a program during an interaction, so that I can convert intent into immediate action.
**Acceptance Criteria:**
AC01
**GIVEN** an agent views a citizen profile
**WHEN** a valid program is selected and submitted
**THEN** an enrollment record is created and linked to the citizen.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an agent views a citizen profile

**WHEN:** a valid program is selected and submitted

**THEN:** an enrollment record is created and linked to the citizen.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Adds action workflow, validation, and confirmation handling.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Enrollment is visible in citizen and agent context.

---

# US-8: Search citizen profiles by common identifiers

**Type:** :large_blue_circle: User Story

## Description

Search citizen profiles by common identifiers.
**Description:** As an Agent, I want to search by name, email, phone, or resident ID, so that I can quickly open the correct citizen profile.
**Acceptance Criteria:**
AC01
**GIVEN** an agent enters a supported identifier
**WHEN** search is executed
**THEN** matching profiles are returned with enough context to select correctly.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an agent enters a supported identifier

**WHEN:** search is executed

**THEN:** matching profiles are returned with enough context to select correctly.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Requires indexed lookup across multiple fields and result formatting.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Search works for all supported identifier types.

---

# US-9: Show loyalty snapshot in agent profile view

**Type:** :large_blue_circle: User Story

## Description

Show loyalty snapshot in agent profile view.
**Description:** As an Agent, I want to see points, tier, and recent engagement at a glance, so that I can personalize service.
**Acceptance Criteria:**
AC01
**GIVEN** an agent opens a citizen profile
**WHEN** profile data loads
**THEN** points, tier, recent activity, and recent ratings are visible.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an agent opens a citizen profile

**WHEN:** profile data loads

**THEN:** points, tier, recent activity, and recent ratings are visible.

## Story Points

**Estimated Effort:** 3 story points

**Justification:** Primarily read-only summary composition from existing profile services.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Loyalty snapshot matches source data accurately.

---

# US-10: Provide AI next best actions to agents

**Type:** :large_blue_circle: User Story

## Description

Provide AI next best actions to agents.
**Description:** As an Agent, I want AI suggestions with rationale, so that I can offer tailored next steps during support.
**Acceptance Criteria:**
AC01
**GIVEN** an agent is viewing a citizen profile
**WHEN** recommendation generation is requested
**THEN** ranked actions and rationale labels are returned and displayed.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an agent is viewing a citizen profile

**WHEN:** recommendation generation is requested

**THEN:** ranked actions and rationale labels are returned and displayed.

## Story Points

**Estimated Effort:** 8 story points

**Justification:** Requires AI integration, prompt/data assembly, and response rendering.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Recommendation response quality and latency targets are validated.

---

# US-11: Show recognition prompts for loyalty milestones

**Type:** :large_blue_circle: User Story

## Description

Show recognition prompts for loyalty milestones.
**Description:** As an Agent, I want milestone-aware prompts, so that I can acknowledge citizen loyalty naturally during interactions.
**Acceptance Criteria:**
AC01
**GIVEN** a citizen profile includes a recent or current milestone
**WHEN** the agent profile loads
**THEN** a contextual recognition prompt is displayed.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a citizen profile includes a recent or current milestone

**WHEN:** the agent profile loads

**THEN:** a contextual recognition prompt is displayed.

## Story Points

**Estimated Effort:** 3 story points

**Justification:** Milestone condition checks and content display logic.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Prompt hides when no valid milestone context exists.

---

# US-12: Surface knowledge guidance in agent workspace

**Type:** :large_blue_circle: User Story

## Description

Surface knowledge guidance in agent workspace.
**Description:** As an Agent, I want context-specific guidance links, so that I can answer citizen questions accurately without leaving the workspace.
**Acceptance Criteria:**
AC01
**GIVEN** an agent is on a citizen interaction screen
**WHEN** knowledge suggestions are loaded
**THEN** relevant guidance links are shown and accessible inline.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an agent is on a citizen interaction screen

**WHEN:** knowledge suggestions are loaded

**THEN:** relevant guidance links are shown and accessible inline.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Requires contextual retrieval and embedded navigation behaviors.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Knowledge links are filterable by service/program context.

---

# US-13: Capture citizen post-service ratings

**Type:** :large_blue_circle: User Story

## Description

Capture citizen post-service ratings.
**Description:** As a Citizen, I want to rate my service interaction, so that the town can improve service quality.
**Acceptance Criteria:**
AC01
**GIVEN** a citizen has a recent eligible interaction
**WHEN** a rating and optional comment are submitted
**THEN** the feedback is stored and linked to that interaction.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a citizen has a recent eligible interaction

**WHEN:** a rating and optional comment are submitted

**THEN:** the feedback is stored and linked to that interaction.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Requires feedback form UX, idempotency handling, and persistence.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Duplicate-submission behavior is validated.

---

# US-14: Flag low-rated interactions for supervisor review

**Type:** :large_blue_circle: User Story

## Description

Flag low-rated interactions for supervisor review.
**Description:** As a Supervisor, I want low scores routed to a review queue, so that I can trigger coaching quickly.
**Acceptance Criteria:**
AC01
**GIVEN** a submitted rating is below configured threshold
**WHEN** feedback processing completes
**THEN** a review item is created in the supervisor queue.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a submitted rating is below configured threshold

**WHEN:** feedback processing completes

**THEN:** a review item is created in the supervisor queue.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Includes threshold logic, queueing behavior, and supervisor workflow fields.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Low-score queue items include agent, date, location, and status.

---

# US-15: Show supervisor trend dashboards for quality and participation

**Type:** :large_blue_circle: User Story

## Description

Show supervisor trend dashboards for quality and participation.
**Description:** As a Supervisor, I want trend dashboards for ratings, participation, and enrollments, so that I can monitor team and program health.
**Acceptance Criteria:**
AC01
**GIVEN** a supervisor opens insights
**WHEN** filters are applied
**THEN** trend charts update for the selected date range and program scope.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** a supervisor opens insights

**WHEN:** filters are applied

**THEN:** trend charts update for the selected date range and program scope.

## Story Points

**Estimated Effort:** 8 story points

**Justification:** Multi-metric aggregation, filtering, and chart rendering.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Dashboard filters and metric consistency are validated.

---

# US-16: Manage civic tier thresholds in admin console

**Type:** :large_blue_circle: User Story

## Description

Manage civic tier thresholds in admin console.
**Description:** As an Administrator, I want to manage tier names and thresholds, so that recognition rules stay aligned with policy.
**Acceptance Criteria:**
AC01
**GIVEN** an admin edits tier settings
**WHEN** a valid threshold model is saved
**THEN** future point recalculations use the updated tiers.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an admin edits tier settings

**WHEN:** a valid threshold model is saved

**THEN:** future point recalculations use the updated tiers.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Admin config validation and business-rule consistency checks.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Invalid tier overlap scenarios are blocked and validated.

---

# US-17: Maintain program metadata for recommendation quality

**Type:** :large_blue_circle: User Story

## Description

Maintain program metadata for recommendation quality.
**Description:** As an Administrator, I want to manage program metadata, so that citizen recommendations and enrollments remain accurate.
**Acceptance Criteria:**
AC01
**GIVEN** an admin updates program status or attributes
**WHEN** changes are saved
**THEN** inactive programs stop appearing in recommendations and updated metadata appears in citizen/agent views.

## Acceptance Criteria

### AC01 Scenario

**GIVEN:** an admin updates program status or attributes

**WHEN:** changes are saved

**THEN:** inactive programs stop appearing in recommendations and updated metadata appears in citizen/agent views.

## Story Points

**Estimated Effort:** 5 story points

**Justification:** Program administration impacts recommendation and enrollment behavior across surfaces.

## Definition of Done

- [ ] Solution is developed, peer reviewed, deployed and tested.
- [ ] Test case is created.
- [ ] All tasks are closed.
- [ ] Solution validated by Product Owner against acceptance criteria.
- [ ] Program metadata sync is validated across citizen and agent screens.

---