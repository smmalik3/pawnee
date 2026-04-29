import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown'
import 'reveal.js/reveal.css'
import './App.css'
import deckMarkdown from './deck/pawnee-business-case-deck.md?raw'

type Program = {
  id: string
  title: string
  description: string
  date: string
  category: 'Environment' | 'Neighborhood' | 'Civic Voice' | 'Volunteer'
  points: number
  active: boolean
}

type EngagementEvent = {
  id: string
  title: string
  date: string
  source: string
  points: number
}

type ServiceInteraction = {
  id: string
  topic: string
  channel: 'Phone' | 'Email' | 'In person'
  date: string
}

type PersistedState = {
  enrolledProgramIds: string[]
  feedback: Record<string, { rating: number; comment: string }>
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const CITIZEN = {
  name: 'Ann Perkins',
  residentId: 'PAW-10027',
  email: 'ann.perkins@pawnee.gov',
  neighborhood: 'Southside',
  interests: ['Environment', 'Volunteer', 'Neighborhood'],
}

const STORAGE_KEY = 'pawnee-citizen-state-v1'
const PASSWORD = 'pawnee2026'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_ROOT = (API_BASE_URL ?? '').replace(/\/+$/, '')

const BASE_EVENTS: EngagementEvent[] = [
  { id: 'e1', title: 'Town Hall Attendance', date: '2026-04-12', source: 'Civic Voice', points: 8 },
  {
    id: 'e2',
    title: 'Volunteer Shift - Community Garden',
    date: '2026-04-22',
    source: 'Volunteer Program',
    points: 20,
  },
  {
    id: 'e3',
    title: 'Public Feedback Survey Completed',
    date: '2026-04-25',
    source: 'Citizen Survey',
    points: 5,
  },
]

const PROGRAMS: Program[] = [
  {
    id: 'p1',
    title: 'Tree Planting Week',
    description: 'Join a neighborhood tree planting team this Saturday morning.',
    date: '2026-05-03',
    category: 'Environment',
    points: 10,
    active: true,
  },
  {
    id: 'p2',
    title: 'Parks Cleanup Crew',
    description: 'Help clean and restore public parks with the municipal team.',
    date: '2026-05-08',
    category: 'Neighborhood',
    points: 15,
    active: true,
  },
  {
    id: 'p3',
    title: 'Youth Reading Mentors',
    description: 'Volunteer at after-school reading circles hosted at city libraries.',
    date: '2026-05-12',
    category: 'Volunteer',
    points: 25,
    active: true,
  },
  {
    id: 'p4',
    title: 'Transit Advisory Listening Session',
    description: 'Share ideas to improve local transit routes and rider service quality.',
    date: '2026-05-18',
    category: 'Civic Voice',
    points: 12,
    active: true,
  },
]

const INTERACTIONS: ServiceInteraction[] = [
  { id: 's1', topic: 'Permit Status Clarification', channel: 'Phone', date: '2026-04-20' },
  { id: 's2', topic: 'Streetlight Outage Follow-up', channel: 'In person', date: '2026-04-26' },
]

const TIERS = [
  { name: 'Civic Supporter', minPoints: 0 },
  { name: 'Gold Citizen', minPoints: 40 },
  { name: 'Volunteer Champion', minPoints: 80 },
]

function loadPersistedState(): PersistedState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { enrolledProgramIds: [], feedback: {} }
  }

  try {
    const parsed = JSON.parse(raw) as PersistedState
    return {
      enrolledProgramIds: parsed.enrolledProgramIds ?? [],
      feedback: parsed.feedback ?? {},
    }
  } catch {
    return { enrolledProgramIds: [], feedback: {} }
  }
}

function getCurrentTier(points: number): string {
  return [...TIERS].reverse().find((tier) => points >= tier.minPoints)?.name ?? TIERS[0].name
}

function getProgressToNextTier(points: number): number {
  const currentIndex = TIERS.findIndex((tier, index) => {
    const next = TIERS[index + 1]
    return points >= tier.minPoints && (!next || points < next.minPoints)
  })

  const current = TIERS[currentIndex]
  const next = TIERS[currentIndex + 1]

  if (!next) {
    return 100
  }

  const span = next.minPoints - current.minPoints
  return Math.min(100, Math.round(((points - current.minPoints) / span) * 100))
}

