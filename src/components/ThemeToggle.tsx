
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const THEME_KEY = 'portfolio-theme'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Use the default theme if storage is unavailable.
  }

  return 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // Theme switching still works for the current session.
    }
  }, [theme])

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-blue-light)]"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {isLight ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          <path d="m4.93 4.93 1.42 1.42m11.3 11.3 1.42 1.42" />
          <path d="m6.35 17.65-1.42 1.42m14.14-14.14-1.42 1.42" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
