
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import './experience.css'

type Tone = 'work' | 'learn'

interface Entry {
  id: string
  tone: Tone
  org: string
  title: string
  subtitle?: string
  duration: string
  description?: string
  label: string
  skills: string[]
  focus: string
}

const workExperience: Entry[] = [
  {
    id: 'absynergy',
    tone: 'work',
    org: 'ABsynergy',
    title: 'Product Development Associate · Freelancer',
    duration: 'Aug 2026 — Present',
    description:
      'Working on client-facing products: turning business requirements into practical digital solutions and coordinating with developers all the way through delivery.',
    label: 'What I do',
    skills: [
      'Requirements',
      'Product Thinking',
      'Solution Research',
      'Client Communication',
      'Developer Coordination',
      'Testing',
      'Delivery',
    ],
    focus:
      'Understanding problems → shaping solutions → getting them built',
  },
  {
    id: 'techwalnut',
    tone: 'work',
    org: 'Techwalnut Innovations LLP',
    title: 'Product Intern',
    duration: 'Aug 2025 — Aug 2026',
    description:
      'Worked across the product lifecycle and gained hands-on experience in product operations, testing, documentation, client communication and product coordination.',
    label: 'What I worked across',
    skills: [
      'Product Operations',
      'Requirements',
      'UAT',
      'Bug Reporting',
      'Documentation',
      'Client Support',
      'Product Research',
      'Usage Analysis',
    ],
    focus:
      'Learning how products move from requirements to release',
  },
]

const education: Entry[] = [
  {
    id: 'rbu',
    tone: 'learn',
    org: 'Ramdeobaba University',
    title: 'Master of Computer Applications',
    subtitle: 'AI/ML Specialization',
    duration: 'Sept 2024 — Aug 2026',
    label: 'What it added to my foundation',
    skills: [
      'AI/ML',
      'Software & Technology',
      'Data',
      'Problem Solving',
      'Technical Thinking',
    ],
    focus:
      'Understanding technology and exploring how AI can be applied to real-world problems',
  },
  {
    id: 'dacd',
    tone: 'learn',
    org: 'Dr. Ambedkar College, Deekshabhoomi, Nagpur',
    title: 'Bachelor of Computer Applications',
    duration: 'Sept 2021 — Apr 2024',
    label: 'What it built',
    skills: [
      'Computer Science Fundamentals',
      'Programming',
      'Software',
      'Database',
      'Technology Foundation',
    ],
    focus:
      'Building the technical foundation that led me toward product and technology',
  },
]

const chapters = [
  {
    id: 'worked',
    label: 'Where I’ve worked',
    hint: 'Turning ideas into products',
  },
  {
    id: 'learned',
    label: 'What shaped me',
    hint: 'Building my foundation',
  },
  {
    id: 'going',
    label: 'The direction',
    hint: 'What I’m working toward',
  },
] as const

type ChapterId = (typeof chapters)[number]['id']

function Chevron() {
  return (
    <svg
      className="exp-chevron"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function FocusLine({ text }: { text: string }) {
  const steps = text.split('→').map((s) => s.trim())

  if (steps.length < 2) {
    return <p className="exp-focus__text">{text}</p>
  }

  return (
    <ol className="exp-flow">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  )
}

function EntryCard({
  entry,
  open,
  onToggle,
}: {
  entry: Entry
  open: boolean
  onToggle: () => void
}) {
  const isNow = entry.duration.includes('Present')
  const bodyId = `exp-body-${entry.id}`

  return (
    <article
      className="exp-card"
      data-tone={entry.tone}
      data-open={open}
    >
      <span className="exp-card__dot" aria-hidden="true" />

      <button
        type="button"
        className="exp-card__head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
      >
        <span className="exp-card__heading">
          <span className="exp-card__org">{entry.org}</span>
          <span className="exp-card__title">{entry.title}</span>

          {entry.subtitle && (
            <span className="exp-card__sub">
              {entry.subtitle}
            </span>
          )}
        </span>

        <span className="exp-card__meta">
          {isNow && <span className="exp-now">Now</span>}
          <span className="exp-date">{entry.duration}</span>
          <Chevron />
        </span>
      </button>

      <div id={bodyId} className="exp-card__collapse">
        <div className="exp-card__inner">
          {entry.description && (
            <p className="exp-card__desc">
              {entry.description}
            </p>
          )}

          <p className="exp-label">{entry.label}</p>

          <ul className="exp-chips">
            {entry.skills.map((skill) => (
              <li key={skill} className="exp-chip">
                {skill}
              </li>
            ))}
          </ul>

          <div className="exp-focus">
            <p className="exp-label exp-label--gold">
              Focus
            </p>
            <FocusLine text={entry.focus} />
          </div>
        </div>
      </div>
    </article>
  )
}

function Experience() {
  const [active, setActive] = useState<ChapterId>('worked')
  const [openId, setOpenId] = useState<string | null>(
    workExperience[0].id,
  )

  const activeIndex = chapters.findIndex(
    (chapter) => chapter.id === active,
  )

  const selectChapter = (id: ChapterId) => {
    setActive(id)

    if (id === 'worked') {
      setOpenId(workExperience[0].id)
    }

    if (id === 'learned') {
      setOpenId(education[0].id)
    }
  }

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return

    e.preventDefault()

    const step = e.key === 'ArrowRight' ? 1 : -1
    const next =
      (activeIndex + step + chapters.length) % chapters.length

    selectChapter(chapters[next].id)

    const buttons =
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        'button[role="tab"]',
      )

    buttons[next]?.focus()
  }

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const renderList = (items: Entry[]) => (
    <div className="exp-timeline">
      {items.map((item) => (
        <EntryCard
          key={item.id}
          entry={item}
          open={openId === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  )

  return (
    <section id="experience" className="section exp">
      <div className="container">
        {/* Story-led introduction */}
        <header className="exp-header">
          <p className="eyebrow mb-3">
            The path so far
          </p>

          <h1 className="mb-5 font-display text-4xl font-black tracking-tight text-\[#111827] sm:text-5xl">
            EXPER<span className="text-[#00A6F5]">IENCE</span>
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
            Every role, every lesson, a clearer sense of the
            products I want to help shape.
          </p>
        </header>

        {/* Journey track */}
        <div
          className="exp-track"
          role="tablist"
          aria-label="Journey chapters"
          data-step={activeIndex}
          onKeyDown={onTabKeyDown}
        >
          <div className="exp-track__line" aria-hidden="true">
            <span className="exp-track__fill" />
          </div>

          {chapters.map((chapter, index) => {
            const isActive = chapter.id === active
            const isPast = index < activeIndex

            return (
              <button
                key={chapter.id}
                type="button"
                role="tab"
                id={`exp-tab-${chapter.id}`}
                aria-selected={isActive}
                aria-controls={`exp-panel-${chapter.id}`}
                tabIndex={isActive ? 0 : -1}
                className="exp-stop"
                data-active={isActive}
                data-past={isPast}
                onClick={() => selectChapter(chapter.id)}
              >
                <span
                  className="exp-stop__node"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="exp-stop__label">
                  {chapter.label}
                </span>

                <span className="exp-stop__hint">
                  {chapter.hint}
                </span>
              </button>
            )
          })}
        </div>

        {/* Journey panels */}
        <div
          key={active}
          className="exp-panel"
          role="tabpanel"
          id={`exp-panel-${active}`}
          aria-labelledby={`exp-tab-${active}`}
          tabIndex={0}
        >
          {active === 'worked' && renderList(workExperience)}

          {active === 'learned' && renderList(education)}

          {/* The direction — opens directly */}
          {active === 'going' && (
            <div className="exp-next">
              <div className="exp-reveal">
                <p className="exp-reveal__kicker">
                  THE NEXT CHAPTER
                </p>

                <h3 className="exp-reveal__title">
                  Where ideas meet{' '}
                  <br /><span>execution</span>
                </h3>

                <p className="exp-reveal__text">
                  I’m working toward a career at the intersection
                  of product, technology and creative
                  problem-solving while understanding what people
                  need, exploring what’s possible, and helping
                  turn ideas into meaningful products.
                </p>

                {/* Existing navigation buttons */}
                <div className="exp-reveal__actions">
                  <a
                    className="exp-btn exp-btn--primary"
                    href="#contact"
                  >
                    Let’s connect    
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    className="exp-btn exp-btn--ghost"
                    href="#work"
                  >
                    See what I’ve built   
                    <span aria-hidden="true">→</span>
                  </a>
                </div>

                <p className="exp-reveal__note">
                  Always curious. Always building. <br />
                  Open to meaningful opportunities in product and technology.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Experience
