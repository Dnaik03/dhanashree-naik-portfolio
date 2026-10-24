import './Footer.css'

/* ---------- Easy-to-edit settings ---------- */
const NAME = 'Dhanashree Naik'
const EMAIL = 'dhanashreenaik.work@gmail.com'
const LOCATION = 'Nagpur, Maharashtra, India'
const TAGLINE = 'Product thinking, problem solving, technology and execution.'

// Match these ids/labels to your Navbar
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Beyond Work', href: '#beyond-work' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhanashree-naik/' },
  { label: 'GitHub', href: 'https://github.com/YOUR_GITHUB_USERNAME' },
  { label: 'Behance', href: 'https://www.behance.net/dhanashree_naik' },
]

function Footer() {
  const year = new Date().getFullYear()

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="sf-grid">
          {/* Brand */}
          <div className="sf-brand">
            <a href="#" className="sf-logo" aria-label={`${NAME} – back to top`}>
              <span className="sf-monogram" aria-hidden="true">DN</span>
              <span className="sf-name">{NAME}<span className="sf-dot">.</span></span>
            </a>
            <p className="sf-tagline">{TAGLINE}</p>
            <a href={`mailto:${EMAIL}`} className="sf-email">{EMAIL}</a>
            <p className="sf-location">📍 {LOCATION}</p>
          </div>

          {/* Quick links */}
          <nav className="sf-col" aria-label="Footer navigation">
            <h3 className="sf-heading">EXPLORE</h3>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="sf-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="sf-col">
            <h4 className="sf-heading">FIND ME ONLINE</h4>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="sf-link">
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="sf-col sf-cta">
            <h4 className="sf-heading">GOT AN IDEA?</h4>
            <p>Hiring, building or just curious? My inbox is open.</p>
            <a href="#contact" className="sf-btn">
              Let's talk <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>

        <div className="sf-bottom">
          <p>© {year} {NAME}. All rights reserved.</p>
          <button
            type="button"
            className="sf-top sf-ball-launch"
            onClick={backToTop}
            aria-label="Throw ball to return to top"
          >
            <span className="sf-ball" aria-hidden="true">
              <span className="sf-ball-arrow">↑</span>
            </span>
            <span className="sf-ball-label">Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer