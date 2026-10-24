
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import './Work.css'

type Project = {
  id: string
  category: string
  status: string
  title: string
  description: string
  role: string
  dates: string
  footer: string
  details: string[]
  outcome: string
  tags: string[]
  link?: {
    label: string
    href: string
  }
}

const projects: Project[] = [
  {
    id: 'bss',
    category: 'Mobile Application',
    status: 'Ongoing',
    title: 'BSS Nagpur Hub',
    description:
      'Digitising manual operations through a phase-wise Android application.',
    role: 'Product Development Associate · Freelancer',
    dates: 'September 2026 – Present',
    footer: 'Project in progress ↗',
    details: [
      'Gathered user requirements and identified operational pain points.',
      'Defined features and examined user flows.',
      'Suggested solutions to replace manual processes.',
      'Coordinated requirements and implementation with the developer.',
      'Reviewed developed features and gathered client feedback.',
      'Supported phase-wise product delivery.',
    ],
    outcome:
      'Developing a digital solution for booking, user management and reporting, with features delivered and refined in phases based on client requirements.',
    tags: [
      'Product Thinking',
      'Requirements',
      'User Flows',
      'Mobile App',
      'Developer Collaboration',
    ],
  },
  {
    id: 'absynergy',
    category: 'Web Application',
    status: 'Delivered',
    title: 'ABsynergy',
    description:
      'Designing and delivering a corporate web experience for a scientific and technical consultancy.',
    role: 'Product Development Associate · Freelancer',
    dates: 'August 2026 – September 2026',
    footer: 'Delivered ↗',
    link: {
      label: 'Live Website',
      href: 'https://www.absynergy.co.in/',
    },
    details: [
      'Gathered client requirements and understood business needs.',
      'Researched and proposed features within project constraints.',
      'Suggested suitable third-party integrations for website content and media.',
      'Researched domain, hosting and SSL requirements.',
      'Translated business needs into actionable technical requirements.',
      'Coordinated with the developer throughout implementation.',
      'Tested the website, reviewed developed features and provided feedback before delivery.',
    ],
    outcome:
      "Delivered a live corporate website with business-unit information, project resources, a media gallery and contact pathways, aligned with the client's requirements.",
    tags: [
      'Product Development',
      'Requirements',
      'Web Product',
      'Client Management',
      'Technical Coordination',
      'Product Delivery',
    ],
  },
  {
    id: 'lively',
    category: 'Product',
    status: 'Product Experience',
    title: 'Lively Libraries',
    description:
      'Simplifying library management for small and community-based libraries.',
    role:
      'Product POC · Stakeholder Communication · Product Operations · Reports Generation · Marketing',
    dates: 'February 2026 – August 2026',
    footer: 'Product experience ↗',
    details: [
      'Acted as the primary product and client point of contact.',
      'Understood client pain points and translated them into product requirements.',
      'Researched and suggested feature improvements.',
      'Evaluated user flows and proposed alternative solutions.',
      'Coordinated with the developer on feature implementation.',
      'Conducted user acceptance testing (UAT) and identified issues.',
      'Resolved client queries and supported product improvements.',
    ],
    outcome:
      'Helped shape and improve a simplified library management solution designed for smaller libraries, focusing on usability and straightforward workflows.',
    tags: [
      'Product Thinking',
      'Product Operations',
      'Requirements',
      'User Experience',
      'UAT',
      'Client Management',
    ],
  },
  {
    id: 'mazacard',
    category: 'Product',
    status: 'Operations & Delivery',
    title: 'Mazacard',
    description:
      'A flexible NFC and QR-based digital identity for modern professionals.',
    role:
      'Product Operations · Product Support · Marketing · Vendor Communication',
    dates: 'August 2025 – February 2026',
    footer: 'Product operations experience ↗',
    link: {
      label: 'Official Website',
      href: 'https://mazacard.com/',
    },
    details: [
      'Helped define required profile fields and product information.',
      'Designed card templates and product creatives.',
      'Managed batch orders and coordinated with printing vendors.',
      'Coordinated customers and internal stakeholders.',
      'Handled NFC and QR mapping for individual cards.',
      'Researched bulk-generation approaches.',
      'Gathered customer information and handled communication.',
      'Supported product marketing and promotional creatives.',
    ],
    outcome:
      'Supported the operational delivery of a customisable NFC/QR digital visiting card experience, from customer information and card production through to digital profile mapping.',
    tags: [
      'Product Operations',
      'NFC',
      'QR',
      'Customer Experience',
      'Design',
      'Operations',
    ],
  },
]

const palettes = [
  {
    name: 'Burnt Desire',
    colours: ['#11100F', '#641C24', '#B88D89', '#B49352'],
    background: '#211719',
    foreground: '#F9EDE5',
  },
  {
    name: 'Electric Studio',
    colours: ['#101820', '#00A6F5', '#D4AF37', '#F2E9DF'],
    background: '#102635',
    foreground: '#F5FAFF',
  },
  {
    name: 'Earth & Ink',
    colours: ['#292C2B', '#B85D3F', '#D6C4A8', '#8A9A75'],
    background: '#292C2B',
    foreground: '#F7F0E6',
  },
]

function Work() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([])
  const [activeCreative, setActiveCreative] = useState<string | null>(null)
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [marketingTransformed, setMarketingTransformed] = useState(false)
  const [trailPoints, setTrailPoints] = useState<
    { x: number; y: number; id: number }[]
  >([])

  const projectTrackRef = useRef<HTMLDivElement>(null)
  const trailId = useRef(0)

  const activePalette = palettes[paletteIndex]

  const toggleProject = (id: string) => {
    setExpandedProjects((current) =>
      current.includes(id)
        ? current.filter((projectId) => projectId !== id)
        : [...current, id],
    )
  }

  const toggleCreative = (creative: string) => {
    setActiveCreative((current) =>
      current === creative ? null : creative,
    )
  }

  const cyclePalette = (direction: number) => {
    setPaletteIndex(
      (current) =>
        (current + direction + palettes.length) % palettes.length,
    )
  }

  const scrollProjects = (direction: 'prev' | 'next') => {
    const track = projectTrackRef.current
    if (!track) return

    const firstCard = track.querySelector<HTMLElement>(
      ':scope > article',
    )

    const cardWidth =
      firstCard?.getBoundingClientRect().width ?? track.clientWidth

    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap) || 0

    track.scrollBy({
      left:
        direction === 'next'
          ? cardWidth + gap
          : -(cardWidth + gap),
      behavior: 'smooth',
    })
  }

  const addTrailPoint = (event: PointerEvent<HTMLDivElement>) => {
    // Draw while dragging with a mouse, or when touching the artwork.
    if (event.pointerType === 'mouse' && event.buttons !== 1) return

    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const point = {
      x: ((event.clientX - rect.left) / rect.width) * 400,
      y: ((event.clientY - rect.top) / rect.height) * 220,
      id: ++trailId.current,
    }

    setTrailPoints((current) => [...current.slice(-23), point])
  }

  return (
    <section id="work" className="section">
      <div className="container relative z-10">
        {/* Section introduction */}
        <header className="work-header">
          <p className="eyebrow mb-3 italic">WORK THAT</p>

          <h1 className="mb-5 font-display text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            MAKES AN{' '}
            <span className="text-[#00A6F5]">IMPACT</span>
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
            Projects and ideas I've helped shape, build, and deliver.
          </p>
        </header>

        {/* Featured Projects */}
        <section
          className="work-featured-section"
          aria-labelledby="featured-projects-title"
        >
          <div className="work-subsection">
            <h2
              id="featured-projects-title"
              className="work-subsection-title"
            >
              <span aria-hidden="true">●</span> Featured{' '}
              <span className="highlight-blue">Projects</span>
            </h2>

            <p className="work-subsection-description">
              From understanding the problem to coordinating solutions and
              delivering products, here's a closer look at the work behind
              the outcomes.
            </p>
          </div>

          <div className="work-carousel">
            <div className="work-carousel-left">
              <button
                type="button"
                className="work-carousel-button"
                onClick={() => scrollProjects('prev')}
                aria-label="Previous projects"
              >
                ←
              </button>
            </div>

            <div
              ref={projectTrackRef}
              className="work-carousel-track"
              aria-label="Featured project case studies"
            >
              {projects.map((project) => {
                const expanded = expandedProjects.includes(project.id)

                return (
                  <article
                    key={project.id}
                    className={`work-case-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A6F5]/40 hover:shadow-[0_18px_45px_rgba(17,24,39,0.08)] ${expanded ? 'is-expanded' : ''
                      }`}
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-100/60 blur-3xl transition-colors duration-300 group-hover:bg-sky-200/70" />

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B] sm:text-xs">
                        {project.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === 'Ongoing'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-sky-50 text-sky-700'
                          }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="relative z-10 mt-6">
                      <h3 className="work-project-title">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#374151] sm:text-base">
                        {project.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#007CB8]">
                        MY ROLE
                      </span>

                      <span className="text-sm leading-6 text-[#374151]">
                        {project.role}
                      </span>
                    </div>

                    <div className="relative z-10 mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        aria-expanded={expanded}
                        aria-controls={`case-study-${project.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#111827] bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#00A6F5] hover:bg-[#00A6F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6F5]"
                      >
                        {expanded ? 'Hide details' : 'View case study'}
                        <span aria-hidden="true">
                          {expanded ? '−' : '+'}
                        </span>
                      </button>

                      {project.link && (
                        <a
                          href={project.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[#00A6F5]/40 px-5 py-2.5 text-sm font-semibold text-[#007CB8] transition-all hover:border-[#00A6F5] hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6F5]"
                        >
                          {project.link.label}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>

                    {expanded && (
                      <div
                        id={`case-study-${project.id}`}
                        className="relative z-10 mt-5 border-t border-slate-100 pt-5"
                      >
                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#007CB8]">
                          What I worked on
                        </h4>

                        <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[#374151]">
                          {project.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2.5"
                            >
                              <span
                                className="mt-0.5 font-bold text-[#D4AF37]"
                                aria-hidden="true"
                              >
                                •
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 rounded-xl border border-[#BAE6FD] border-l-4 border-l-[#00A6F5] bg-[#EFF8FF] p-4">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#007CB8]">
                            Outcome
                          </p>

                          <p className="mt-2 text-sm leading-6 text-[#374151]">
                            {project.outcome}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 transition-colors hover:border-emerald-300 hover:bg-emerald-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <span className="text-xs text-[#64748B]">
                        {project.dates}
                      </span>

                      <span className="text-xs font-medium text-emerald-700">
                        {project.footer}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="work-carousel-right">
              <button
                type="button"
                className="work-carousel-button"
                onClick={() => scrollProjects('next')}
                aria-label="Next projects"
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* Creative Practice */}
        <section
          className="work-creative-section"
          aria-labelledby="creative-practice-title"
        >
          <div className="work-subsection">
            <h2
              id="creative-practice-title"
              className="work-subsection-title"
            >
              <span aria-hidden="true">●</span> Creative{' '}
              <span className="highlight-blue">Practice</span>
            </h2>

            <p className="work-subsection-description">
              Exploring branding, marketing, and visual communication to give
              ideas a distinct identity and make information easier to
              understand.
            </p>
          </div>

          <div className="work-creative-grid">
            {/* 01 — Branding */}
            <article
              className={`work-creative-card creative-branding ${activeCreative === 'branding' ? 'is-active' : ''
                }`}
            >
              <div className="creative-card-topline">
                <span className="creative-index">01</span>
              </div>

              <div
                className="creative-artwork branding-artwork"
                style={{
                  backgroundColor: activePalette.background,
                  color: activePalette.foreground,
                }}
              >
                <div className="branding-shapes" aria-hidden="true">
                  {activePalette.colours.map((colour, index) => (
                    <span
                      key={`${paletteIndex}-${colour}`}
                      className={`branding-shape palette-shape palette-shape-${index + 1}`}
                      style={{ backgroundColor: colour }}
                    />
                  ))}
                </div>

                <span className="branding-monogram" aria-hidden="true">
                  B.
                </span>

                <span className="branding-palette-name">
                  {activePalette.name}
                </span>

                <div className="branding-palette-controls">
                  <button
                    type="button"
                    onClick={() => cyclePalette(-1)}
                    aria-label="Previous branding palette"
                  >
                    ←
                  </button>

                  <span aria-live="polite">
                    {paletteIndex + 1} / {palettes.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => cyclePalette(1)}
                    aria-label="Next branding palette"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                className="creative-palette"
                aria-label={`${activePalette.name} colour palette`}
              >
                {activePalette.colours.map((colour) => (
                  <span
                    key={colour}
                    title={colour}
                    style={{ backgroundColor: colour }}
                  />
                ))}
              </div>

              <div className="creative-card-content">
                <div className="creative-title-row">
                  <h3>Branding</h3>
                  <span className="creative-type">Identity</span>
                </div>

                <p>
                  Giving ideas a recognisable personality through visual
                  identities, colour, and thoughtful design systems.
                </p>

                <div className="creative-tags">
                  {['Logo Design', 'Brand Identity', 'Guidelines'].map(
                    (skill) => (
                      <span key={skill}>{skill}</span>
                    ),
                  )}
                </div>

                <div
                  className={`creative-reveal ${activeCreative === 'branding' ? 'is-visible' : ''
                    }`}
                  aria-hidden={activeCreative !== 'branding'}
                  hidden={activeCreative !== 'branding'}
                >
                  <span className="creative-reveal-label">
                    THE CREATIVE THINKING
                  </span>

                  <p>
                    Every brand has a character. The goal is to make it
                    visible, consistent, and memorable.
                  </p>
                </div>

                <button
                  type="button"
                  className="creative-toggle"
                  onClick={() => toggleCreative('branding')}
                  aria-expanded={activeCreative === 'branding'}
                >
                  {activeCreative === 'branding'
                    ? 'Show less'
                    : 'Discover the approach'}

                  <span aria-hidden="true">
                    {activeCreative === 'branding' ? '−' : '+'}
                  </span>
                </button>
              </div>
            </article>

            {/* 02 — Marketing */}
            <article
              className={`work-creative-card creative-marketing ${activeCreative === 'marketing' ? 'is-active' : ''
                }`}
            >
              <div className="creative-card-topline">
                <span className="creative-index">02</span>
              </div>

              <button
                type="button"
                className={`creative-artwork marketing-artwork ${marketingTransformed ? 'is-transformed' : ''
                  }`}
                onClick={() =>
                  setMarketingTransformed((current) => !current)
                }
                aria-pressed={marketingTransformed}
                aria-label={
                  marketingTransformed
                    ? 'Return to the scattered marketing composition'
                    : 'Transform the scattered marketing composition into a clear layout'
                }
              >
                <span className="marketing-kicker">
                  {marketingTransformed ? 'THE RESULT' : 'THE CHALLENGE'}
                </span>

                <span className="marketing-fragment fragment-one">
                  MAKE
                </span>

                <span className="marketing-fragment fragment-two">
                  THEM
                </span>

                <span className="marketing-fragment fragment-three">
                  LOOK.
                </span>

                <span
                  className="marketing-shape marketing-shape-one"
                  aria-hidden="true"
                />

                <span
                  className="marketing-shape marketing-shape-two"
                  aria-hidden="true"
                />

                <span
                  className="marketing-shape marketing-shape-three"
                  aria-hidden="true"
                />

                <span className="marketing-action">
                  {marketingTransformed
                    ? 'CLEAR MESSAGE ✓'
                    : 'REORGANISE ↗'}
                </span>
              </button>

              <div className="creative-card-content">
                <div className="creative-title-row">
                  <h3>Marketing</h3>
                  <span className="creative-type">Campaigns</span>
                </div>

                <p>
                  Turning messages into visual communication that catches
                  attention and connects with the right audience.
                </p>

                <div className="creative-tags">
                  {['Brochures', 'Flyers', 'Social Creatives'].map(
                    (skill) => (
                      <span key={skill}>{skill}</span>
                    ),
                  )}
                </div>

                <div
                  className={`creative-reveal ${activeCreative === 'marketing' ? 'is-visible' : ''
                    }`}
                  aria-hidden={activeCreative !== 'marketing'}
                  hidden={activeCreative !== 'marketing'}
                >
                  <span className="creative-reveal-label">
                    THE CREATIVE THINKING
                  </span>

                  <p>
                    Good marketing is more than looking attractive. It
                    makes the message clear and gives people a reason to
                    care.
                  </p>

                  <div className="marketing-mini-type">
                    <span>MESSAGE</span>
                    <span aria-hidden="true">→</span>
                    <span>ATTENTION</span>
                    <span aria-hidden="true">→</span>
                    <span>ACTION</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="creative-toggle"
                  onClick={() => toggleCreative('marketing')}
                  aria-expanded={activeCreative === 'marketing'}
                >
                  {activeCreative === 'marketing'
                    ? 'Show less'
                    : 'Discover the approach'}

                  <span aria-hidden="true">
                    {activeCreative === 'marketing' ? '−' : '+'}
                  </span>
                </button>
              </div>
            </article>

            {/* 03 — Visual Communication */}
            <article
              className={`work-creative-card creative-visual ${activeCreative === 'visual' ? 'is-active' : ''
                }`}
            >
              <div className="creative-card-topline">
                <span className="creative-index">03</span>
              </div>

              <div
                className="creative-artwork visual-artwork visual-trace"
                onPointerDown={addTrailPoint}
                onPointerMove={addTrailPoint}
                role="img"
                aria-label="Interactive sketchbook. Drag with a mouse or touch the artwork to draw a creative trail."
              >
                <span className="visual-artwork-heading">
                  IDEAS, IN MOTION.
                </span>

                <span className="visual-decoration visual-decoration-one" />
                <span className="visual-decoration visual-decoration-two" />
                <span className="visual-decoration visual-decoration-three" />

                <svg
                  className="visual-trace-svg"
                  viewBox="0 0 400 220"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {trailPoints.map((point, index) => {
                    const previous = trailPoints[index - 1]

                    return (
                      <g key={point.id}>
                        {previous && (
                          <line
                            x1={previous.x}
                            y1={previous.y}
                            x2={point.x}
                            y2={point.y}
                            stroke="var(--trace-accent)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        )}

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={index % 4 === 0 ? 4 : 2}
                          fill="var(--trace-accent)"
                        />
                      </g>
                    )
                  })}
                </svg>

                <button
                  type="button"
                  className="visual-trace-reset"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => setTrailPoints([])}
                >
                  Reset trace ↺
                </button>
              </div>

              <div className="creative-card-content">
                <div className="creative-title-row">
                  <h3>Visual Communication</h3>
                  <span className="creative-type">Storytelling</span>
                </div>

                <p>
                  Making complex information easier to understand through
                  visual hierarchy, layouts, and engaging storytelling.
                </p>

                <div className="creative-tags">
                  {[
                    'Explanation Videos',
                    'Product Visuals',
                    'Presentations',
                  ].map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div
                  className={`creative-reveal ${activeCreative === 'visual' ? 'is-visible' : ''
                    }`}
                  aria-hidden={activeCreative !== 'visual'}
                  hidden={activeCreative !== 'visual'}
                >
                  <span className="creative-reveal-label">
                    THE CREATIVE THINKING
                  </span>

                  <p>
                    When information is structured well, people spend less
                    time figuring it out and more time understanding it.
                  </p>

                  <div className="visual-flow">
                    <span>COMPLEXITY</span>
                    <span className="visual-flow-arrow" aria-hidden="true">
                      →
                    </span>
                    <span>CLARITY</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="creative-toggle"
                  onClick={() => toggleCreative('visual')}
                  aria-expanded={activeCreative === 'visual'}
                >
                  {activeCreative === 'visual'
                    ? 'Show less'
                    : 'Discover the approach'}

                  <span aria-hidden="true">
                    {activeCreative === 'visual' ? '−' : '+'}
                  </span>
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Design Portfolio Link */}
        <div className="work-portfolio-link">
          <a
            href="https://www.behance.net/dhanashree_naik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#111827] bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#00A6F5] hover:bg-[#00A6F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6F5]"
          >
            Explore Design Portfolio
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Work