function LoginScreen({ onLogin }: { onLogin: (userId: string, password: string) => boolean }) {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const success = onLogin(userId.trim(), password)
    if (!success) {
      setError('Invalid credentials. Try resident ID PAW-10027 with the provided demo password.')
      return
    }
    setError('')
  }

  return (
    <div className="auth-shell">
      <section className="auth-panel">
        <h1>Pawnee Citizen Portal</h1>
        <p>Track engagement, enroll in programs, and share service feedback.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Resident ID or Email
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="PAW-10027"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="pawnee2026"
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit">Sign in</button>
        </form>
        <small>Demo login: resident ID PAW-10027, password pawnee2026</small>
      </section>
    </div>
  )
}

function DashboardScreen({
  points,
  tier,
  tierProgress,
  nextActions,
  timeline,
}: {
  points: number
  tier: string
  tierProgress: number
  nextActions: Program[]
  timeline: EngagementEvent[]
}) {
  return (
    <section className="screen-grid">
      <div className="metric-grid">
        <article className="metric-card">
          <p className="eyebrow">Points Balance</p>
          <h2>{points} pts</h2>
        </article>
        <article className="metric-card">
          <p className="eyebrow">Current Tier</p>
          <h2>{tier}</h2>
        </article>
        <article className="metric-card">
          <p className="eyebrow">Progress to Next Milestone</p>
          <h2>{tierProgress}%</h2>
          <div className="progress-track">
            <span style={{ width: `${tierProgress}%` }} />
          </div>
        </article>
      </div>

      <div className="panel-grid">
        <article className="panel">
          <h3>AI-Powered Recommended Next Actions</h3>
          <ul>
            {nextActions.map((action) => (
              <li key={action.id}>
                <strong>{action.title}</strong>
                <p>
                  {action.description} ({action.points} points)
                </p>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h3>Recent Engagement History</h3>
          <ul>
            {timeline.slice(0, 4).map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong>
                <p>
                  {event.date} • {event.source} • +{event.points} pts
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

function ProgramsScreen({
  enrolledProgramIds,
  onEnroll,
}: {
  enrolledProgramIds: string[]
  onEnroll: (programId: string) => void
}) {
  return (
    <section className="screen-grid">
      <header>
        <h2>Community Programs</h2>
        <p>Enroll directly in upcoming opportunities and earn loyalty points.</p>
      </header>
      <div className="program-list">
        {PROGRAMS.map((program) => {
          const enrolled = enrolledProgramIds.includes(program.id)
          return (
            <article className="panel" key={program.id}>
              <div className="panel-head">
                <h3>{program.title}</h3>
                <span className="badge">{program.category}</span>
              </div>
              <p>{program.description}</p>
              <p>
                Date: {program.date} • Points: +{program.points}
              </p>
              <button onClick={() => onEnroll(program.id)} disabled={enrolled || !program.active}>
                {enrolled ? 'Enrolled' : 'Enroll now'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ActivityScreen({ timeline }: { timeline: EngagementEvent[] }) {
  return (
    <section className="screen-grid">
      <header>
        <h2>Engagement Timeline</h2>
        <p>Every activity updates your civic footprint and loyalty status.</p>
      </header>
      <div className="timeline">
        {timeline.map((event) => (
          <article className="timeline-item" key={event.id}>
            <div>
              <strong>{event.title}</strong>
              <p>{event.source}</p>
            </div>
            <div className="timeline-meta">
              <span>{event.date}</span>
              <span>+{event.points} pts</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FeedbackScreen({
  feedback,
  onSubmitFeedback,
}: {
  feedback: PersistedState['feedback']
  onSubmitFeedback: (interactionId: string, rating: number, comment: string) => boolean
}) {
  const [selectedInteraction, setSelectedInteraction] = useState(INTERACTIONS[0]?.id ?? '')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const success = onSubmitFeedback(selectedInteraction, rating, comment)
    if (!success) {
      setMessage('You already submitted feedback for this interaction.')
      return
    }

    setComment('')
    setMessage('Feedback submitted. Thank you for helping Pawnee improve service quality.')
  }

  return (
    <section className="screen-grid">
      <header>
        <h2>Rate Your Service Experience</h2>
        <p>Your feedback helps supervisors identify coaching opportunities quickly.</p>
      </header>
      <form className="panel feedback-form" onSubmit={handleSubmit}>
        <label>
          Interaction
          <select
            value={selectedInteraction}
            onChange={(event) => setSelectedInteraction(event.target.value)}
          >
            {INTERACTIONS.map((entry) => {
              const submitted = Boolean(feedback[entry.id])
              return (
                <option key={entry.id} value={entry.id}>
                  {entry.date} - {entry.topic} ({entry.channel}){submitted ? ' - already rated' : ''}
                </option>
              )
            })}
          </select>
        </label>
        <label>
          Rating
          <input
            type="range"
            min={1}
            max={5}
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          />
          <span>{rating} / 5</span>
        </label>
        <label>
          Comment (optional)
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={4}
            placeholder="Tell us what went well or what we should improve."
          />
        </label>
        {message ? <p className="form-success">{message}</p> : null}
        <button type="submit">Submit feedback</button>
      </form>
    </section>
  )
}

function ProfileScreen() {
  return (
    <section className="screen-grid">
      <header>
        <h2>My Citizen Profile</h2>
        <p>Review your resident details, interests, and current engagement status.</p>
      </header>
      <article className="panel profile-grid">
        <div>
          <p className="eyebrow">Resident Name</p>
          <h3>{CITIZEN.name}</h3>
        </div>
        <div>
          <p className="eyebrow">Resident ID</p>
          <h3>{CITIZEN.residentId}</h3>
        </div>
        <div>
          <p className="eyebrow">Email</p>
          <h3>{CITIZEN.email}</h3>
        </div>
        <div>
          <p className="eyebrow">Neighborhood</p>
          <h3>{CITIZEN.neighborhood}</h3>
        </div>
        <div>
          <p className="eyebrow">Interest Tags</p>
          <div className="interest-tags">
            {CITIZEN.interests.map((interest) => (
              <span className="badge" key={interest}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </article>
    </section>
  )
}

function DeckScreen() {
  const revealRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!revealRef.current) {
      return
    }

    const deck = new Reveal(revealRef.current, {
      embedded: true,
      hash: true,
      controls: true,
      progress: true,
      transition: 'slide',
      plugins: [Markdown],
    })

    void deck.initialize()

    return () => {
      void deck.destroy()
    }
  }, [])

  return (
    <section className="screen-grid">
      <header>
        <h2>Business Case Presentation</h2>
        <p>
          Swipe on touch devices or use arrow keys. This deck is embedded directly in the app for
          Amplify deployment.
        </p>
      </header>
      <article className="panel deck-panel">
        <div className="reveal deck-host" ref={revealRef}>
          <div className="slides">
            <section data-markdown>
              <textarea data-template>{deckMarkdown}</textarea>
            </section>
          </div>
        </div>
      </article>
    </section>
  )
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi, I'm the Pawnee Assistant. Ask me about Pawnee services, local programs, or Parks and Rec quotes.",
    },
  ])

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) {
      return
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      if (!API_ROOT) {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content:
              'Backend chat is not configured yet. Set VITE_API_BASE_URL after deploying Terraform, then I can answer live with Bedrock.',
          },
        ])
        return
      }

      const response = await fetch(`${API_ROOT}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Chat request failed (${response.status})`)
      }

      const payload = (await response.json()) as { answer?: string }
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            payload.answer ??
            "I couldn't generate a response this time. Try asking about Pawnee programs or a Ron Swanson quote.",
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            "I hit a connection issue talking to Bedrock. Please try again in a moment, and ask me for a Parks and Rec quote while you're at it.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        className="chat-fab"
        aria-label="Open Pawnee assistant"
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>

      {isOpen ? (
        <section className="chat-panel" aria-label="Pawnee assistant panel">
          <header>
            <h3>Pawnee Assistant</h3>
            <p>Bedrock powered, Parks and Rec ready.</p>
          </header>
          <div className="chat-messages">
            {messages.map((message) => (
              <article key={message.id} className={`chat-bubble ${message.role}`}>
                {message.content}
              </article>
            ))}
          </div>
          <form onSubmit={sendMessage} className="chat-form">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Pawnee or request a quote..."
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </section>
      ) : null}
    </>
  )
}

function CitizenLayout({
  points,
  tier,
  tierProgress,
  nextActions,
  timeline,
  enrolledProgramIds,
  feedback,
  onEnroll,
  onSubmitFeedback,
  onSignOut,
}: {
  points: number
  tier: string
  tierProgress: number
  nextActions: Program[]
  timeline: EngagementEvent[]
  enrolledProgramIds: string[]
  feedback: PersistedState['feedback']
  onEnroll: (programId: string) => void
  onSubmitFeedback: (interactionId: string, rating: number, comment: string) => boolean
  onSignOut: () => void
}) {
  return (
    <div className="portal-shell">
      <header className="portal-header">
        <div>
          <h1>Pawnee Smart Civic Engagement Desk</h1>
          <p>Welcome back, {CITIZEN.name}. Your civic contributions power this town.</p>
        </div>
        <button className="ghost-button" onClick={onSignOut}>
          Sign out
        </button>
      </header>
      <nav className="portal-nav" aria-label="Citizen navigation">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/programs">Programs</NavLink>
        <NavLink to="/activity">Activity</NavLink>
        <NavLink to="/feedback">Feedback</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      <main className="portal-main">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <DashboardScreen
                points={points}
                tier={tier}
                tierProgress={tierProgress}
                nextActions={nextActions}
                timeline={timeline}
              />
            }
          />
          <Route
            path="/programs"
            element={<ProgramsScreen enrolledProgramIds={enrolledProgramIds} onEnroll={onEnroll} />}
          />
          <Route path="/activity" element={<ActivityScreen timeline={timeline} />} />
          <Route
            path="/feedback"
            element={<FeedbackScreen feedback={feedback} onSubmitFeedback={onSubmitFeedback} />}
          />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/deck" element={<DeckScreen />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <ChatWidget />
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  const [sessionState, setSessionState] = useState<PersistedState>(() => loadPersistedState())
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const enrolledPrograms = useMemo(
    () => PROGRAMS.filter((program) => sessionState.enrolledProgramIds.includes(program.id)),
    [sessionState.enrolledProgramIds],
  )

  const points = useMemo(() => {
    const base = BASE_EVENTS.reduce((sum, event) => sum + event.points, 0)
    const enrolled = enrolledPrograms.reduce((sum, program) => sum + program.points, 0)
    const feedbackBonus = Object.keys(sessionState.feedback).length * 2
    return base + enrolled + feedbackBonus
  }, [enrolledPrograms, sessionState.feedback])

  const nextActions = useMemo(() => {
    const notEnrolled = PROGRAMS.filter(
      (program) => !sessionState.enrolledProgramIds.includes(program.id) && program.active,
    )

    return notEnrolled
      .sort((a, b) => {
        const aMatch = CITIZEN.interests.includes(a.category) ? 1 : 0
        const bMatch = CITIZEN.interests.includes(b.category) ? 1 : 0
        return bMatch - aMatch || b.points - a.points
      })
      .slice(0, 3)
  }, [sessionState.enrolledProgramIds])

  const timeline = useMemo(() => {
    const enrollmentEvents: EngagementEvent[] = enrolledPrograms.map((program) => ({
      id: `enroll-${program.id}`,
      title: `Enrolled: ${program.title}`,
      date: program.date,
      source: 'Program Enrollment',
      points: program.points,
    }))

    const feedbackEvents: EngagementEvent[] = Object.entries(sessionState.feedback).map(
      ([interactionId, value], index) => {
        const interaction = INTERACTIONS.find((entry) => entry.id === interactionId)
        return {
          id: `fb-${interactionId}-${index}`,
          title: `Service feedback submitted (${value.rating}/5)`,
          date: interaction?.date ?? '2026-04-29',
          source: 'Service Quality',
          points: 2,
        }
      },
    )

    return [...BASE_EVENTS, ...enrollmentEvents, ...feedbackEvents].sort((a, b) =>
      b.date.localeCompare(a.date),
    )
  }, [enrolledPrograms, sessionState.feedback])

  const persist = (nextState: PersistedState) => {
    setSessionState(nextState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  }

  const handleLogin = (userId: string, password: string) => {
    const matchesUser =
      userId.toLowerCase() === CITIZEN.email.toLowerCase() ||
      userId.toLowerCase() === CITIZEN.residentId.toLowerCase()
    const matchesPassword = password === PASSWORD
    const success = matchesUser && matchesPassword

    if (success) {
      setIsAuthenticated(true)
      navigate('/dashboard')
    }

    return success
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    navigate('/login')
  }

  const enrollProgram = (programId: string) => {
    if (sessionState.enrolledProgramIds.includes(programId)) {
      return
    }

    const nextState: PersistedState = {
      ...sessionState,
      enrolledProgramIds: [...sessionState.enrolledProgramIds, programId],
    }
    persist(nextState)
  }

  const submitFeedback = (interactionId: string, rating: number, comment: string) => {
    if (sessionState.feedback[interactionId]) {
      return false
    }

    const nextState: PersistedState = {
      ...sessionState,
      feedback: {
        ...sessionState.feedback,
        [interactionId]: { rating, comment },
      },
    }
    persist(nextState)
    return true
  }

  const tier = getCurrentTier(points)
  const tierProgress = getProgressToNextTier(points)

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<LoginScreen onLogin={handleLogin} />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <CitizenLayout
            points={points}
            tier={tier}
            tierProgress={tierProgress}
            nextActions={nextActions}
            timeline={timeline}
            enrolledProgramIds={sessionState.enrolledProgramIds}
            feedback={sessionState.feedback}
            onEnroll={enrollProgram}
            onSubmitFeedback={submitFeedback}
            onSignOut={handleSignOut}
          />
        }
      />
    </Routes>
  )
}

export default App
