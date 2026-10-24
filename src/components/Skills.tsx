import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import './Skills.css'


import {
  FaTrello,
  FaGithub,
  FaGit,
  FaPython,
  FaFileExcel,
  FaFileWord,
  FaFilePowerpoint,
  FaDatabase,
  FaCode,
  FaRobot,
  FaCloud,
  FaBook,
  FaPalette,
  FaPaperPlane,
  FaClipboard,
  FaFileAlt,
  FaCogs,
} from 'react-icons/fa'

/* =========================================================
   DATA
   Edit the content here. Layout and styling never need to change.
========================================================= */

type SkillGroup = {
  id: string
  title: string
  subtitle: string
  skills: string[]
  focus: string[]
  seenIn: string[]
}

const skillGroups: SkillGroup[] = [
  {
    id: 'product',
    title: 'Product Thinking',
    subtitle: 'Understand the problem before building the solution.',
    skills: [
      'Problem Solving',
      'Requirement Gathering & Analysis',
      'User & Pain Point Understanding',
      'Feature Definition',
      'User Flows',
      'Product Research',
      'Prioritisation',
      'Product Documentation',
    ],
    focus: ['Understand', 'Research', 'Define', 'Improve'],
    seenIn: ['BSS Nagpur Hub', 'Lively Libraries'],
  },
  {
    id: 'delivery',
    title: 'Product & Delivery',
    subtitle: 'Move ideas from requirements to delivery.',
    skills: [
      'Product Operations',
      'Project Coordination',
      'Milestone Tracking',
      'Developer Collaboration',
      'Client & Stakeholder Communication',
      'UAT & Testing',
      'Bug Reporting',
      'Release Documentation',
      'Product Support',
    ],
    focus: ['Coordinate', 'Build', 'Test', 'Deliver'],
    seenIn: ['ABsynergy', 'BSS Nagpur Hub', 'Mazacard'],
  },
  {
    id: 'research',
    title: 'Research & Analysis',
    subtitle: 'Find the why behind the problem.',
    skills: [
      'User Research',
      'Requirement Research',
      'Solution Research',
      'Market Research',
      'Feasibility Analysis',
      'Product Usage Analysis',
      'Data Interpretation',
      'Problem Analysis',
    ],
    focus: ['Question', 'Research', 'Analyse', 'Find insights'],
    seenIn: ['Lively Libraries', 'ABsynergy'],
  },
  {
    id: 'technology',
    title: 'Technology',
    subtitle: 'Bridge business needs and technical execution.',
    skills: [
      'Technical Requirement Understanding',
      'Software Development Lifecycle',
      'Web & Mobile Product Understanding',
      'AI/ML Concepts',
      'AI Applications & Tools',
      'API Fundamentals',
      'Data & Reporting',
      'Basic Scripting',
      'Technical Research',
    ],
    focus: ['Business need', 'Technical context', 'Solution'],
    seenIn: ['ABsynergy', 'BSS Nagpur Hub'],
  },
  {
    id: 'design',
    title: 'Design & Creative',
    subtitle: 'Make products and ideas easier to understand.',
    skills: [
      'UX Thinking',
      'Visual Communication',
      'Graphic Design',
      'Brand Identity',
      'Brand Guidelines',
      'Marketing Design',
      'Presentation Design',
      'Product Visuals',
      'Explanation Videos',
    ],
    focus: ['Think', 'Communicate', 'Visualise'],
    seenIn: ['Mazacard', 'Creative Practice'],
  },
]

type ToolGroup = { title: string; short: string; tools: string[] }

const toolGroups: ToolGroup[] = [
  { title: 'Product & Collaboration', short: 'Collaborate', tools: ['Trello', 'Confluence'] },
  { title: 'Design & Creative', short: 'Design', tools: ['Figma', 'Canva'] },
  {
    title: 'Productivity & Documentation',
    short: 'Document',
    tools: ['Excel', 'Google Sheets', 'Microsoft Word', 'PowerPoint'],
  },
  {
    title: 'Development & Technical',
    short: 'Build',
    tools: ['Python', 'SQL', 'Git', 'GitHub', 'VS Code'],
  },
  {
    title: 'APIs & Deployment',
    short: 'Ship',
    tools: ['Postman', 'API Fundamentals', 'Vercel'],
  },
  { title: 'AI & Workflows', short: 'Automate', tools: ['AI Tools', 'AI-Assisted Workflows'] },
]

const certifications = [
  {
    title: 'AI Product Manager Professional Certification',
    issuer: 'IBM',
    focus: ['Product Management', 'AI', 'Product Strategy'],
    url: 'https://www.coursera.org/account/accomplishments/professional-cert/POYA3RZ91ZGD',
  },
  {
    title: 'Prompt Engineering Specialization',
    issuer: 'Vanderbilt University',
    focus: ['Generative AI', 'Prompt Engineering', 'AI Applications'],
    url: 'https://www.coursera.org/account/accomplishments/specialization/C81PD8Z4G4PC',
  },
  {
    title: 'AI-Powered UI/UX Specialization',
    issuer: 'Coursera Specialization',
    focus: ['AI', 'UX', 'Product Design'],
    url: 'https://www.coursera.org/account/accomplishments/specialization/RR3CDIZ2P3K5',
  },
]

const workPrinciples = [
  { title: 'Problem Solver', description: 'Break complex problems into practical next steps.' },
  { title: 'Clear Communicator', description: 'Translate between clients, users, and technical teams.' },
  { title: 'Collaborative', description: 'Connect product thinking, design, and development.' },
  { title: 'Adaptable', description: 'Learn quickly across different products and domains.' },
  { title: 'Detail-Oriented', description: 'Pay attention to requirements, user flows, and execution.' },
  { title: 'Ownership Mindset', description: 'Follow problems through to testing, feedback, and delivery.' },
  { title: 'Curious by Nature', description: 'Ask questions, research alternatives, and seek better solutions.' },
]

/* =========================================================
   HELPERS
========================================================= */

const vars = (values: Record<string, string | number>) => values as CSSProperties

const toneOf = (index: number) => `var(--sk-t${(index % 6) + 1})`



const toolIcons: Record<string, React.ReactNode> = {
  Trello: <FaTrello />,
  Confluence: <FaBook />,
  Figma: <FaPalette />,
  Canva: <FaPalette />,
  Excel: <FaFileExcel />,
  'Google Sheets': <FaFileExcel />,
  'Microsoft Word': <FaFileWord />,
  PowerPoint: <FaFilePowerpoint />,
  Python: <FaPython />,
  SQL: <FaDatabase />,
  Git: <FaGit />,
  GitHub: <FaGithub />,
  'VS Code': <FaCode />,
  Postman: <FaPaperPlane />,
  'API Fundamentals': <FaClipboard />,
  Vercel: <FaCloud />,
  'AI Tools': <FaRobot />,
  'AI-Assisted Workflows': <FaCogs />,
}

const totalSkills = skillGroups.reduce((sum, g) => sum + g.skills.length, 0)
const totalTools = toolGroups.reduce((sum, g) => sum + g.tools.length, 0)

const glance = [
  { value: totalSkills, label: 'Skills across 5 domains', href: '#skill-explorer' },
  { value: totalTools, label: 'Tools and platforms', href: '#toolkit' },
  { value: certifications.length, label: 'Certifications', href: '#certifications' },
  { value: workPrinciples.length, label: 'Ways of working', href: '#how-i-work' },
]

function SubHeader({
  id,
  title,
  text,
}: {
  id: string
    title: React.ReactNode
  text: string
}) {
  return (
    <header className="sk-subhead">
      <h2 id={id} className="sk-subtitle">
        <span aria-hidden="true">●</span> {title}
      </h2>
      <p>{text}</p>
    </header>
  )
}

/* =========================================================
   SKILLS
========================================================= */

