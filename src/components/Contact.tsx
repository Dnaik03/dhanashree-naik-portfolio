import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import './Contact.css'

/* ---------- Easy-to-edit settings ---------- */
const EMAIL = 'dhanashreenaik.work@gmail.com'
const FORM_ENDPOINT = 'https://formspree.io/f/myeeyvbn'
const RESUME_URL = '/Dhanashree_Naik_Resume.pdf'
const MAX_MESSAGE = 600

const TOPICS = [
  {
    id: 'hiring',
    emoji: '💼',
    label: 'Hiring',
    subject: 'Opportunity: ',
    hint: 'Tell me about the role, the team and what you are looking for…',
  },
  {
    id: 'project',
    emoji: '🚀',
    label: 'Client work',
    subject: 'Project enquiry: ',
    hint: 'What are you building, and what problem needs solving?',
  },
  {
    id: 'collab',
    emoji: '🤝',
    label: 'Collaboration',
    subject: 'Collaboration idea: ',
    hint: 'What would we create together?',
  },
  {
    id: 'hello',
    emoji: '👋',
    label: 'Just saying hi',
    subject: 'Hello!',
    hint: 'Anything on your mind. Hellos are welcome too.',
  },
] as const

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dhanashree-naik/',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Dnaik03',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/dhanashree_naik',
  },
] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

/* ---------- Social icons ---------- */
function ContactSocialIcon({ label }: { label: string }) {
  if (label === 'LinkedIn') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M5.2 3.2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.7V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V9Z" />
      </svg>
    )
  }

  if (label === 'GitHub') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    )
  }

  if (label === 'Behance') {
    return <span className="ct-brand-mark">Bē</span>
  }

  if (label === 'Instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
      </svg>
    )
  }

  return null
}

