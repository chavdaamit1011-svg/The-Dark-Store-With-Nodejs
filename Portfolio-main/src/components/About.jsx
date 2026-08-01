import React from 'react'
import heroImg from '../assets/amit.jpeg'
import BorderGlow from './BorderGlow'

export default function About() {
  return (
    <section id="about" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="section-title">About Me</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="row align-items-center g-5">
          {/* Left Column: Profile Card Frame with Constant Animated BorderGlow */}
          <div className="col-lg-5 text-center">
            <BorderGlow
              className="profile-glow-container p-2 position-relative"
              borderRadius={20}
              edgeSensitivity={35}
              glowRadius={35}
              glowIntensity={1.2}
              constantAnimated={true}
              colors={['#00d2ff', '#a855f7', '#38bdf8']}
            >
              <div className="position-relative">
                <img
                  src={heroImg}
                  alt="Amit Chavda"
                  className="profile-img-square"
                />
                <div className="profile-experience-badge">
                  <i className="bi bi-patch-check-fill text-cyan fs-5"></i>
                  <span>MERN & Next.js Developer</span>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Right Column: Information & Cards */}
          <div className="col-lg-7">
            <h3 className="fs-2 fw-bold text-custom-heading mb-3">
              Full Stack Web Developer
            </h3>
            <p className="text-custom-muted lh-lg mb-4 fs-6">
              Seeking a challenging role in web development where I can apply my
              knowledge of front-end and back-end technologies to build responsive
              and user-friendly websites, while continuously enhancing my skills and
              contributing to organizational growth. I am passionate about crafting
              elegant solutions to complex problems and delivering exceptional user
              experiences.
            </p>

            <div className="row g-4">
              {/* Work Experience Card */}
              <div className="col-12">
                <BorderGlow
                  className="p-4"
                  borderRadius={16}
                  edgeSensitivity={35}
                  glowRadius={35}
                  glowIntensity={1.2}
                  colors={['#00d2ff', '#a855f7', '#38bdf8']}
                >
                  <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-briefcase-fill text-cyan fs-4 me-2"></i>
                      <h4 className="fs-5 fw-bold text-custom-heading mb-0">Work Experience</h4>
                    </div>
                    <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-1">
                      Current Role
                    </span>
                  </div>

                  <div>
                    <h5 className="fs-6 fw-bold text-custom-heading mb-1">
                      Website Developer (MERN Stack - Next.js)
                    </h5>
                    <p className="text-cyan small fw-semibold mb-1">
                      Kalpit Evolution <span className="text-custom-muted font-normal">• Nikol, Ahmedabad</span>
                    </p>
                    <p className="text-custom-muted small mb-2">1 May 2026 – 30 April 2027 (1 Year)</p>
                    <p className="text-custom-muted small mb-0 lh-base">
                      Working on live client web projects using React.js, Next.js, Node.js, Express, and MongoDB to deliver high-performance responsive web applications.
                    </p>
                  </div>
                </BorderGlow>
              </div>

              {/* Education Card */}
              <div className="col-md-6">
                <BorderGlow
                  className="p-4 h-100"
                  borderRadius={16}
                  edgeSensitivity={35}
                  glowRadius={35}
                  glowIntensity={1.2}
                  colors={['#00d2ff', '#a855f7', '#38bdf8']}
                >
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-ui-checks text-cyan fs-4 me-2"></i>
                    <h4 className="fs-5 fw-bold text-custom-heading mb-0">Education</h4>
                  </div>

                  <div className="mb-3 border-bottom border-secondary border-opacity-25 pb-3">
                    <h5 className="fs-6 fw-semibold text-custom-heading mb-1">
                      Master of Computer Application
                    </h5>
                    <p className="text-custom-muted small mb-1">Monark University</p>
                    <span className="text-cyan small fw-medium">2025 - 2027 (Pursuing)</span>
                  </div>

                  <div>
                    <h5 className="fs-6 fw-semibold text-custom-heading mb-1">
                      Bachelor of Commerce
                    </h5>
                    <p className="text-custom-muted small mb-1">Monark University</p>
                    <span className="text-custom-muted small">2021 - 2024 (First Class)</span>
                  </div>
                </BorderGlow>
              </div>

              {/* Certification Card */}
              <div className="col-md-6">
                <BorderGlow
                  className="p-4 h-100"
                  borderRadius={16}
                  edgeSensitivity={35}
                  glowRadius={35}
                  glowIntensity={1.2}
                  colors={['#00d2ff', '#a855f7', '#38bdf8']}
                >
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-patch-check-fill text-cyan fs-4 me-2"></i>
                    <h4 className="fs-5 fw-bold text-custom-heading mb-0">Certification</h4>
                  </div>

                  <div className="custom-card p-3">
                    <h5 className="fs-6 fw-semibold text-custom-heading mb-1">
                      Full Stack Web Development
                    </h5>
                    <p className="text-custom-muted small mb-3">Red & White Multimedia Education</p>
                    <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill px-3 py-2">
                      Attending
                    </span>
                  </div>
                </BorderGlow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
