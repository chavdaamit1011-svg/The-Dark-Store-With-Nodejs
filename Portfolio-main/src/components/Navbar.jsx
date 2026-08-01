import React, { useState, useEffect } from 'react'
import heroImg from '../assets/amit.jpeg'

export default function Navbar({ theme, toggleTheme }) {
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
      <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${scrolled ? 'py-2 shadow-lg' : 'py-3'}`}>
        <div className="container px-3 px-lg-4">
          {/* Left Side: Profile Avatar Icon + Cursive Script Brand Logo */}
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

          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* Mobile Uiverse SVG Theme Toggle */}
            <div className="d-lg-none">
              <label className="themeToggle st-sunMoonThemeToggleBtn" htmlFor="themeToggleMobile">
                <input
                  type="checkbox"
                  id="themeToggleMobile"
                  className="themeToggleInput"
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                />
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" stroke="none">
                  <mask id="moon-mask-mobile">
                    <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                    <circle cx="11" cy="3" r="8" fill="black"></circle>
                  </mask>
                  <circle className="sunMoon" cx="10" cy="10" r="8" mask="url(#moon-mask-mobile)"></circle>
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
            </div>

            <button
              className="navbar-toggler border-0 shadow-none p-1"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list fs-1 text-custom-heading"></i>
            </button>
          </div>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-1 gap-lg-3 mt-3 mt-lg-0">
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

              {/* Desktop Uiverse SVG Theme Toggle */}
              <li className="nav-item ms-lg-2 d-none d-lg-block">
                <label className="themeToggle st-sunMoonThemeToggleBtn" htmlFor="themeToggleDesktop">
                  <input
                    type="checkbox"
                    id="themeToggleDesktop"
                    className="themeToggleInput"
                    checked={theme === 'light'}
                    onChange={toggleTheme}
                  />
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" stroke="none">
                    <mask id="moon-mask-desktop">
                      <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                      <circle cx="11" cy="3" r="8" fill="black"></circle>
                    </mask>
                    <circle className="sunMoon" cx="10" cy="10" r="8" mask="url(#moon-mask-desktop)"></circle>
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
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
