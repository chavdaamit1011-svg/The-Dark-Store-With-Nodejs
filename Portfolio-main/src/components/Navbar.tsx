import React, { useState, useEffect } from 'react'
import heroImg from '../assets/amit.jpeg'

interface NavbarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed-top w-100 z-50 transition-all ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="container px-3 px-lg-4">
          <div className="d-flex align-items-center justify-content-between py-1">
            
            {/* PART 1: LEFT SIDE (Profile Icon + Cursive Script Brand Logo) */}
            <div className="d-flex align-items-center gap-2">
              <button
                className="profile-nav-btn"
                onClick={() => setIsProfileOpen(true)}
                aria-label="Open Profile Overview"
                title="View Profile Overview"
              >
                <img src={heroImg} alt="Profile" className="profile-nav-avatar" />
              </button>

              <a className="navbar-brand brand-text m-0" href="#home">
                <span className="brand-a">𝓐</span>
                <span className="text-custom-heading">𝓶𝓲𝓽.</span>
              </a>
            </div>

            {/* PART 2: CENTER (Floating Inner Glass Dock for Navigation Links) */}
            <div className="d-none d-lg-block">
              <ul className="nav flex-row align-items-center gap-1 glass-nav-dock mb-0 list-unstyled">
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'home' ? 'active' : ''}`}
                    href="#home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'about' ? 'active' : ''}`}
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'skills' ? 'active' : ''}`}
                    href="#skills"
                  >
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'projects' ? 'active' : ''}`}
                    href="#projects"
                  >
                    Projects
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'contact' ? 'active' : ''}`}
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* PART 3: RIGHT SIDE (Uiverse SVG Theme Toggle Button) */}
            <div className="d-flex align-items-center gap-2">
              <label className="themeToggle st-sunMoonThemeToggleBtn" htmlFor="themeToggleBtn">
                <input
                  type="checkbox"
                  id="themeToggleBtn"
                  className="themeToggleInput"
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                />
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" stroke="none">
                  <mask id="moon-mask-nav">
                    <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                    <circle cx="11" cy="3" r="8" fill="black"></circle>
                  </mask>
                  <circle className="sunMoon" cx="10" cy="10" r="8" mask="url(#moon-mask-nav)"></circle>
                  <g>
                    <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
                    <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
                    <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
                    <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
                    <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
                    <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
                  </g>
                </svg>
              </label>

              {/* Mobile Toggler */}
              <button
                className="navbar-toggler border-0 shadow-none p-1 d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileNavCollapse"
                aria-controls="mobileNavCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="bi bi-list fs-2 text-custom-heading"></i>
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Navigation Menu */}
          <div className="collapse navbar-collapse d-lg-none mt-2" id="mobileNavCollapse">
            <div className="glass-nav-dock p-3 text-center">
              <ul className="navbar-nav flex-column gap-2">
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'home' ? 'active' : ''}`}
                    href="#home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'about' ? 'active' : ''}`}
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'skills' ? 'active' : ''}`}
                    href="#skills"
                  >
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'projects' ? 'active' : ''}`}
                    href="#projects"
                  >
                    Projects
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link nav-link-custom ${activeSection === 'contact' ? 'active' : ''}`}
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Page Overview Modal */}
      <div
        className={`profile-modal-backdrop ${isProfileOpen ? 'active' : ''}`}
        onClick={() => setIsProfileOpen(false)}
      >
        <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
          <button
            className="profile-modal-close-btn"
            onClick={() => setIsProfileOpen(false)}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>

          <div className="text-center mb-4">
            <img
              src={heroImg}
              alt="Amit Chavda"
              className="rounded-circle border border-3 border-cyan shadow-lg mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h3 className="fs-4 fw-bold text-custom-heading mb-1 font-heading">Amit Chavda</h3>
            <p className="text-cyan small fw-semibold mb-2">Full Stack Web Developer (MERN Stack - Next.js)</p>
            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-1 small">
              <i className="bi bi-geo-alt-fill me-1"></i> Ahmedabad, Gujarat
            </span>
          </div>

          <div className="custom-card p-3 mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <i className="bi bi-briefcase-fill text-cyan fs-4"></i>
              <div>
                <h5 className="fs-6 fw-bold text-custom-heading mb-0">Kalpit Evolution</h5>
                <p className="text-custom-muted small mb-0">Website Developer (1 Year Experience)</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-mortarboard-fill text-cyan fs-4"></i>
              <div>
                <h5 className="fs-6 fw-bold text-custom-heading mb-0">Monark University</h5>
                <p className="text-custom-muted small mb-0">MCA (Master of Computer Application)</p>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <a
              href="https://wa.me/919998320342"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cyan rounded-pill flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-whatsapp"></i> Chat on WhatsApp
            </a>
            <a
              href="#contact"
              onClick={() => setIsProfileOpen(false)}
              className="btn btn-outline-cyan rounded-pill flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-envelope-fill"></i> Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
