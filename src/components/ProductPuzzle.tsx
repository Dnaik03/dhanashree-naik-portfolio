
import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'

const productSteps = [
  {
    number: '01',
    title: 'Understand',
    detail: 'Requirements · Users · Pain Points',
    description:
      'I start by understanding the people, their needs, and the problem worth solving.',
    symbol: '◎',
  },
  {
    number: '02',
    title: 'Research',
    detail: 'Market · Solutions · Feasibility',
    description:
      'I explore existing solutions, research alternatives, and evaluate feasibility.',
    symbol: '⌕',
  },
  {
    number: '03',
    title: 'Design',
    detail: 'Features · Flows · Experience',
    description:
      'I translate insights into features, user flows, and practical product experiences.',
    symbol: '✳',
  },
  {
    number: '04',
    title: 'Build',
    detail: 'Developers · Testing · Delivery',
    description:
      'I collaborate with developers, review implementations, test features, and support delivery.',
    symbol: '↗',
  },
]

const pieceColors = [
  'border-sky-300 bg-sky-50 text-sky-700',
  'border-indigo-200 bg-indigo-50 text-indigo-700',
  'border-amber-200 bg-amber-50 text-amber-700',
  'border-emerald-200 bg-emerald-50 text-emerald-700',
]

const startPositions = [
  { left: '3%', top: '3%' },
  { right: '3%', top: '3%' },
  { left: '3%', bottom: '3%' },
  { right: '3%', bottom: '3%' },
]

