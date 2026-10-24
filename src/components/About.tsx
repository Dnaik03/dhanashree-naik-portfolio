import './About.css'
import { useEffect, useState } from 'react'

type Strength = {
  number: string
  title: string
  description: string
  skills: string[]
}

function FlippingStrengthCard({ strength }: { strength: Strength }) {
  const [flipped, setFlipped] = useState(false)

  const details: Record<string, { heading: string; points: string[] }> = {
    '01': {
      heading: 'How I approach it',
      points: ['Understand user needs', 'Define the problem', 'Organise requirements'],
    },
    '02': {
      heading: 'How I solve problems',
      points: ['Research and investigate', 'Compare possible solutions', 'Make practical decisions'],
    },
    '03': {
      heading: 'How I bridge the gap',
      points: ['Understand technical feasibility', 'Collaborate with developers', 'Test and refine solutions'],
    },
    '04': {
      heading: 'How I create',
      points: ['Explore user experience', 'Communicate ideas visually', 'Build consistent brand experiences'],
    },
  }

  const back = details[strength.number]

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={`${flipped ? 'Show front of' : 'Explore'} ${strength.title} card`}
      className="strength-flip-button group w-full text-left"
    >
      <div className="strength-flip-stage">
        <div
          className={`strength-flip-inner ${flipped ? 'is-flipped' : ''}`}
        >
          {/* Front */}
          <div className="strength-card strength-card-front">
            <span className="strength-card-number" aria-hidden="true">
              {strength.number}
            </span>

            <div className="strength-card-topline">
              <span className="strength-card-topline-slash"></span>
              <span className="strength-card-topline-label"></span>
            </div>  

            <h3 className="strength-card-title">
              <span className="strength-card-dot" />
              {strength.title}
            </h3>

            <p className="strength-card-description">
              {strength.description}
            </p>

            <div className="strength-card-skills">
              {strength.skills.map((skill) => (
                <span key={skill} className="strength-skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <div className="strength-card-footer">
              <span>Click to explore</span>
              <span className="strength-card-arrow" aria-hidden="true">↗</span>
            </div>

            <div className="strength-card-accent" />
          </div>

          {/* Back */}
          <div className="strength-card strength-card-back">
            <div className="strength-card-topline">
              <span>{strength.number}</span>
              <span className="strength-card-topline-slash"></span>
              <span className="strength-card-topline-label"></span>
            </div>

            <h3 className="strength-card-title strength-card-back-title">
              {back.heading}
            </h3>

            <div className="strength-card-points">
              {back.points.map((point, index) => (
                <div key={point} className="strength-card-point">
                  <span className="strength-point-number">
                    0{index + 1}
                  </span>
                  <p>{point}</p>
                </div>
              ))}
            </div>

            <div className="strength-card-footer">
              <span>Click to flip back</span>
              <span className="strength-card-arrow" aria-hidden="true">↶</span>
            </div>

            <div className="strength-card-accent" />
          </div>
        </div>
      </div>
    </button>
  )
}

function About() {
  const [activeJourney, setActiveJourney] = useState(0)

  const strengths: Strength[] = [
    {
      number: '01',
      title: 'Product Thinking',
      description: 'Understanding the problem before jumping to the solution.',
      skills: ['Requirements', 'User Needs', 'Product Flows', 'Prioritisation'],
    },
    {
      number: '02',
      title: 'Problem Solving',
      description: 'Researching, questioning, connecting the dots and finding practical solutions.',
      skills: ['Research', 'Analysis', 'Solution Exploration', 'Decision Making'],
    },
    {
      number: '03',
      title: 'Technical Bridging',
      description: 'Translating business and user needs into something technical teams can build.',
      skills: ['Technical Understanding', 'Developer Collaboration', 'Testing', 'Feasibility'],
    },
    {
      number: '04',
      title: 'Creative Perspective',
      description: 'Using design and communication to make products clearer and more meaningful.',
      skills: ['UX', 'Visual Communication', 'Branding', 'Content'],
    },
  ]

  const journey = [
    {
      period: 'FOUNDATION',
      title: 'BCA',
      description: 'Built my foundation in technology and software.',
    },
    {
      period: 'SPECIALISATION',
      title: 'MCA — AI/ML',
      description: 'Developed an interest in how emerging technology can be applied to real-world problems.',
    },
    {
      period: 'PRODUCT EXPERIENCE',
      title: 'Product Internship',
      description: 'Worked across product discovery, requirements, testing, documentation, client communication, coordination and delivery.',
    },
    {
      period: 'INDEPENDENT PROJECTS',
      title: 'Freelance Product Projects',
      description: 'Took ownership of requirements, research, product understanding, client communication, developer coordination, design and delivery.',
    },
    {
      period: 'THE NEXT CHAPTER',
      title: 'Building toward Product',
      description: 'Growing through product thinking, problem solving and technical collaboration to build useful, meaningful products.',
    },
  ]

  const stats = [
    {
      value: '4+',
      label: 'Projects Delivered',
      detail: 'Across products and platforms',
      category: 'MAKE',
      theme: 'blue',
      link: '',
      linkText: '',
    },
    {
      value: '98%',
      label: 'Customer Satisfaction',
      detail: 'Built on trust and collaboration',
      category: 'TRUST',
      theme: 'green',
      link: '',
      linkText: '',
    },
    {
      value: '5+',
      label: 'Skills & Credentials',
      detail: 'A growing toolkit of skills and certifications',
      category: 'GROW',
      theme: 'purple',
      link: '#skills',
      linkText: 'Explore my skills',
    },
    {
      value: '01+',
      label: 'Year of Experience',
      detail: 'Product internship · Product and delivery experience',
      category: 'APPLY',
      theme: 'orange',
      link: '',
      linkText: '',
    },
  ]

  // The character and the milestone cards share the same 25-second cycle.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveJourney((current) => (current + 1) % journey.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const checkpointPositions = [
    { x: 7, y: 50 },
    { x: 28, y: 75 },
    { x: 50, y: 50 },
    { x: 72, y: 25 },
    { x: 93, y: 50 },
  ]

  const checkpointEmojis = ['🌱', '📚', '🧩', '🎨', '🚀']

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section heading */}
        <div className="mb-10">
          <p className="eyebrow mb-3 italic">A STORY</p>
          <h1 className="mb-5 font-display text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            ABOUT <span className="text-[#00A6F5]">ME</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
            The person behind the products, the process and the ideas.
          </p>
        </div>

        {/* Introduction */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div className="relative mx-auto w-full max-w-sm px-2 pb-2">
            <div className="absolute inset-0 -translate-y-2 translate-x-2 rounded-[2rem] border border-[#00A6F5]/50" />
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-[#DCEEFF] shadow-[0_20px_50px_rgba(17,24,39,0.12)]">
              <img
                src="/about-photo.jpeg"
                alt="Portrait of Dhanashree Naik"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 -left-2 z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white shadow-lg">
              <span className="font-display text-2xl font-black text-[#00A6F5]">DN</span>
            </div>
          </div>

          <div className="pt-3 lg:pt-0">
            <h2 className="max-w-2xl font-body text-2xl font-bold leading-tight tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
              Where logic meets creativity and ideas turn into{' '}
              <span className="text-[#00A6F5]">meaningful products.</span>
            </h2>

            <p className="mt-10 text-base leading-7 text-[#374151]">
              Over the past few years, I’ve worked closely with clients,
              developers, and users to understand problems, shape solutions,
              and turn ideas into working products. My experience also extends
              into design, branding, and data, giving me a broader perspective
              on how products are built, communicated, and improved.
            </p>

            <p className="mt-4 text-base leading-7 text-[#374151]">
              I’m particularly interested in the space between people, problems,
              and technology while understanding what needs to be solved, why it
              matters, and how technology can turn the right idea into something
              useful.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Dnaik03"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#111827] transition-all hover:-translate-y-1 hover:border-[#00A6F5] hover:text-[#00A6F5]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>

              <a
                href="https://www.behance.net/dhanashree_naik"
                target="_blank"
                rel="noreferrer"
                aria-label="Behance portfolio"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#111827] transition-all hover:-translate-y-1 hover:border-[#00A6F5] hover:text-[#00A6F5]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M9.4 11.2c1.5-.7 2.3-1.7 2.3-3.3 0-3-2.2-3.9-4.8-3.9H0v16h7.1c3 0 5.7-1.4 5.7-4.7 0-2.1-1.1-3.6-3.4-4.1ZM3.5 6.7h3.1c1.2 0 2.3.3 2.3 1.8 0 1.3-.9 1.9-2.1 1.9H3.5V6.7Zm3.9 10.4H3.5v-4h3.8c1.5 0 2.5.7 2.5 2.2 0 1.4-1.1 1.8-2.4 1.8ZM17.8 8.2c-4.1 0-6.2 3-6.2 6.3 0 3.7 2.4 6.1 6.3 6.1 2.8 0 4.9-1.3 5.7-4h-3.1c-.2.8-1.3 1.4-2.5 1.4-1.8 0-2.8-.9-2.9-2.8H24c.3-3.8-1.8-7-6.2-7ZM15.1 13c.1-1.5 1.1-2.5 2.7-2.5 1.5 0 2.3.9 2.5 2.5h-5.2ZM14 4h7v1.8h-7V4Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/dhanashree-naik/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#111827] transition-all hover:-translate-y-1 hover:border-[#00A6F5] hover:text-[#00A6F5]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M5.2 3.2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.7V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V9Z" />
                </svg>
              </a>

              <a
                href="#contact"
                aria-label="Go to contact section"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#111827] shadow-sm transition-all hover:-translate-y-1 hover:border-[#00A6F5] hover:text-[#00A6F5]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>

              <div className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-[#111827]">
                <span className="text-[#00A6F5]">⌖</span>
                Nagpur, India
              </div>
            </div>
          </div>
        </div>


        {/* What I bring */}
        <section className="strengths-section">
          
          <div className="mb-16 mt-30">
            <h2 className="max-w-2xl font-mono text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
              <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-[#B49352] align-middle" />
              What <span className="text-[#00A6F5]">I bring</span>
            </h2>
            <p className="mt-10 text-base leading-7 text-[#374151]">
              to products and the people who use them.
            </p>
          </div>

          <div className="strengths-grid">
            {strengths.map((strength) => (
              <FlippingStrengthCard
                key={strength.number}
                strength={strength}
              />
            ))}
          </div>
        </section>

        {/* My journey */}
        <div className="mb-16 mt-30">
          <h2 className="max-w-2xl font-mono text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
          <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-[#B49352] align-middle" />
            My <span className="text-[#00A6F5]">journey</span>
          </h2>
          <p className="mt-10 text-base leading-7 text-[#374151]">
            From learning how technology works to understanding how to make it useful.
          </p>
        </div>

        <div className="quest-map relative w-full">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 440"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="careerRouteGradient">
                <stop offset="0%" stopColor="#527b9d" />
                <stop offset="50%" stopColor="#00a6f5" />
                <stop offset="100%" stopColor="#527b9d" />
              </linearGradient>
            </defs>

            {/* Dotted trees and landscape */}
            <g
              fill="none"
              stroke="#7da8c5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 6"
              opacity="0.8"
            >
              <path d="M155 82 V108" />
              <circle cx="155" cy="72" r="12" />
              <circle cx="145" cy="81" r="8" />
              <circle cx="165" cy="81" r="8" />
              <circle cx="155" cy="87" r="7" />

              <path d="M825 78 V104" />
              <circle cx="825" cy="68" r="12" />
              <circle cx="815" cy="77" r="8" />
              <circle cx="835" cy="77" r="8" />
              <circle cx="825" cy="83" r="7" />

              <path d="M650 335 V362" />
              <circle cx="650" cy="326" r="10" />
              <circle cx="642" cy="335" r="7" />
              <circle cx="658" cy="335" r="7" />

              <path d="M365 350 V375 M365 365 l-8 -5 M365 369 l8 -6" />
              <circle cx="365" cy="345" r="5" />
              <circle cx="358" cy="350" r="5" />
              <circle cx="372" cy="350" r="5" />
              <circle cx="365" cy="355" r="5" />
              <circle cx="365" cy="350" r="2" />

              <path d="M65 65 Q58 56 68 52 Q74 44 81 52 Q91 49 95 59 Q100 65 91 67 H69 Q63 67 65 65Z" />

              <path d="M880 365 V380" />
              <circle cx="872" cy="361" r="7" />
              <circle cx="880" cy="356" r="8" />
              <circle cx="888" cy="362" r="7" />
            </g>

            <g fill="#7da8c5" opacity="0.65">
              <circle cx="220" cy="80" r="2" />
              <circle cx="232" cy="92" r="1.5" />
              <circle cx="680" cy="70" r="2" />
              <circle cx="690" cy="82" r="1.5" />
              <circle cx="120" cy="350" r="2" />
              <circle cx="130" cy="360" r="1.5" />
              <circle cx="905" cy="320" r="2" />
              <circle cx="915" cy="330" r="1.5" />
            </g>

            {/* Dotted winding route */}
            <path
              d="M70 220 C150 220 180 330 280 330 S410 220 500 220 S630 110 720 110 S850 220 930 220"
              fill="none"
              stroke="url(#careerRouteGradient)"
              strokeWidth="3"
              strokeDasharray="2 12"
              strokeLinecap="round"
            />

            {/* Character follows the route and grows */}
            <text
              fontSize="40"
              textAnchor="middle"
              dominantBaseline="central"
              aria-label="Travelling explorer"
            >
              🧑‍🚀
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                path="M70 220 C150 220 180 330 280 330 S410 220 500 220 S630 110 720 110 S850 220 930 220"
                rotate="auto"
              />
              <animate
                attributeName="font-size"
                values="20;23;27;32;38"
                keyTimes="0;0.25;0.5;0.75;1"
                dur="25s"
                repeatCount="indefinite"
              />
            </text>
          </svg>

          {/* Milestone markers */}
          {journey.map((item, index) => {
            const position = checkpointPositions[index]
            const isActive = activeJourney === index

            return (
              <div
                key={item.title}
                className="quest-pin absolute z-10 flex flex-col items-center text-center"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl transition-all duration-500 ${isActive
                      ? 'scale-110 border-sky-200 bg-sky-700 shadow-[0_0_0_8px_rgba(0,166,245,0.12),0_0_25px_rgba(0,166,245,0.25)]'
                      : 'border-slate-200 bg-white'
                    }`}
                >
                  {checkpointEmojis[index]}
                </span>

                <span
                  className={`mt-2 max-w-28 rounded-md px-2 py-1 font-mono text-[10px] font-semibold leading-4 tracking-wide ${isActive ? 'bg-sky-800 text-white' : 'text-slate-800'
                    }`}
                >
                  {item.period}
                </span>
              </div>
            )
          })}

          {/* Active milestone message */}
          {journey[activeJourney] && (
            <div
              key={activeJourney}
              className="quest-popup absolute z-20 w-[min(320px,calc(100%-24px))] rounded-2xl border border-slate-210 bg-white p-8 shadow-xl"
              style={{
                left:
                  activeJourney === 0
                    ? '12%'
                    : activeJourney === 1
                      ? '17%'
                      : activeJourney === 2
                        ? '45%'
                        : activeJourney === 3
                          ? '58%'
                          : 'auto',
                right: activeJourney === 4 ? '1%' : 'auto',
                top:
                  activeJourney === 0
                    ? '3%'
                    : activeJourney === 1
                      ? '9%'
                      : activeJourney === 2
                        ? '64%'
                        : activeJourney === 3
                          ? '42%'
                          : '62%',
              }}
              role="status"
              aria-live="polite"
            >
              <p className="font-mono text-xs text-slate-600">
                {journey[activeJourney].period}
              </p>
              <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-950">
                {journey[activeJourney].title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {journey[activeJourney].description}
              </p>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.12em] text-slate-500">
            05 CHECKPOINTS · ONE EVOLVING JOURNEY
          </p>
          <p className="text-xs text-slate-500">Follow the explorer</p>
        </div>


        {/* Creative desk stats */}
        <div className="mb-16 mt-30">

          <h2 className="font-mono text-3xl font-black tracking-tight text-[#111827] sm:text-4xl lg:text-4xl">
            <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-[#B49352] align-middle" />
            The little things <span className="text-[#00A6F5]">add up</span>
          </h2>

          <p className="mt-10 text-base leading-7 text-[#374151]">
            A snapshot of the work I’ve done, the skills I’ve built, and the
            experience I bring to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Projects delivered — creative website desk */}
          <a
            href="#work"
            className="group relative overflow-hidden rounded-[2rem] border border-[#E8DDF7] bg-[#FAF6FF] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100 sm:p-6"
          >
            <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-[#087FC0] shadow-sm">
              MAKE
            </span>

            <div className="relative mt-7 h-36">
              <div className="absolute left-4 top-5 h-24 w-32 rotate-[-10deg] rounded-xl border border-slate-200 bg-white shadow-md transition-transform duration-500 group-hover:-rotate-6">
                <div className="flex h-5 items-center gap-1 border-b border-slate-100 px-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </div>
                <div className="space-y-2 p-3">
                  <div className="h-2 w-4/5 rounded-full bg-slate-800" />
                  <div className="h-2 w-full rounded-full bg-slate-200" />
                  <div className="h-2 w-2/3 rounded-full bg-slate-200" />
                  <div className="h-4 w-12 rounded bg-[#00A6F5]" />
                </div>
              </div>

              <div className="absolute right-2 top-8 h-24 w-32 rotate-[8deg] rounded-xl border border-slate-200 bg-white p-3 shadow-md transition-transform duration-500 group-hover:rotate-3">
                <div className="mb-2 h-10 rounded-lg bg-gradient-to-br from-[#D9ECFF] to-[#E7DEFF]" />
                <div className="h-2 w-4/5 rounded-full bg-slate-300" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-200" />
              </div>

              <span className="absolute bottom-0 left-2 rotate-[-5deg] rounded-md bg-[#FFF0C9] px-3 py-2 text-[10px] font-black tracking-widest text-[#895B00] shadow-sm">
                REAL WORLD
              </span>

              <span className="absolute right-4 top-0 text-2xl text-[#00A6F5] transition-transform group-hover:rotate-12">
                ✳
              </span>
            </div>

            <p
              className="font-display text-5xl font-black tracking-tight text-[#087FC0] sm:text-6xl"
              style={{ marginTop: "35px" }}
            >
              {stats[0].value}
            </p>

            <h3
              className="text-lg font-bold text-[#111827]"
              style={{ marginTop: "18px" }}
            >
              {stats[0].label}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              {stats[0].detail}
            </p>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#00A6F5] transition-all duration-800 group-hover:w-32" />
          </a>

          {/* Customer satisfaction — hand-drawn style gauge */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-[#D8F0E6] bg-[#F2FCF7] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100 sm:p-6">
            <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-[#128568] shadow-sm">
              TRUST
            </span>

            <div
              className="relative mt-10 flex h-[196px] items-center justify-center"
              style={{ marginBottom: "50px" }}
            >
              <div className="absolute h-46 w-46 rounded-full bg-[#DDF7ED] transition-transform duration-500 group-hover:scale-110" />  

              <svg viewBox="0 0 140 140" className="relative h-32 w-32 -rotate-90">
                <circle
                  cx="70"
                  cy="70"
                  r="63"
                  fill="white"
                  stroke="#BDEBD9"
                  strokeWidth="9"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="63"
                  fill="none"
                  stroke="#18B88A"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 53 * 0.98} ${2 * Math.PI * 53}`}
                  className="transition-all duration-1000"
                />
              </svg>

              <span className="absolute -right-1 top-5 rotate-12 rounded-xl bg-white px-3 py-2 text-xl text-[#18A77D] shadow-md transition-transform group-hover:rotate-6">
                ♥
              </span>

              <span className="absolute bottom-1 left-2 text-2xl text-[#18A77D]">
                ✳
              </span>
            </div>

            <p className="mt-0 font-display text-5xl font-black tracking-tight text-[#087C62] sm:text-6xl">
              {stats[1].value}
            </p>

            <h3
              className="text-lg font-bold text-[#111827]"
              style={{ marginTop: "10px" }}
            >
              {stats[1].label}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              {stats[1].detail}
            </p>
            <div className="mt-4 h-1 w-20 rounded-full bg-[#00A6F5] transition-all duration-800 group-hover:w-32" />
          </article>

          {/* Skills and credentials — layered sticky notes */}
          <a
            href="#skills"
            className="group relative overflow-hidden rounded-[2rem] border border-[#E8DDF7] bg-[#FAF6FF] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100 sm:p-6"
          >
            <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-[#7847B8] shadow-sm">
              GROW
            </span>

            <div className="relative mt-7 h-36">
              <div className="absolute left-3 top-5 h-20 w-28 rotate-[-9deg] rounded-sm bg-[#D9ECFF] p-3 shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-12deg]">
                <p className="text-[10px] font-black tracking-widest text-[#087FC0]">PRODUCT</p>
                <p className="mt-2 text-xs font-semibold text-slate-800">Thinking</p>
              </div>

              <div className="absolute right-2 top-3 h-20 w-28 rotate-[8deg] rounded-sm bg-[#FFE0E5] p-3 shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[12deg]">
                <p className="text-[10px] font-black tracking-widest text-[#B4415A]">DESIGN</p>
                <p className="mt-2 text-xs font-semibold text-slate-800">UI / UX</p>
              </div>

              <div className="absolute bottom-0 left-9 h-20 w-28 rotate-[4deg] rounded-sm bg-[#FFF0C9] p-3 shadow-md transition-transform duration-300 group-hover:rotate-[8deg]">
                <p className="text-[10px] font-black tracking-widest text-[#895B00]">RESEARCH</p>
                <p className="mt-2 text-xs font-semibold text-slate-800">Testing</p>
              </div>

              <div className="absolute bottom-1 right-1 h-20 w-28 rotate-[-5deg] rounded-sm bg-[#DDF5E5] p-3 shadow-md transition-transform duration-300 group-hover:rotate-[-9deg]">
                <p className="text-[10px] font-black tracking-widest text-[#247548]">TECH</p>
                <p className="mt-2 text-xs font-semibold text-slate-800">AI / ML</p>
              </div>

              <span className="absolute right-0 top-0 text-2xl text-[#9369D5]">
                ✦
              </span>
            </div>

            <p
              className="font-display text-5xl font-black tracking-tight text-[#087FC0] sm:text-6xl"
              style={{ marginTop: "25px" }}
            >
              {stats[2].value}
            </p>

            <h3
              className="text-lg font-bold text-[#111827]"
              style={{ marginTop: "14px" }}
            >
              {stats[2].label}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              {stats[2].detail}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#7847B8]">
              Explore my skills <span className="transition-transform group-hover:translate-x-1">↗</span>
            </span>

            <div className="mt-2 h-1 w-20 rounded-full bg-[#9369D5] transition-all duration-300 group-hover:w-32" />
          </a>

          {/* Experience — hanging work badge */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-[#F2E4C9] bg-[#FFFAEF] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-100 sm:p-6">
            <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-[#A86A0B] shadow-sm">
              APPLY
            </span>

            <div className="relative flex h-58 items-center justify-center">
              <div className="absolute left-6 top-3 h-28 w-36 rotate-[-7deg] rounded-lg border border-[#E7D9B9] bg-white shadow-sm" />

              <div className="absolute top-0 z-10 h-12 w-6 rounded-t-full border-[5px] border-b-0 border-[#D4A23A]" />

              <div className="absolute top-25 z-20 flex h-34 w-36 rotate-[4deg] flex-col items-center justify-center rounded-lg border border-[#BCE9DA] bg-[#E5F8F0] shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-0">
                <span className="text-6xl font-black text-[#087C62]">
                  {stats[3].value}
                </span>
              </div>
            </div>

            <h3
              className="text-lg font-bold text-[#111827]"
              style={{ marginTop: "19px" }}
            >
              {stats[3].label}
            </h3>

            <p className="mt-4 text-sm leading-6 text-[#64748B]">
              {stats[3].detail}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FFF0D9] px-3 py-2 text-xs font-bold text-[#895B00]">
              <span className="h-2 w-2 rounded-full bg-[#E3A43A]" />
              Learning by doing
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
