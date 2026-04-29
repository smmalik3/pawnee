# Pawnee Smart Civic Engagement Desk UI Wireframes

These are low-fidelity UI wireframes for the React app. They are intentionally structural, not visual design comps.

## 1. Citizen Dashboard

```text
+--------------------------------------------------------------------------------------------------+
| Pawnee Civic Engagement                                                 [Bell] [Profile Avatar] |
+--------------------------------------------------------------------------------------------------+
| Dashboard | Programs | Activity | Profile                                                       |
+--------------------------------------------------------------------------------------------------+
| +--------------------------+  +--------------------------+  +-------------------------------+   |
| | Points Balance           |  | Current Tier             |  | Next Milestone Progress       |   |
| | 1,240 pts                |  | Gold Citizen             |  | 76% to Volunteer Champion     |   |
| +--------------------------+  +--------------------------+  +-------------------------------+   |
+--------------------------------------------------------------------------------------------------+
| +-------------------------------------------+  +----------------------------------------------+ |
| | Recommended Next Actions                   |  | Engagement History Timeline                  | |
| | - Tree Planting (Sat) +10 pts             |  | [04/22] Volunteer Shift ............ +20     | |
| | - Public Feedback Survey +5 pts           |  | [04/19] Community Survey ........... +5      | |
| | - Parks Cleanup +15 pts                    |  | [04/12] Town Hall Attendance ....... +8      | |
| +-------------------------------------------+  +----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
| +----------------------------------------------------------------------------------------------+ |
| | Upcoming Community Opportunities                                                            | |
| | - Neighborhood Watch Intro | May 4 | Register                                               | |
| | - Youth Sports Volunteering | May 6 | Register                                               | |
| +----------------------------------------------------------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
| Rate your latest service experience: [1] [2] [3] [4] [5]     [Submit Feedback]                 |
+--------------------------------------------------------------------------------------------------+
```

## 2. Agent Console

```text
+--------------------------------------------------------------------------------------------------+
| Pawnee Agent Console                                           Agent: Leslie K.   Shift: Active |
+--------------------------------------------------------------------------------------------------+
| +------------------------------+ +--------------------------------------+ +--------------------+ |
| | Citizen Search               | | Citizen Summary                      | | AI Assistant       | |
| | [Name/Email/Phone/ID_____]   | | Name: Ann Perkins                   | | Next Best Actions  | |
| | [Search]                     | | Tier: Gold Citizen | Points: 1240   | | 1) Suggest Tree    | |
| |                              | | Recent Milestone: 1yr Volunteer     | |    Planting +10    | |
| | Recent Profiles              | |--------------------------------------| | 2) Offer Survey    | |
| | - Ann Perkins                | | Recent Engagement                    | |    +5 points       | |
| | - Ben Wyatt                  | | - Town Hall (Apr 12)                | |--------------------| |
| | - April Ludgate              | | - Volunteer Shift (Apr 22)          | | Recognition Prompt | |
| |                              | |--------------------------------------| | "Thanks for your   | |
| |                              | | Current Issues / Interactions        | | continued service" | |
| |                              | | - Permit question (open)             | |--------------------| |
| |                              | | - Address update (resolved)          | | Knowledge Guidance | |
| |                              | +--------------------------------------+ | - Permit KB #44    | |
| |                              |                                         | - Volunteer Policy  | |
| |                              |                                         |--------------------| |
| |                              |                                         | Quick Actions       | |
| |                              |                                         | [Enroll Program]    | |
| |                              |                                         | [Create Follow-up]  | |
| |                              |                                         | [Escalate]          | |
| +------------------------------+ +--------------------------------------+ +--------------------+ |
+--------------------------------------------------------------------------------------------------+
```

## 3. Supervisor Insights

```text
+--------------------------------------------------------------------------------------------------+
| Pawnee Supervisor Insights                                                   Supervisor: R. Swanson|
+--------------------------------------------------------------------------------------------------+
| Filters: [Date Range v] [Program v] [Agent v] [Service Location v] [Apply] [Reset]             |
+--------------------------------------------------------------------------------------------------+
| +-------------------------------------------+  +----------------------------------------------+ |
| | Service Rating Trend                       |  | Low-Rating Review Queue                      | |
| | (line chart area)                          |  | #1023 | Agent: L. Knope | Rating: 2 | Open   | |
| | Avg this month: 4.1                        |  | #1029 | Agent: J. Traeger | Rating: 1 | Open | |
| +-------------------------------------------+  | #1031 | Agent: D. Meagle | Rating: 2 | Review| |
|                                                +----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
| +-------------------------------------------+  +----------------------------------------------+ |
| | Participation & Loyalty Trends            |  | Coaching Notes Summary                       | |
| | (bar/area chart area)                     |  | - 4 notes added this week                    | |
| | Enrollments up 12%                        |  | - 2 recurring issue patterns                 | |
| +-------------------------------------------+  +----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

## 4. Admin Configuration

```text
+--------------------------------------------------------------------------------------------------+
| Pawnee Admin Configuration                                                        Admin: T. Haverford|
+--------------------------------------------------------------------------------------------------+
| Tabs: [Programs] [Point Rules] [Tiers] [Recommendation Settings]                                |
+--------------------------------------------------------------------------------------------------+
| Programs Tab (example active)                                                                     |
| +----------------------------------------------------------------------------------------------+ |
| | Program Name              | Status | Points | Eligibility         | Last Updated            | |
| | Tree Planting             | Active | 10     | All Residents       | 2026-04-21              | |
| | Town Hall Feedback Survey | Active | 5      | Signed-in Citizens  | 2026-04-18              | |
| | Weekend Cleanup           | Draft  | 15     | Volunteers          | 2026-04-25              | |
| +----------------------------------------------------------------------------------------------+ |
| [Add Program] [Edit Selected] [Deactivate Selected]                                              |
+--------------------------------------------------------------------------------------------------+
| Audit Metadata: Last change by admin@pawnee.gov on 2026-04-25 14:20                             |
| [Save Changes] [Cancel]                                                                           |
+--------------------------------------------------------------------------------------------------+
```

## 5. Feedback Submission State

```text
+--------------------------------------------------------------------------------------------------+
| Service Interaction Complete                                                                       |
+--------------------------------------------------------------------------------------------------+
| Help us improve your experience                                                                    |
|                                                                                                    |
| Rate your interaction                                                                              |
| [ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ]                                                                      |
|                                                                                                    |
| Optional comments                                                                                  |
| +----------------------------------------------------------------------------------------------+ |
| |                                                                                              | |
| |                                                                                              | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                    |
| [Submit Feedback]                                                                                  |
+--------------------------------------------------------------------------------------------------+

Success state:
+--------------------------------------------------------------------------------------------------+
| Thank you for your feedback. Your response has been recorded.                                      |
| [Back to Dashboard]                                                                                |
+--------------------------------------------------------------------------------------------------+

Error state:
+--------------------------------------------------------------------------------------------------+
| We could not submit your feedback right now. Please try again.                                    |
| [Try Again] [Contact Support]                                                                      |
+--------------------------------------------------------------------------------------------------+
```

## Responsive Notes

1. On mobile, convert multi-column layouts into a single-column stack in this order:
Citizen: Summary cards, recommendations, timeline, opportunities, rating.
Agent: Search, summary, AI panel, quick actions.
Supervisor: Filters, queue, rating trend, participation trend, coaching notes.
Admin: Tabs, table cards, audit bar, action buttons.
2. Keep key CTAs visible without horizontal scrolling.
3. Preserve readable labels for all cards and sections at small widths.