/* ---------- Little Idea Bot ---------- */
function ContactMascot() {
  const greetings = [
    'Hi there! 👋',
    'Have a lovely day!',
    'Thanks for stopping by!',
    'Got an idea? Let’s build it!',
  ]

  const [greetingIndex, setGreetingIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    let greetingTimer: number
    let hideTimer: number

    const showGreeting = () => {
      setGreetingIndex((current) => (current + 1) % greetings.length)
      setIsSpeaking(true)

      hideTimer = window.setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)

      // 3 seconds speaking + 10 seconds quiet walking
      greetingTimer = window.setTimeout(showGreeting, 13000)
    }

    // Let the robot walk for 10 seconds before its first greeting
    greetingTimer = window.setTimeout(showGreeting, 10000)

    return () => {
      window.clearTimeout(greetingTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div
      className={`ct-mascot-track ${isSpeaking ? 'is-speaking' : 'is-walking'}`}
      aria-label="Animated portfolio robot"
    >
      <div className="ct-mascot-walker">
        <div className="ct-mascot-character" aria-hidden="true">
          <svg
            viewBox="0 0 100 125"
            className="ct-robot-svg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <defs>
              <linearGradient id="ctRobotShell" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#DCE7F1" />
              </linearGradient>
              <linearGradient id="ctRobotBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#43C5FF" />
                <stop offset="100%" stopColor="#008ED8" />
              </linearGradient>
            </defs>

            {/* Antenna */}
            <g className="ct-robot-antenna">
              <path
                d="M50 13V7"
                stroke="#8798AA"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="50" cy="5" r="4" fill="#00A6F5" />
              <circle cx="49" cy="4" r="1.3" fill="#FFFFFF" />
            </g>

            {/* Head */}
            <rect
              x="25"
              y="14"
              width="50"
              height="39"
              rx="13"
              fill="url(#ctRobotShell)"
              stroke="#9AAFC2"
              strokeWidth="1.5"
            />

            {/* Face screen */}
            <rect
              x="30"
              y="20"
              width="40"
              height="26"
              rx="9"
              fill="#111827"
            />

            {/* Eyes */}
            <g className="ct-robot-eyes">
              <ellipse cx="41" cy="32" rx="3.5" ry="4.2" fill="#38BDF8" />
              <ellipse cx="59" cy="32" rx="3.5" ry="4.2" fill="#38BDF8" />
              <circle cx="42" cy="30.5" r="1.1" fill="#FFFFFF" />
              <circle cx="60" cy="30.5" r="1.1" fill="#FFFFFF" />
            </g>

            {/* Cheeks */}
            <circle cx="34" cy="38" r="2" fill="#F49AA6" opacity=".85" />
            <circle cx="66" cy="38" r="2" fill="#F49AA6" opacity=".85" />

            {/* Smile */}
            <path
              d="M43 39 Q50 44 57 39"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Neck */}
            <path
              d="M44 53V58 M56 53V58"
              stroke="#9AAFC2"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Body */}
            <rect
              x="29"
              y="57"
              width="42"
              height="35"
              rx="12"
              fill="url(#ctRobotShell)"
              stroke="#9AAFC2"
              strokeWidth="1.5"
            />

            {/* Chest panel */}
            <rect
              x="37"
              y="64"
              width="26"
              height="20"
              rx="6"
              fill="#111827"
            />
            <circle cx="50" cy="71" r="4" fill="url(#ctRobotBlue)" />
            <path
              d="M43 79H57"
              stroke="#8DA6BA"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Left arm */}
            <g className="ct-robot-arm-left">
              <path
                d="M30 65L20 75L17 86"
                fill="none"
                stroke="#A5B7C7"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 65L20 75L17 86"
                fill="none"
                stroke="#EDF4F9"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="17"
                cy="87"
                r="5"
                fill="#DCE7F1"
                stroke="#9AAFC2"
                strokeWidth="1.3"
              />
            </g>

            {/* Right arm */}
            <g className="ct-robot-arm-right">
              <path
                d="M70 65L80 75L83 85"
                fill="none"
                stroke="#A5B7C7"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M70 65L80 75L83 85"
                fill="none"
                stroke="#EDF4F9"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="83"
                cy="86"
                r="5"
                fill="#DCE7F1"
                stroke="#9AAFC2"
                strokeWidth="1.3"
              />
            </g>

            {/* Left leg */}
            <g className="ct-robot-leg-left">
              <path
                d="M41 91L39 105"
                stroke="#A5B7C7"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M41 91L39 105"
                stroke="#EDF4F9"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <path
                d="M39 105L32 109"
                stroke="#A5B7C7"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M39 105L32 109"
                stroke="#EDF4F9"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>

            {/* Right leg */}
            <g className="ct-robot-leg-right">
              <path
                d="M59 91L61 105"
                stroke="#A5B7C7"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M59 91L61 105"
                stroke="#EDF4F9"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <path
                d="M61 105L68 109"
                stroke="#A5B7C7"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M61 105L68 109"
                stroke="#EDF4F9"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>

            {/* Tiny blue detail */}
            <circle cx="50" cy="59" r="2" fill="#00A6F5" />
          </svg>
        </div>

        {/* Greeting bubble */}
        <div
          className={`ct-mascot-bubble ${isSpeaking ? 'is-speaking' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="ct-mascot-bubble-label">Techy Timo</span>
          <p>{greetings[greetingIndex]}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Contact section ---------- */
function Contact() {
  const [topicId, setTopicId] = useState<string | null>(null)
  const [subjectTouched, setSubjectTouched] = useState(false)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  })

  const topic = TOPICS.find((t) => t.id === topicId)

  const update =
    (key: keyof typeof form) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (key === 'subject') setSubjectTouched(true)
        setForm((f) => ({ ...f, [key]: e.target.value }))
      }

  const pickTopic = (id: string) => {
    const next = TOPICS.find((t) => t.id === id)
    if (!next) return

    setTopicId(id)

    if (!subjectTouched) {
      setForm((f) => ({ ...f, subject: next.subject }))
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const mailtoFallback = `mailto:${EMAIL}?subject=${encodeURIComponent(
    form.subject || 'Hello from your portfolio',
  )}&body=${encodeURIComponent(form.message)}`

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: bots may fill this field; humans never see it.
    if (form.company) return

    setStatus('sending')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          topic: topic?.label ?? 'Not specified',
          _subject: `Portfolio: ${form.subject}`,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
    })
    setTopicId(null)
    setSubjectTouched(false)
    setStatus('idle')
  }

  return (
    <section id="contact" className="section scroll-mt-20 contact">
      <div className="container">
        {/* Heading */}
        <div className="ct-head">
          <p className="eyebrow mb-3 italic">BEYOND THE SCREEN</p>

          <h1 className="mb-5 font-display text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            Let&apos;s <span className="text-[#00A6F5]">Connect</span>
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
            I&apos;m excited to contribute to meaningful products through thoughtful
            problem-solving, design and technology.
          </p>
        </div>

        <div className="ct-grid">
          <ContactMascot />

          {/* ---------- Left: contact information ---------- */}
          <aside className="ct-card ct-info">
            <div className="ct-info-heading">
              <h3 className="ct-kicker ct-kicker--gold">CONTACT DETAILS</h3>

              <span className="ct-hire-badge">
                <span className="ct-pulse" aria-hidden="true" />
                OPEN TO WORK
              </span>
            </div>

            <p className="ct-info-text">
              Pick whichever channel suits you. I read every message myself.
            </p>

            <div className="ct-availability">
              <span className="ct-availability-label">AVAILABLE FOR</span>
              <p>
                Full-time product roles · UI/UX &amp; graphic design · Freelance
                projects · Collaborations
              </p>
            </div>

            <div className="ct-email-row">
              <a href={`mailto:${EMAIL}`} className="ct-email-link">
                <span className="ct-icon" aria-hidden="true">
                  ✉
                </span>
                <span className="ct-email-text">
                  <small>Email</small>
                  {EMAIL}
                </span>
              </a>

              <button
                type="button"
                className="ct-copy"
                onClick={copyEmail}
                aria-live="polite"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            <div className="ct-meta">
              <div className="ct-location">
                <span className="ct-icon" aria-hidden="true">
                  ⌖
                </span>
                <span className="ct-location-text">
                  <small>BASED IN</small>
                  Nagpur, Maharashtra, India
                </span>
              </div>
            </div>

            <div className="ct-social-heading">
              <p className="ct-kicker ct-kicker--muted">FIND ME ONLINE</p>
            </div>

            <div className="ct-socials ct-social-icons-only">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-social-icon-button"
                  aria-label={s.label}
                  title={s.label}
                >
                  <ContactSocialIcon label={s.label} />
                </a>
              ))}
            </div>

            <div className="ct-resume">
              <a href={RESUME_URL} download className="ct-btn ct-btn--blue">
                Download Resume <span aria-hidden="true">↓</span>
              </a>
              <p>Keep a copy of my professional profile.</p>
            </div>
          </aside>

          {/* ---------- Right: contact form ---------- */}
          <div className="ct-card ct-form-card">
            {status === 'sent' ? (
              <div className="ct-success" role="status">
                <div className="ct-check" aria-hidden="true">
                  ✓
                </div>

                <h3>Message sent!</h3>

                <p>
                  Thanks, {form.name.split(' ')[0] || 'friend'}. Your message is
                  in my inbox and I&apos;ll reply to{' '}
                  <strong>{form.email}</strong> soon.
                </p>

                <button
                  type="button"
                  className="ct-btn ct-btn--dark"
                  onClick={reset}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="ct-form-title">
                    Hiring, building something, or just curious? <span className="text-[#00A6F5]"> Let&apos;s talk </span>
                </h3>

                <fieldset className="ct-topics">
                  <legend>What brings you here?</legend>

                  <div className="ct-chips">
                    {TOPICS.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        className={`ct-chip ${topicId === t.id ? 'is-active' : ''}`}
                        aria-pressed={topicId === t.id}
                        onClick={() => pickTopic(t.id)}
                      >
                        <span aria-hidden="true">{t.emoji}</span> {t.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <form onSubmit={handleSubmit} className="ct-form">
                  <div className="ct-row">
                    <label className="ct-field">
                      <span>
                        Name <i>*</i>
                      </span>
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        required
                        value={form.name}
                        onChange={update('name')}
                      />
                    </label>

                    <label className="ct-field">
                      <span>
                        Email <i>*</i>
                      </span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        value={form.email}
                        onChange={update('email')}
                      />
                    </label>
                  </div>

                  <label className="ct-field">
                    <span>
                      Subject <i>*</i>
                    </span>
                    <input
                      name="subject"
                      type="text"
                      placeholder="What would you like to discuss?"
                      required
                      value={form.subject}
                      onChange={update('subject')}
                    />
                  </label>

                  <label className="ct-field">
                    <span>
                      Your message <i>*</i>
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={MAX_MESSAGE}
                      placeholder={
                        topic?.hint ??
                        'Tell me a little about your opportunity, project or idea…'
                      }
                      required
                      value={form.message}
                      onChange={update('message')}
                    />
                    <em className="ct-count">
                      {form.message.length}/{MAX_MESSAGE}
                    </em>
                  </label>

                  {/* Honeypot: hidden from people, catches bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="ct-honeypot"
                    value={form.company}
                    onChange={update('company')}
                  />

                  <button
                    type="submit"
                    className="ct-btn ct-btn--dark ct-submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      'Sending…'
                    ) : (
                      <>
                        Send to my inbox{' '}
                        <span aria-hidden="true">✈</span>
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="ct-error" role="alert">
                      Something went wrong sending that. You can{' '}
                      <a href={mailtoFallback}>email me directly instead</a>.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>

        {/* Closing */}
        <div className="ct-closing">
          <h1>
            Building products.
            <span className="ct-accent"> <span className="text-[#00A6F5]">Solving problems.</span></span>
            <br className="ct-br" /> Learning constantly.
          </h1>
          <small>THANK YOU FOR STOPPING BY.</small>
        </div>
      </div>
    </section>
  )
}

export default Contact
