# Pawnee Smart Civic Engagement Desk Test Cases

## Functional Test Cases

### Authentication and Access

1. Verify a citizen can sign in and reach only citizen routes.
2. Verify an agent can sign in and reach only agent-authorized routes.
3. Verify a supervisor can access ratings analytics unavailable to citizens.
4. Verify session expiration redirects the user to sign-in.

### Loyalty and Engagement Ledger

5. Verify an engagement event adds the correct number of points.
6. Verify tier status updates when a threshold is crossed.
7. Verify the engagement timeline shows the newest event first.
8. Verify an unknown event type is rejected or handled safely.

### Citizen Dashboard

9. Verify the dashboard displays points, tier, and recent activities.
10. Verify recommendations render when recommendation data exists.
11. Verify the empty state appears for a citizen with no history.
12. Verify program recommendations do not show inactive programs.

### Agent Console

13. Verify search returns the correct citizen for name, email, phone, and resident ID.
14. Verify the profile panel shows current points, tier, recent events, and recent ratings.
15. Verify recommendation responses include a rationale label.
16. Verify an agent can record whether a recommendation was offered.
17. Verify program enrollment from the agent console creates a linked record.

### Experience Rating and Coaching

18. Verify a citizen can submit one rating per supported interaction.
19. Verify low ratings appear in the supervisor review queue.
20. Verify a supervisor can add coaching notes and mark an item reviewed.
21. Verify ratings trends aggregate correctly by agent and date range.

### Administration

22. Verify admins can change point rules.
23. Verify admins can change tier thresholds without invalid overlaps.
24. Verify program metadata updates are reflected in recommendation results.

## Non-Functional Test Cases

1. Verify dashboard load time remains within target for representative pilot data.
2. Verify recommendation calls stay within response targets under normal concurrent agent load.
3. Verify role-based data restrictions prevent cross-user data leakage.
4. Verify audit entries are created for tier and point-rule changes.
5. Verify encryption and secure transport are enforced for sensitive user data.

## Demo Test Script

1. Log in as a citizen and show dashboard points, tier, and recommendations.
2. Trigger a new engagement event and verify the dashboard reflects the updated total.
3. Log in as an agent and search for that citizen.
4. Show the agent profile, AI next best action, and recognition prompt.
5. Complete a service interaction and submit a citizen rating.
6. Log in as a supervisor and verify the interaction appears in the insights view.