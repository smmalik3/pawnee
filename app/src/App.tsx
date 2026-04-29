import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

type WorkCard = {
  title: string
  description: string
  status: 'Planned' | 'In progress' | 'MVP'
}

function SectionScreen({
  heading,
  subtitle,
  cards,
}: {
  heading: string
  subtitle: string
  cards: WorkCard[]
}) {
  return (
    <section className="screen">
      <header className="screen-header">
        <h2>{heading}</h2>
        <p>{subtitle}</p>
      </header>
      <div className="card-grid">
        {cards.map((card) => (
          <article className="work-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className={`pill ${card.status.toLowerCase().replace(' ', '-')}`}>
              {card.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  const citizenCards: WorkCard[] = [
    {
      title: 'Points and Tier Snapshot',
      description: 'Display loyalty points, current civic tier, and progress to next status.',
      status: 'MVP',
    },
    {
      title: 'Engagement Timeline',
      description: 'Track volunteering, feedback, and program participation in one feed.',
      status: 'MVP',
    },
    {
      title: 'Recommended Actions',
      description: 'Show AI-guided next actions based on recent participation patterns.',
      status: 'In progress',
    },
  ]

  const agentCards: WorkCard[] = [
    {
      title: 'Citizen Lookup',
      description: 'Search by name, email, phone, or resident ID from one entry point.',
      status: 'MVP',
    },
    {
      title: 'Interaction Snapshot',
      description: 'Present loyalty history, recent interactions, and service notes for context.',
      status: 'In progress',
    },
    {
      title: 'Next Best Action',
      description: 'Provide recommendations and recognition prompts during live support.',
      status: 'Planned',
    },
  ]

  const supervisorCards: WorkCard[] = [
    {
      title: 'Service Ratings Queue',
      description: 'Surface low-rated interactions for review and coaching follow-up.',
      status: 'MVP',
    },
    {
      title: 'Trend Analytics',
      description: 'Track participation and service quality trends by date, location, and program.',
      status: 'Planned',
    },
  ]

  const adminCards: WorkCard[] = [
    {
      title: 'Point Rules',
      description: 'Configure event-to-point mappings that drive the loyalty engine.',
      status: 'Planned',
    },
    {
      title: 'Tier Configuration',
      description: 'Set thresholds and tier labels such as Gold Citizen and Volunteer Champion.',
      status: 'Planned',
    },
    {
      title: 'Program Catalog',
      description: 'Manage active civic programs and recommendation metadata.',
      status: 'Planned',
    },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Pawnee Smart Civic Engagement Desk</h1>
          <p>AWS-native React foundation for citizen loyalty and service operations.</p>
        </div>
        <nav aria-label="Experience navigation" className="top-nav">
          <NavLink to="/" end>
            Overview
          </NavLink>
          <NavLink to="/citizen">Citizen</NavLink>
          <NavLink to="/agent">Agent</NavLink>
          <NavLink to="/supervisor">Supervisor</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="screen">
                <header className="screen-header">
                  <h2>Scaffold Overview</h2>
                  <p>
                    This starter app is organized around four product surfaces to map directly to
                    the PRD and story epics.
                  </p>
                </header>
                <div className="milestone-list">
                  <article>
                    <h3>Phase 1</h3>
                    <p>Identity, loyalty ledger, citizen dashboard, and agent profile shell.</p>
                  </article>
                  <article>
                    <h3>Phase 2</h3>
                    <p>Recommendations, feedback loop, supervisor queue, and admin tooling.</p>
                  </article>
                </div>
              </section>
            }
          />
          <Route
            path="/citizen"
            element={
              <SectionScreen
                heading="Citizen Dashboard"
                subtitle="Track participation, status progression, and recommended opportunities."
                cards={citizenCards}
              />
            }
          />
          <Route
            path="/agent"
            element={
              <SectionScreen
                heading="Agent Console"
                subtitle="Give frontline agents fast context and actionable recommendations."
                cards={agentCards}
              />
            }
          />
          <Route
            path="/supervisor"
            element={
              <SectionScreen
                heading="Supervisor Insights"
                subtitle="Track service quality and identify coaching opportunities."
                cards={supervisorCards}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <SectionScreen
                heading="Admin Configuration"
                subtitle="Manage rules, tiers, and program metadata for the platform."
                cards={adminCards}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
