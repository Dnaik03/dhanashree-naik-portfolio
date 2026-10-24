import { useState } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import './Beyond Work.css'

/* ==========================================================
   HOW TO ADD MORE
   - New role / activity  -> add an object to `leadership`
   - New volunteering     -> add an object to `volunteering`
   - New creative outlet  -> add an object to `creative`
   - New social platform  -> add it to `SocialPlatform` + `socialIcons`
   - New icon             -> add it to `IconName` + `iconNodes`
   - Website ready        -> fill in `website` on a creative project
   ========================================================== */

/* ---------- Types ---------- */

type IconName = 'briefcase' | 'layers' | 'zap' | 'chip' | 'heart'
type SocialPlatform = 'instagram' | 'youtube' | 'x' | 'link'

interface Leadership {
  id: string
  icon: IconName
  name: string
  institution: string
  role: string
  description: string
  skills: string[]
}

interface Volunteering {
  id: string
  icon: IconName
  organization: string
  role: string
  duration: string
  description: string
  skills: string[]
}

interface Social {
  platform: SocialPlatform
  label: string
  href: string
}

interface Inspiration {
  id: string
  label: string
  palette: [string, string, string]
}

interface Creative {
  id: string
  kind: 'art' | 'poetry'
  role: string
  brand: string
  penName: string
  summary: string
  traits: string[]
  socials: Social[]
  website: string
  inspirations?: Inspiration[]
  themes?: string[]
}

/* ---------- Content ---------- */

const leadership: Leadership[] = [
  {
    id: 'cdpc',
    icon: 'briefcase',
    name: 'Career Development & Placement Cell',
    institution: 'RBU',
    role: 'Coordinator · MCA',
    description:
      'Coordinated career and placement initiatives, organised career-focused activities, and worked with students, faculty and industry professionals.',
    skills: ['Leadership', 'Data Management', 'Communication', 'Report Writing'],
  },
  {
    id: 'backdrop',
    icon: 'layers',
    name: 'Backdrop Committee',
    institution: 'RBU',
    role: 'Committee Member',
    description:
      'Worked on event backdrop design and branding while coordinating with the creative team to ensure smooth execution.',
    skills: ['Creative Direction', 'Branding', 'Event Planning', 'Team Coordination'],
  },
  {
    id: 'edc',
    icon: 'zap',
    name: 'Entrepreneurship Development Cell',
    institution: 'Dr. Ambedkar College',
    role: 'Coordinator',
    description:
      'Coordinated entrepreneurship initiatives, organised events, encouraged student participation, and supported innovation-focused activities.',
    skills: ['Leadership', 'Entrepreneurship', 'Event Management', 'Team Coordination'],
  },
]

const inspirations: Inspiration[] = [
  { id: 'experience', label: 'An experience', palette: ['#00a6f5', '#7c5cff', '#ff8a5b'] },
  { id: 'environment', label: 'An environment', palette: ['#34d399', '#0ea5a4', '#f5d36b'] },
  { id: 'event', label: 'An event', palette: ['#f43f5e', '#f59e0b', '#8b5cf6'] },
  { id: 'feeling', label: 'A feeling', palette: ['#a78bfa', '#f472b6', '#60a5fa'] },
  { id: 'person', label: 'A person', palette: ['#f59e0b', '#ef4444', '#fde68a'] },
]

const creative: Creative[] = [
  {
    id: 'art',
    kind: 'art',
    role: 'Abstract Artist',
    brand: 'ndnextpiece',
    penName: 'Helena',
    summary:
      'Working across mediums and styles, I gravitate towards abstract painting as a way to interpret the world around me. Each piece begins with something that resonates a lived experience, a place, an event, a fleeting emotion, or a person.',
    traits: ['Abstract painting', 'Multiple mediums', 'Varied styles'],
    socials: [
      {
        platform: 'instagram',
        label: 'ndnextpiece on Instagram',
        href: 'https://instagram.com/ndnextpiece',
      },
    ],
    website: '',
    inspirations,
  },
  {
    id: 'poetry',
    kind: 'poetry',
    role: 'Poet',
    brand: 'ndmused',
    penName: 'Lily',
    summary:
      'A poet of melancholic romanticism, writing in fragmented free verse where love, memory, silence and loss become symbols of the human experience, turning fleeting feelings into something that lingers.',
    traits: [
      'Free verse',
      'Confessional & lyrical',
      'Romantic melancholy',
      'Nature-inspired imagery',
    ],
    socials: [
      {
        platform: 'instagram',
        label: 'ndmused on Instagram',
        href: 'https://instagram.com/ndmused',
      },
    ],
    website: '',
    themes: [
      'Love',
      'Longing',
      'Silence',
      'Separation',
      'Memory',
      'Identity',
      'Rebirth',
    ],
  },
]