function Skills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeToolGroup, setActiveToolGroup] = useState<number | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const active = skillGroups[activeIndex]
  const lastIndex = skillGroups.length - 1

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === lastIndex ? 0 : index + 1
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? lastIndex : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = lastIndex
    else return

    event.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* ---------- Introduction ---------- */}
        <header className="sk-intro">
          <p className="eyebrow mb-3 italic">CAPABILITIES</p>

          <h1 className="mb-5 font-display text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            SKILLS THAT  <span className="text-[#00A6F5]"> SHIP</span>
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
            Product thinking, technical understanding, research and creative
            execution, connected to turn ideas into meaningful products.
          </p>
        </header>

        {/* At a glance */}
        <nav className="sk-glance" aria-label="Skills section overview">
          {glance.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="sk-glance-item"
              style={vars({ '--tone': toneOf(index) })}
            >
              <span className="sk-glance-value">{item.value}</span>
              <span className="sk-glance-label">{item.label}</span>
              <span className="sk-glance-arrow" aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>

        {/* ---------- Skill explorer ---------- */}
        <section id="skill-explorer" aria-labelledby="skills-title">
          <SubHeader
            id="skills-title"
            title = {<>The Capability <span className="sk-title-accent">Map</span></>}
            text="Five connected capabilities. Pick a domain to see the skills, how I approach it, and where I've used it."
          />

          <div className="sk-explorer">
            <div
              className="sk-tablist"
              role="tablist"
              aria-label="Skill domains"
              aria-orientation="vertical"
            >
              {skillGroups.map((group, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={group.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    type="button"
                    role="tab"
                    id={`skill-tab-${group.id}`}
                    aria-selected={isActive}
                    aria-controls="skill-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleTabKey(event, index)}
                    className={`sk-tab ${isActive ? 'is-active' : ''}`}
                    style={vars({ '--tone': toneOf(index) })}
                  >
                    <span className="sk-tab-dot" aria-hidden="true" />
                    <span className="sk-tab-text">
                      <span className="sk-tab-title">{group.title}</span>
                      <span className="sk-tab-count">{group.skills.length} skills</span>
                    </span>
                    <span className="sk-tab-arrow" aria-hidden="true">→</span>
                  </button>
                )
              })}
            </div>

            <div
              key={active.id}
              id="skill-panel"
              role="tabpanel"
              aria-labelledby={`skill-tab-${active.id}`}
              className="sk-panel"
              style={vars({ '--tone': toneOf(activeIndex) })}
            >
              <span className="sk-panel-ghost" aria-hidden="true">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              <h3 className="sk-panel-title">{active.title}</h3>
              <p className="sk-panel-subtitle">{active.subtitle}</p>

              <ul className="sk-chips" aria-label={`${active.title} skills`}>
                {active.skills.map((skill, index) => (
                  <li key={skill} className="sk-chip" style={vars({ '--i': index })}>
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="sk-block">
                <p className="sk-block-label">How I approach it</p>

                <ol className="sk-flow">
                  {active.focus.map((step, index) => (
                    <li key={step} style={vars({ '--i': index })}>
                      <span className="sk-flow-node">{index + 1}</span>
                      <span className="sk-flow-label">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="sk-panel-footer">
                <div className="sk-seen">
                  <span className="sk-block-label">Seen in   </span>
                  {active.seenIn.map((item) => (
                    <a
                      key={item}
                      href="#work"
                      className="sk-seen-link"
                    >
                      {item} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  className="sk-next"
                  onClick={() => setActiveIndex(activeIndex === lastIndex ? 0 : activeIndex + 1)}
                >
                  Next domain <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Toolkit ---------- */}
        <section id="toolkit" aria-labelledby="toolkit-title" className="sk-gap">
          <SubHeader
            id="toolkit-title"
            title= {<>Inside My <span className="sk-title-accent">Toolkit</span></>}
            text="The tools I use to organise work, collaborate, design, analyse and bring ideas to life. Filter by what I use them for."
          />

          <div className="sk-filters" role="group" aria-label="Filter tools by purpose">
            <button
              type="button"
              className={`sk-filter ${activeToolGroup === null ? 'is-active' : ''}`}
              aria-pressed={activeToolGroup === null}
              onClick={() => setActiveToolGroup(null)}
              style={vars({ '--tone': 'var(--color-accent)' })}
            >
              All <span>{totalTools}</span>
            </button>

            {toolGroups.map((group, index) => (
              <button
                key={group.title}
                type="button"
                className={`sk-filter ${activeToolGroup === index ? 'is-active' : ''}`}
                aria-pressed={activeToolGroup === index}
                onClick={() => setActiveToolGroup(activeToolGroup === index ? null : index)}
                style={vars({ '--tone': toneOf(index) })}
              >
                {group.short} <span>{group.tools.length}</span>
              </button>
            ))}
          </div>

          <p className="sk-filter-caption" aria-live="polite">
            {activeToolGroup === null
              ? 'Showing every tool. Select a purpose to highlight its tools.'
              : toolGroups[activeToolGroup].title}
          </p>

          <ul className="sk-tools">
            {toolGroups.flatMap((group, groupIndex) =>
              group.tools.map((tool) => {
                const dimmed = activeToolGroup !== null && activeToolGroup !== groupIndex

                return (
                  <li
                    key={`${group.title}-${tool}`}
                    className={`sk-tool ${dimmed ? 'is-dimmed' : ''}`}
                    style={vars({ '--tone': toneOf(groupIndex) })}
                  >
                    <span className="sk-tool-mark" aria-hidden="true">
                      {toolIcons[tool] ?? <FaFileAlt />}
                    </span>
                    <span className="sk-tool-text">
                      <span className="sk-tool-name">{tool}</span>
                      <span className="sk-tool-group">{group.short}</span>
                    </span>
                  </li>
                )
              }),
            )}
          </ul>
        </section>

        {/* ---------- Certifications ---------- */}
        <section id="certifications" aria-labelledby="certifications-title" className="sk-gap">
          <SubHeader
            id="certifications-title"
            title= {<>Proof of <span className="sk-title-accent">Learning</span></>}
            text="Building knowledge at the intersection of product management, artificial intelligence and user experience."
          />

          <div className="sk-tickets">
            {certifications.map((cert, index) => (
              <article
                key={cert.title}
                className="sk-ticket"
                style={vars({ '--tone': toneOf(index) })}
              >
                <div className="sk-ticket-top">
                  <span className="sk-ticket-issuer">{cert.issuer}</span>
                  <span className="sk-ticket-stamp">
                    <span aria-hidden="true">✓</span> Completed
                  </span>
                </div>

                <div className="sk-ticket-tear" aria-hidden="true" />

                <div className="sk-ticket-body">
                  <h3 className="sk-ticket-title">{cert.title}</h3>

                  <ul className="sk-ticket-tags" aria-label="Focus areas">
                    {cert.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sk-ticket-link"
                  >
                    View credential <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- How I work ---------- */}
        <section id="how-i-work" aria-labelledby="working-style-title" className="sk-gap">
          <SubHeader
            id="working-style-title"
            title= {<>My Working <span className="sk-title-accent"> DNA</span></>}
            text="The habits I bring to a team, from the first question to the final delivery."
          />


          <ul className="sk-notes">
            {workPrinciples.map((principle, index) => {
              const doodles = [
                'lightbulb',
                'message',
                'people',
                'growth',
                'checklist',
                'target',
                'search',
              ]

              return (
                <li
                  key={principle.title}
                  className={`sk-note sk-note-${doodles[index]}`}
                  style={vars({ '--tone': toneOf(index) })}
                >
                  <span className="sk-note-pin" aria-hidden="true" />

                  <span className="sk-note-doodle" aria-hidden="true">
                    {doodles[index] === 'lightbulb' && '✳'}
                    {doodles[index] === 'message' && '〰'}
                    {doodles[index] === 'people' && '♧'}
                    {doodles[index] === 'growth' && '↗'}
                    {doodles[index] === 'checklist' && '☑'}
                    {doodles[index] === 'target' && '◎'}
                    {doodles[index] === 'search' && '⌕'}
                  </span>

                  <span className="sk-note-scribble" aria-hidden="true" />

                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </li>
              )
            })}
          </ul>

        </section>
      </div>
    </section>
  )
}

export default Skills