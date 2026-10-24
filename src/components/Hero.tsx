
import { motion } from 'motion/react'
import { TypeAnimation } from 'react-type-animation'


const roles = [
  'Product Associate',
  1800,
  'Associate Product Manager',
  1800,
  'Product Operations Associate',
  1800,
  'Product / Business Analyst',
  1800,
  'UI / UX Designer',
  1800,
  'Graphic Designer',
  1800,
]

const strengths = [
  'Product Thinking',
  'Problem Solving',
  'Technical Bridging',
  'Creative Thinking',
]

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className="w-full"
    >
      <div className="availability-badge mb-7 inline-flex items-center gap-2 rounded-full border border-[#A7F3D0] bg-[#D1FAE5] px-4 py-2 text-sm font-medium text-[#065F46]">
        <span
          className="h-2 w-2 rounded-full bg-[var(--color-mint)]"
          aria-hidden="true"
        />
        Available for opportunities
      </div>

      <h1 className="mb-5 text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
        Hi, I am <span className="text-accent">Dhanashree Naik</span>
      </h1>

      <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
        I turn ideas into meaningful products.
      </h2>

      <div className="mt-5 min-h-[36px] text-xl font-semibold text-accent sm:text-2xl">
        <TypeAnimation
          sequence={roles}
          wrapper="span"
          speed={55}
          deletionSpeed={65}
          repeat={Infinity}
        />
        <span
          className="ml-1 animate-pulse text-[var(--color-gold)]"
          aria-hidden="true"
        >
          |
        </span>
      </div>

      <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-[var(--color-text-secondary)] sm:text-base">
        {strengths.map((strength, index) => (
          <span key={strength}>
            {index > 0 && (
              <span className="px-2 text-[var(--color-gold)]" aria-hidden="true">
                ·
              </span>
            )}
            <span className="font-semibold text-[var(--color-text)]">
              {strength}
            </span>
          </span>
        ))}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href="#work" className="btn btn-primary">
          Explore My Work <span aria-hidden="true">→</span>
        </a>

        <a href="public/Dhanashree_Naik_Resume.pdf" download className="btn btn-secondary">
          Download Resume <span aria-hidden="true">↓</span>
        </a>
      </div>
    </motion.div>
  )
}

export default Hero