const volunteering: Volunteering[] = [
  {
    id: 'elmtrix',
    icon: 'chip',
    organization: 'Elmtrix Technical Club',
    role: 'Technical Club Member · Dr. Ambedkar College',
    duration: 'Sept 2021 — Apr 2024',
    description:
      'Contributed to a technology-focused student community that worked to make technology and related skills more accessible to students.',
    skills: ['Technology', 'Community', 'Collaboration', 'Learning'],
  },
  {
    id: 'feeding-nation',
    icon: 'heart',
    organization: 'Feeding Nation',
    role: 'Volunteer · Dr. Ambedkar College',
    duration: 'Sept 2021 — Apr 2024',
    description:
      'Took part in community initiatives, including distributing blankets to people in need, with a focus on social responsibility and community support.',
    skills: ['Community Service', 'Empathy', 'Social Responsibility'],
  },
]

/* ---------- Icons ---------- */

const iconNodes: Record<IconName, ReactNode> = {
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-9-9.6C2.1 7.7 4 5 6.9 5c1.9 0 3.4 1 5.1 3 1.7-2 3.2-3 5.1-3 2.9 0 4.8 2.7 3.9 5.9-1.5 5-9 9.6-9 9.6Z" />
  ),
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconNodes[name]}
    </svg>
  )
}

const socialIcons: Record<SocialPlatform, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
}