function ProductPuzzle() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [connectedSteps, setConnectedSteps] = useState<number[]>([])
  const [snappedPositions, setSnappedPositions] = useState<
    Record<number, { x: number; y: number }>
  >({})
  const [isFalling, setIsFalling] = useState(false)

 
  const targetRef = useRef<HTMLDivElement>(null)

  const isComplete = connectedSteps.length === productSteps.length

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY < 200 && isFalling) {
        setIsFalling(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFalling])

  function handleDrop(
    index: number,
    info: { offset: { x: number; y: number } },
  ) {
    if (!targetRef.current) return

    const target = targetRef.current.getBoundingClientRect()
    const piece = document.querySelector(
      `[aria-label="Explore ${productSteps[index].title} puzzle piece"]`,
    )

    if (!(piece instanceof HTMLElement)) return

    const pieceRect = piece.getBoundingClientRect()
    const pieceCentreX = pieceRect.left + pieceRect.width / 2
    const pieceCentreY = pieceRect.top + pieceRect.height / 2
    const margin = 55

    const nearTarget =
      pieceCentreX >= target.left - margin &&
      pieceCentreX <= target.right + margin &&
      pieceCentreY >= target.top - margin &&
      pieceCentreY <= target.bottom + margin

    if (!nearTarget) return

    const column = index % 2
    const row = Math.floor(index / 2)

    const destinationX =
      target.left + (target.width * (column + 0.5)) / 2
    const destinationY =
      target.top + (target.height * (row + 0.5)) / 2

    setSnappedPositions((previous) => ({
      ...previous,
      [index]: {
        x: info.offset.x + destinationX - pieceCentreX,
        y: info.offset.y + destinationY - pieceCentreY,
      },
    }))

    setConnectedSteps((previous) =>
      previous.includes(index) ? previous : [...previous, index],
    )
  }

  function resetPuzzle() {
    setConnectedSteps([])
    setSnappedPositions({})
    setActiveStep(null)
    setHoveredStep(null)
    setIsFalling(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={
        isFalling
          ? { y: 700, rotate: 4, opacity: 0 }
          : { opacity: 1, y: 0, rotate: 0 }
      }
      transition={
        isFalling
          ? { duration: 0.8, ease: 'easeIn' }
          : { duration: 0.7, delay: 0.15 }
      }
      className="mx-auto w-full max-w-lg"
    >
      {/* Puzzle introduction */}
      <div className="mb-5">
        <p className="eyebrow mb-3">MY PRODUCT PHILOSOPHY</p>

        <h1 className="mb-5 text-4xl sm:text-3xl">
          How I solve{' '}
          <span className="text-accent">problems.</span>
        </h1>

        <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
          Explore the pieces, Connect the thinking.
        </p>
      </div>

      {/* Puzzle board */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-theme-border)] bg-[var(--color-surface)] p-3 shadow-[0_20px_70px_rgba(17,24,39,0.07)] sm:p-4">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-accent-soft)] opacity-70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[var(--color-mint-light)] opacity-50 blur-3xl" />

        <div className="relative">
          {/* Board label and progress */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="section-label-text text-[10px]">
              THE PRODUCT PUZZLE
            </span>

            <span
              className="text-xs font-medium text-[var(--color-text-secondary)]"
              aria-live="polite"
            >
              {connectedSteps.length} / 4 connected
            </span>
          </div>

          {/* Interactive workspace */}
          <div
            className="relative h-[320px] overflow-hidden rounded-2xl border border-dashed border-[var(--color-theme-border)] bg-[var(--color-surface-secondary)] sm:h-[340px]"
          >
            {/* Hover description */}
            {!isComplete && hoveredStep !== null && (
              <motion.div
                key={hoveredStep}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute bottom-2 left-1/2 z-30 w-[90%] max-w-[340px] -translate-x-1/2 rounded-xl border border-[var(--color-theme-border)] bg-[var(--color-surface)] p-3 shadow-xl"
              >
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)]">
                  {productSteps[hoveredStep].title}
                </h3>

                <p className="mt-1 text-xs font-medium text-accent">
                  {productSteps[hoveredStep].detail}
                </p>

                <p className="mt-2 text-sm leading-5 text-[var(--color-text-secondary)]">
                  {productSteps[hoveredStep].description}
                </p>
              </motion.div>
            )}

            {/* Connection paths */}
            <svg
              viewBox="0 0 320 440"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 55 65 Q 160 90 160 220"
                stroke="var(--color-theme-border)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <path
                d="M 265 65 Q 160 90 160 220"
                stroke="var(--color-theme-border)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <path
                d="M 55 375 Q 160 350 160 220"
                stroke="var(--color-theme-border)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <path
                d="M 265 375 Q 160 350 160 220"
                stroke="var(--color-theme-border)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            </svg>

            {/* Four-cell destination */}
            <div
              ref={targetRef}
              className={`absolute left-1/2 top-1/2 z-0 grid h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 grid-cols-2 grid-rows-2 overflow-hidden rounded-2xl border-2 transition-colors sm:h-[260px] sm:w-[260px] ${isComplete
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                  : 'border-[var(--color-theme-border)] bg-[var(--color-surface)]'
                }`}
            >
              {!isComplete ? (
                <>
                  <div className="border-b border-r border-[var(--color-theme-border)] bg-[var(--color-surface)]" />
                  <div className="border-b border-[var(--color-theme-border)] bg-[var(--color-surface)]" />
                  <div className="border-r border-[var(--color-theme-border)] bg-[var(--color-surface)]" />
                  <div className="bg-[var(--color-surface)]" />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`col-span-2 row-span-2 flex flex-col items-center justify-center bg-[var(--color-accent)] px-3 text-center text-white ${isFalling ? 'pointer-events-none' : ''
                    }`}
                >
                  <p className="font-mono text-[10px] font-bold tracking-[0.2em] !text-white">
                    THE RESULT
                  </p>

                  <h3 className="mt-2 font-heading text-3xl font-extrabold !text-white sm:text-4xl">
                    SOLUTION
                  </h3>

                  <motion.a
                    href="#work"
                    onClick={(event) => {
                      event.preventDefault()
                      setIsFalling(true)

                      window.setTimeout(() => {
                        document.getElementById('work')?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }, 300)
                    }}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full !bg-white px-5 py-3 text-sm font-bold !text-[#0B1120] shadow-md transition-all duration-200 hover:-translate-y-1 hover:!bg-slate-100 hover:shadow-lg"
                  >
                    <span>Explore My Work</span>
                    <span aria-hidden="true">→</span>
                  </motion.a>
                </motion.div>
              )}
            </div>

            {/* Puzzle pieces */}
            {!isComplete &&
              productSteps.map((step, index) => {
                const isConnected = connectedSteps.includes(index)
                const isActive = activeStep === index

                return (
                  <motion.button
                    key={step.title}
                    type="button"
                    drag={!isConnected && !isFalling}
                    dragMomentum={false}
                    dragElastic={0.04}
                    onMouseEnter={() => {
                      setHoveredStep(index)
                      setActiveStep(index)
                    }}
                    onMouseLeave={() => setHoveredStep(null)}
                    onFocus={() => {
                      setHoveredStep(index)
                      setActiveStep(index)
                    }}
                    onBlur={() => setHoveredStep(null)}
                    onDragEnd={(_, info) => handleDrop(index, info)}
                    animate={
                      isFalling
                        ? {
                          y: 650,
                          x: index % 2 === 0 ? -80 : 80,
                          rotate: index % 2 === 0 ? -35 : 35,
                          opacity: 0,
                          scale: 0.8,
                        }
                        : isConnected && snappedPositions[index]
                          ? {
                            x: snappedPositions[index].x,
                            y: snappedPositions[index].y,
                            scale: 1,
                          }
                          : {
                            x: 0,
                            y: 0,
                            scale: isActive ? 1.03 : 1,
                          }
                    }
                    transition={
                      isFalling
                        ? {
                          duration: 0.8,
                          ease: [0.45, 0, 1, 1],
                          delay: index * 0.08,
                        }
                        : { type: 'spring', stiffness: 300, damping: 26 }
                    }
                    style={{
                      ...startPositions[index],
                      position: 'absolute',
                      zIndex: isConnected ? 5 : isActive ? 20 : 10,
                      touchAction: 'none',
                    }}
                    className={`flex h-[108px] w-[108px] flex-col items-center justify-center rounded-2xl border shadow-sm transition-colors sm:h-[128px] sm:w-[128px] ${pieceColors[index]
                      } ${isActive && !isConnected
                        ? 'ring-2 ring-[var(--color-accent)]/30'
                        : ''
                      } ${isConnected
                        ? 'pointer-events-none'
                        : 'cursor-grab active:cursor-grabbing'
                      }`}
                    aria-label={`Explore ${step.title} puzzle piece`}
                    aria-pressed={isConnected}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {step.symbol}
                    </span>

                    <span className="mt-1 font-heading text-xs font-bold">
                      {step.title}
                    </span>

                    <span className="mt-1 font-mono text-[9px] opacity-60">
                      {step.number}
                    </span>
                  </motion.button>
                )
              })}
          </div>

          {/* Reset */}
          {connectedSteps.length > 0 && (
            <button
              type="button"
              onClick={resetPuzzle}
              className="mt-3 text-xs font-medium text-[var(--color-text-muted)] underline underline-offset-4 transition-colors hover:text-accent"
            >
              Reset puzzle
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductPuzzle
