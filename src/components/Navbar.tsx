
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Beyond Work', href: '#beyond-work' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const navLinkClass =
    'whitespace-nowrap text-sm font-medium text-[var(--color-slate)] transition-colors duration-200 hover:text-[var(--color-blue)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-off-white)]/95 backdrop-blur-md">
      <nav
        className="container flex min-h-[76px] items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
          aria-label="Dhanashree.builds — Home"
        >
          <span className="font-heading text-lg font-bold tracking-tight text-[var(--color-navy)]">
            Dhanashree.builds
          </span>

          <span
            className="ml-1 text-xl text-[var(--color-gold)]"
            aria-hidden="true"
          >
            ●
          </span>

          <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-[var(--color-muted)] sm:text-xs">
            PRODUCT THINKING · TECHNOLOGY · DESIGN
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex items-center gap-5 xl:gap-6">
            {navItems.map(({ label, href }) => (
              <a key={href} href={href} className={navLinkClass}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeToggle />

          <a href="#contact" className="btn btn-primary shrink-0 text-sm">
            Let's Connect <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-lg border border-[var(--color-border)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--color-border)] bg-[var(--color-off-white)] px-6 pb-5 pt-3 shadow-lg lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="container">
            <div className="flex flex-col">
              {navItems.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="border-b border-[var(--color-border)] py-3 text-sm font-medium text-[var(--color-slate)] transition-colors hover:text-[var(--color-blue)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                >
                  {label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={closeMenu}
                className="btn btn-primary mt-4 w-full text-sm"
              >
                Let's Connect <span aria-hidden="true">→</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