function PlusIcon() {
  return (
    <svg
      className="bw-plus"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

/* ---------- Helpers ---------- */

const cssVars = (vars: Record<string, string | number>) =>
  vars as unknown as CSSProperties

const trackSpotlight = (e: PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

const trackParallax = (e: PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  e.currentTarget.style.setProperty('--px', x.toFixed(3))
  e.currentTarget.style.setProperty('--py', y.toFixed(3))
}

const resetParallax = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty('--px', '0')
  e.currentTarget.style.setProperty('--py', '0')
}

function ChapterHeading({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children?: ReactNode
}) {
  return (
    <div id={id} className="bw-chapter__head">
      <div className="bw-chapter__title-row">
        <h3 className="bw-chapter__title">{title}</h3>
        <span className="bw-chapter__rule" aria-hidden="true" />
      </div>
      <p className="bw-chapter__lead">{children}</p>
    </div>
  )
}

/* ---------- Creative cards ---------- */


function ArtVisual({
  list,
  inspiration,
  onInspirationChange,
}: {
  list: Inspiration[]
  inspiration: number
  onInspirationChange: (index: number) => void
}) {
  return (
    <div
      className="cr-visual cr-art"
      onPointerMove={trackParallax}
      onPointerLeave={resetParallax}
    >
      <div className="cr-art__rot">
        <span className="cr-blob cr-blob--1" />
        <span className="cr-blob cr-blob--2" />
        <span className="cr-blob cr-blob--3" />
        <span className="cr-blob cr-blob--4" />
      </div>

      <svg
        className="cr-art__strokes"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-10 190 C 90 120, 160 230, 260 150 S 380 90, 420 130" />
        <circle cx="300" cy="64" r="34" />
      </svg>

      {list.length > 0 && (
        <div className="cr-insp cr-insp--overlay">
          <p className="cr-insp__label">
            INSPIRED BY <span>· TAP TO REPAINT</span>
          </p>

          <div className="cr-insp__chips">
            {list.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className="cr-insp__chip"
                data-active={i === inspiration}
                aria-pressed={i === inspiration}
                onClick={(e) => {
                  e.stopPropagation()
                  onInspirationChange(i)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


function PoetryVisual({
  themes,
  lit,
  onToggle,
}: {
  themes: string[]
  lit: string[]
  onToggle: (word: string) => void
}) {
  const allLit = lit.length === themes.length

  return (
    <div className="cr-visual cr-verse">
      <div className="cr-verse__words">
        {themes.map((word) => (
          <button
            key={word}
            type="button"
            className="cr-word"
            data-lit={lit.includes(word)}
            aria-pressed={lit.includes(word)}
            onClick={() => onToggle(word)}
          >
            {word}
          </button>
        ))}
      </div>
      <p className="cr-verse__hint">
        {allLit
          ? 'Now you’ve read between the lines.'
          : 'Tap a word to bring it into the light.'}
      </p>
    </div>
  )
}

function CreativeCard({ project }: { project: Creative }) {
  const [inspiration, setInspiration] = useState(0)
  const [lit, setLit] = useState<string[]>([])

  const list = project.inspirations ?? []
  const current = list[inspiration]

  const toggleWord = (word: string) =>
    setLit((cur) =>
      cur.includes(word) ? cur.filter((w) => w !== word) : [...cur, word],
    )

  const paletteVars = current
    ? cssVars({
      '--c1': current.palette[0],
      '--c2': current.palette[1],
      '--c3': current.palette[2],
      '--shift': inspiration,
    })
    : undefined

  return (
    <article className="cr-card" data-kind={project.kind} style={paletteVars}>
      {project.kind === 'art' && (
        <ArtVisual
          list={list}
          inspiration={inspiration}
          onInspirationChange={setInspiration}
        />
      )}

      {project.kind === 'poetry' && project.themes && (
        <PoetryVisual
          themes={project.themes}
          lit={lit}
          onToggle={toggleWord}
        />
      )}

      <div className="cr-card__body">
        <div className="cr-card__top">
          <span className="cr-role">{project.role}</span>
          <span className="cr-pen">
            Pen name <b>{project.penName}</b>
          </span>
        </div>

        <h4 className="cr-brand">{project.brand}</h4>
        <p className="cr-summary">{project.summary}</p>

        <ul className="cr-traits">
          {project.traits.map((trait) => (
            <li className="cr-trait" key={trait}>
              {trait}
            </li>
          ))}
        </ul>

        <div className="cr-card__foot">
          <div className="cr-socials">
            {project.socials.map((s) => (
              <a
                key={s.href}
                className="cr-social"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                {socialIcons[s.platform]}
              </a>
            ))}
          </div>

          {project.website ? (
            <a
              className="cr-site"
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className="cr-site cr-site--soon">Website coming soon</span>
          )}
        </div>
      </div>
    </article>
  )
}

/* ---------- Section ---------- */

function BeyondWork() {
  const [activeLead, setActiveLead] = useState(0)

  return (
    <section id="beyond-work" className="section bw">
      <div className="container">
        {/* Intro */}
        <header className="bw-header">
          <p className="eyebrow mb-3 italic">OFF THE CLOCK</p>
          <h1 className="mb-5 font-display text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            BEYOND<span className="text-[#00A6F5]"> WORK</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
            Leading, creating and giving back: the parts of my story that sit
            outside the job title.
          </p>
        </header>

        {/* ---------- Activities & Leadership ---------- */}
        <div className="bw-chapter">
          <ChapterHeading id="activities" title="Activities & Leadership">
            <span className="text-[#00A6F5] font-bold">
              Beyond my formal roles -
            </span>{' '}
            Experiences that built my leadership, coordination, communication
            and creative skills alongside my academic and professional journey.
          </ChapterHeading>

          <div className="bw-panels">
            {leadership.map((item, i) => {
              const open = activeLead === i
              return (
                <article
                  key={item.id}
                  className="bw-panel"
                  data-open={open}
                  onMouseEnter={() => setActiveLead(i)}
                >
                  <button
                    type="button"
                    className="bw-panel__head"
                    aria-expanded={open}
                    aria-controls={`bw-panel-${item.id}`}
                    onClick={() => setActiveLead(i)}
                    onFocus={() => setActiveLead(i)}
                  >
                    <span className="bw-panel__top">
                      <span className="bw-tile">
                        <Icon name={item.icon} />
                      </span>
                      <span className="bw-panel__inst">{item.institution}</span>
                    </span>
                    <span className="bw-panel__name">{item.name}</span>
                    <span className="bw-panel__role">{item.role}</span>
                    <PlusIcon />
                  </button>

                  <div id={`bw-panel-${item.id}`} className="bw-panel__collapse">
                    <div className="bw-panel__body">
                      <p className="bw-panel__desc">{item.description}</p>
                      <ul className="bw-chips">
                        {item.skills.map((skill) => (
                          <li key={skill} className="bw-chip">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* ---------- The Creative Side ---------- */}
        <div className="bw-chapter">
          <ChapterHeading id="creative" title="The Creative Side">
            <span className="text-[#00A6F5] font-bold">
              I’m an abstract artist and a poet.
            </span>{' '}
            Two creative outlets, two names. Here’s where each one lives.
          </ChapterHeading>

          <div className="cr-stage">
            <div className="cr-grid">
              {creative.map((project) => (
                <CreativeCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Volunteering ---------- */}
        <div className="bw-chapter bw-chapter--last">
          <ChapterHeading id="volunteering" title="Volunteering">
            <span className="text-[#00A6F5] font-bold">
              Giving back during my bachelor’s
            </span>{' '}
            Experiences that shaped my perspective on community, empathy,
            responsibility and leadership.
          </ChapterHeading>

          <div className="bw-cards">
            {volunteering.map((item) => (
              <article
                key={item.id}
                className="bw-card bw-spot"
                onPointerMove={trackSpotlight}
              >
                <div className="bw-card__top">
                  <span className="bw-tile bw-tile--gold">
                    <Icon name={item.icon} size={26} />
                  </span>
                  <span className="bw-date">{item.duration}</span>
                </div>

                <h4 className="bw-card__title">{item.organization}</h4>
                <p className="bw-card__role">{item.role}</p>
                <p className="bw-card__desc">{item.description}</p>

                <ul className="bw-chips bw-chips--end">
                  {item.skills.map((skill) => (
                    <li key={skill} className="bw-chip bw-chip--quiet">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Closing note */}
          <div className="bw-closing">
            <div>
              <h4 className="bw-closing__title">
                <span className="text-[#00A6F5] font-bold">Beyond </span>
                the job title
              </h4>
              <p className="bw-closing__text">
                I enjoy exploring ideas, working with people, and seeing how
                products, creative thinking and technology come together to
                solve meaningful problems.
              </p>
            </div>
            <a className="bw-closing__link" href="#contact">
              Let’s talk ideas
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeyondWork