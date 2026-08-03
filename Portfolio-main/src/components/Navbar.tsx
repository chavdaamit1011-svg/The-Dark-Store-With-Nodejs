import React from 'react'
import { NavLink } from 'react-router-dom'
import logo1 from '../assets/logo1.png'

interface NavbarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <header className="fixed-top w-100 z-50 py-3">
      <div className="container px-3 px-lg-4">
        <div className="d-flex align-items-center justify-content-between py-1">
          
          {/* PART 1: LEFT SIDE (Brand Logo Image - logo1.png) */}
          <NavLink
            className="navbar-brand p-0 m-0 d-flex align-items-center position-relative"
            to="/"
            title="Amit Chavda Portfolio"
            style={{ height: '42px', minWidth: '160px', overflow: 'visible' }}
          >
            <img
              src={logo1}
              alt="Logo"
              className="brand-logo-img"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                transform: 'scale(2.2)',
                transformOrigin: 'left center',
                transition: 'transform 0.3s ease',
              }}
            />
          </NavLink>

          {/* PART 2: CENTER (Floating Inner Glass Dock for Multi-Page Navigation Links) */}
          <div className="d-none d-lg-block">
            <ul className="nav flex-row align-items-center gap-1 glass-nav-dock mb-0 list-unstyled">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/services"
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/projects"
                >
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/contact"
                >
                  Contact
                </NavLink>
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
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/services"
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/projects"
                >
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
