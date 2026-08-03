import React, { useState } from 'react'
import heroImg from '../assets/amit.jpeg'
import featureEngCertImg from '../assets/Chavda Amit - Feature Engineering.png'
import featureEngPdf from '../assets/certificate-u3jvgchsurj5-1785312229.pdf'
import BorderGlow from './BorderGlow'

export default function About() {
  const [selectedCert, setSelectedCert] = useState<any>(null)

  const row1Skills = [
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  ]

  const row2Skills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'REST APIs', icon: 'https://api.iconify.design/tdesign:api.svg' },
    { name: 'Postman', icon: 'https://api.iconify.design/devicon:postman.svg' },
  ]

  const aiSkills = [
    {
      name: 'Antigravity AI',
      provider: 'Google DeepMind',
      type: 'antigravity',
      appBg: '#0f111a',
      appBorder: 'rgba(0, 210, 255, 0.3)',
    },
    {
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      type: 'claude',
      appBg: '#fbf9f5',
      appBorder: '#e2dad0',
    },
    {
      name: 'ChatGPT / OpenAI Codex',
      provider: 'OpenAI',
      type: 'openai',
      appBg: '#ffffff',
      appBorder: '#e5e7eb',
    },
    {
      name: 'Microsoft Copilot',
      provider: 'Microsoft',
      type: 'copilot',
      appBg: '#1e1f29',
      appBorder: 'rgba(236, 72, 153, 0.3)',
    },
  ]

  // Certificate Document Previews
  const claudeCertSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 800 550" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="550" rx="12" fill="%2374835c"/><rect x="140" y="40" width="520" height="60" rx="30" fill="none" stroke="%231c2518" stroke-width="4"/><circle cx="175" cy="70" r="18" fill="none" stroke="%231c2518" stroke-width="3"/><path d="M 167 70 L 173 76 L 183 64" fill="none" stroke="%231c2518" stroke-width="3" stroke-linecap="round"/><text x="210" y="76" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231c2518" letter-spacing="3">CERTIFICATE of COMPLETION</text><text x="400" y="210" font-family="serif" font-size="44" font-weight="bold" fill="%231c2518" text-anchor="middle">Chavda Amit</text><text x="400" y="260" font-family="sans-serif" font-size="20" fill="%231c2518" text-anchor="middle">has completed</text><text x="400" y="340" font-family="sans-serif" font-size="44" font-weight="900" fill="%231c2518" text-anchor="middle">Claude Code in Action</text><text x="400" y="480" font-family="sans-serif" font-size="24" font-weight="900" fill="%231c2518" text-anchor="middle" letter-spacing="4">ANTHROP%5CC</text></svg>`

  const redWhiteCertSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 800 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="520" rx="12" fill="%23ffffff"/><rect x="20" y="20" width="760" height="480" rx="8" fill="none" stroke="%23ef4444" stroke-width="3" stroke-dasharray="8 6"/><text x="400" y="100" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23ef4444" text-anchor="middle">RED %26 WHITE</text><text x="400" y="130" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2364748b" text-anchor="middle" letter-spacing="3">MULTIMEDIA EDUCATION</text><text x="400" y="230" font-family="serif" font-size="44" font-weight="bold" fill="%230f172a" text-anchor="middle">Chavda Amit</text><text x="400" y="270" font-family="sans-serif" font-size="18" fill="%230284c7" text-anchor="middle">Full Stack Web Development (MERN Stack)</text><rect x="220" y="320" width="360" height="46" rx="23" fill="rgba(34, 197, 94, 0.15)" stroke="%2322c55e" stroke-width="2"/><text x="400" y="350" font-family="sans-serif" font-size="15" font-weight="bold" fill="%2316a34a" text-anchor="middle">Course Completed • Certificate Pending</text><text x="400" y="430" font-family="sans-serif" font-size="13" fill="%2364748b" text-anchor="middle">May 2025 – April 2026</text></svg>`

  const certificates = [
    {
      id: 'claude',
      title: 'Claude Code in Action',
      institute: 'Anthropic',
      year: '2026',
      imgSrc: claudeCertSvg,
      pdfSrc: null,
      tags: ['Claude Code', 'AI Development', 'Anthropic'],
      status: 'Verified Certificate',
      statusBadgeClass: 'badge-cert-status badge-cert-verified',
    },
    {
      id: 'kaggle',
      title: 'Feature Engineering',
      institute: 'Kaggle (Google)',
      year: '2026',
      imgSrc: featureEngCertImg,
      pdfSrc: featureEngPdf,
      tags: ['Kaggle', 'Feature Engineering', 'Machine Learning'],
      status: 'Verified Certificate',
      statusBadgeClass: 'badge-cert-status badge-cert-verified',
    },
    {
      id: 'redwhite',
      title: 'Full Stack Web Development',
      institute: 'Red & White Multimedia Education',
      year: '2025-2026',
      imgSrc: redWhiteCertSvg,
      pdfSrc: null,
      tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
      status: 'Completed (Issuance Pending)',
      statusBadgeClass: 'badge-cert-status badge-cert-completed',
    },
  ]

  const renderAIIcon = (type: string) => {
    if (type === 'antigravity') {
      return (
        <img
          src="https://antigravity.google/assets/image/brand/antigravity-icon__full-color.png"
          alt="Antigravity AI"
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )
    } else if (type === 'claude') {
      return (
        <svg viewBox="0 0 200 200" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 40 20 H 160 V 45 H 175 V 70 H 160 V 160 H 145 V 110 H 125 V 160 H 105 V 110 H 95 V 160 H 75 V 110 H 55 V 160 H 40 V 70 H 25 V 45 H 40 Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinejoin="round"
          />
          <path
            d="M 40 20 H 160 V 45 H 175 V 70 H 160 V 160 H 145 V 110 H 125 V 160 H 105 V 110 H 95 V 160 H 75 V 110 H 55 V 160 H 40 V 70 H 25 V 45 H 40 Z"
            fill="#c97354"
          />
          <path d="M 62 52 L 78 62 L 62 72" stroke="#000000" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 138 52 L 122 62 L 138 72" stroke="#000000" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    } else if (type === 'openai') {
      return (
        <img
          src="https://api.iconify.design/simple-icons:openai.svg?color=%23111827"
          alt="ChatGPT Codex"
          style={{ width: '28px', height: '28px' }}
        />
      )
    } else {
      return (
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/copilot-icon.png"
          alt="Microsoft Copilot"
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.src = 'https://api.iconify.design/logos:microsoft-copilot.svg'
          }}
        />
      )
    }
  }

  return (
    <section id="about" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="section-title">About Me</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="row align-items-center g-5 mb-5">
          {/* Left Column: Profile Card Frame with BorderGlow */}
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

          {/* Right Column: Bio & Overview */}
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

            {/* Quick Stats Grid */}
            <div className="row g-3">
              <div className="col-6 col-sm-4">
                <div className="custom-card p-3 text-center">
                  <h4 className="fs-3 fw-bold text-cyan mb-1">3+ Months</h4>
                  <p className="text-custom-muted small mb-0">Experience</p>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="custom-card p-3 text-center">
                  <h4 className="fs-3 fw-bold text-cyan mb-1">5+ Live</h4>
                  <p className="text-custom-muted small mb-0">Projects</p>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="custom-card p-3 text-center">
                  <h4 className="fs-3 fw-bold text-cyan mb-1">MCA</h4>
                  <p className="text-custom-muted small mb-0">Monark Univ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Career / Work Experience */}
        <div className="mb-5 py-3">
          <div className="text-center mb-4">
            <h3 className="section-title fs-3">
              <i className="bi bi-briefcase-fill me-2 text-cyan"></i> Career & Experience
            </h3>
            <div className="section-title-underline"></div>
          </div>

          <BorderGlow
            className="p-4 p-md-5"
            borderRadius={20}
            edgeSensitivity={35}
            glowRadius={40}
            glowIntensity={1.2}
            colors={['#00d2ff', '#a855f7', '#38bdf8']}
          >
            <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap gap-2">
              <div className="d-flex align-items-center gap-3">
                {/* Official Kalpit Evolution Company Logo Badge */}
                <a
                  href="https://www.linkedin.com/company/kalpitevolution/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 d-flex align-items-center justify-content-center text-decoration-none rounded-4 bg-white p-2 shadow-sm"
                  style={{
                    width: '62px',
                    height: '62px',
                    border: '1.5px solid var(--cyan-primary)',
                    boxShadow: '0 8px 20px var(--cyan-glow)',
                  }}
                  title="View Kalpit Evolution on LinkedIn"
                >
                  <img
                    src="/Kalpitevolution.jpeg"
                    alt="Kalpit Evolution Logo"
                    className="rounded-3"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </a>

                <div>
                  <h4 className="fs-4 fw-bold text-custom-heading mb-1 font-heading">
                    Website Developer (MERN Stack - Next.js)
                  </h4>
                  <p className="text-cyan small fw-semibold mb-0">
                    <a
                      href="https://www.linkedin.com/company/kalpitevolution/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan text-decoration-none me-1"
                    >
                      <i className="bi bi-linkedin text-primary me-1"></i>Kalpit Evolution <i className="bi bi-box-arrow-up-right x-small"></i>
                    </a>
                    <span className="text-custom-muted font-normal">• Nikol, Ahmedabad</span>
                  </p>
                </div>
              </div>

              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill px-3 py-2 fw-semibold">
                <i className="bi bi-record-fill text-success me-1"></i> Currently Working (Present)
              </span>
            </div>

            <p className="text-cyan small fw-medium mb-3">
              <i className="bi bi-calendar-event me-1"></i> 1 May 2026 – Present (3+ Months)
            </p>

            <p className="text-custom-muted fs-6 mb-0 lh-lg">
              Working on live client web projects using React.js, Next.js, Node.js, Express, and MongoDB to deliver high-performance responsive web applications.
            </p>
          </BorderGlow>
        </div>

        {/* SECTION 3: Education Stacked (MCA Top, Red & White Middle, B.Com Bottom) */}
        <div className="mb-5 py-3">
          <div className="text-center mb-4">
            <h3 className="section-title fs-3">
              <i className="bi bi-mortarboard-fill me-2 text-cyan"></i> Education
            </h3>
            <div className="section-title-underline"></div>
          </div>

          <div className="d-flex flex-column gap-4 max-w-4xl mx-auto">
            {/* Top Card: MCA */}
            <BorderGlow className="p-4 p-md-4" borderRadius={18} edgeSensitivity={35}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                <div>
                  <h5 className="fs-5 fw-bold text-custom-heading mb-1 font-heading">
                    Master of Computer Application (MCA)
                  </h5>
                  <p className="text-cyan small fw-medium mb-0">Monark University</p>
                </div>
                <span className="badge bg-info bg-opacity-25 text-info border border-info border-opacity-25 rounded-pill px-3 py-2 small">
                  2025 – 2027 (Pursuing)
                </span>
              </div>
              <p className="text-custom-muted fs-6 mb-0 lh-lg">
                Specializing in Advanced Software Engineering, Cloud Computing, Database Architectures, and Full Stack Web Application Development.
              </p>
            </BorderGlow>

            {/* Middle Card: Red & White Multimedia Education */}
            <BorderGlow className="p-4 p-md-4" borderRadius={18} edgeSensitivity={35}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                <div>
                  <h5 className="fs-5 fw-bold text-custom-heading mb-1 font-heading">
                    Full Stack Web Development (MERN Stack)
                  </h5>
                  <p className="text-cyan small fw-medium mb-0">Red & White Multimedia Education</p>
                </div>
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill px-3 py-2 small">
                  2025 – 2026 (Completed)
                </span>
              </div>
              <p className="text-custom-muted fs-6 mb-0 lh-lg">
                Completed intensive professional diploma training in React.js, Next.js, Node.js, Express, MongoDB, RESTful APIs, and modern full-stack web application development.
              </p>
            </BorderGlow>

            {/* Bottom Card: B.Com */}
            <BorderGlow className="p-4 p-md-4" borderRadius={18} edgeSensitivity={35}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                <div>
                  <h5 className="fs-5 fw-bold text-custom-heading mb-1 font-heading">
                    Bachelor of Commerce (B.Com)
                  </h5>
                  <p className="text-cyan small fw-medium mb-0">Monark University</p>
                </div>
                <span className="badge bg-secondary bg-opacity-25 text-custom-muted border border-secondary border-opacity-25 rounded-pill px-3 py-1 small">
                  2021 – 2024 (First Class)
                </span>
              </div>
              <p className="text-custom-muted fs-6 mb-0 lh-lg">
                Graduated with First Class honors, acquiring strong analytical, business management, and problem-solving skills.
              </p>
            </BorderGlow>
          </div>
        </div>

        {/* SECTION 4: Skills Section with exact </> Skills and 🤖 AI Skills Headers */}
        <div className="mb-5 py-3">
          {/* Header 1: </> Skills */}
          <div className="text-center mb-4">
            <h3 className="section-title fs-2 fw-bold text-custom-heading d-flex align-items-center justify-content-center gap-2">
              <span className="text-cyan font-monospace">&lt;/&gt;</span> Skills
            </h3>
            <p className="text-custom-muted small mt-1 mb-0">My coding skills</p>
            <div className="section-title-underline mt-2"></div>
          </div>

          {/* Web Dev Infinite Scrolling Marquee */}
          <div className="mb-5">
            {/* Row 1: Marquee Left */}
            <div className="marquee-container mb-3">
              <div className="marquee-track">
                {[...row1Skills, ...row1Skills].map((skill, idx) => (
                  <div key={idx} className="skill-pill">
                    <img src={skill.icon} alt={skill.name} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Marquee Right */}
            <div className="marquee-container">
              <div className="marquee-track reverse">
                {[...row2Skills, ...row2Skills].map((skill, idx) => (
                  <div key={idx} className="skill-pill">
                    <img src={skill.icon} alt={skill.name} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Header 2: 🤖 AI Skills */}
          <div className="text-center mb-4 mt-5 pt-3">
            <h3 className="section-title fs-2 fw-bold text-custom-heading d-flex align-items-center justify-content-center gap-2">
              <span>🤖</span> AI Skills
            </h3>
            <p className="text-custom-muted small mt-1 mb-0">AI tools I use in daily software engineering</p>
            <div className="section-title-underline mt-2"></div>
          </div>

          {/* AI Skills Cards */}
          <div className="row g-4 max-w-4xl mx-auto">
            {aiSkills.map((ai, idx) => (
              <div key={idx} className="col-md-6">
                <BorderGlow className="p-3" borderRadius={18} edgeSensitivity={30}>
                  <div className="d-flex align-items-center gap-3">
                    {/* App Icon Squircle Box */}
                    <div
                      className="d-flex align-items-center justify-content-center rounded-4 flex-shrink-0 shadow-sm"
                      style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: ai.appBg,
                        border: `1px solid ${ai.appBorder}`,
                      }}
                    >
                      {renderAIIcon(ai.type)}
                    </div>

                    {/* App Info */}
                    <div>
                      <h5 className="fs-6 fw-bold text-custom-heading mb-1 font-heading">
                        {ai.name}
                      </h5>
                      <p className="text-custom-muted small mb-0 fw-medium">
                        {ai.provider}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Certificate Cards with Clean Theme Backgrounds */}
        <div className="py-3">
          <div className="text-center mb-4">
            <h3 className="section-title fs-2 fw-bold text-custom-heading d-flex align-items-center justify-content-center gap-2">
              <span>🎖️</span> Certificate
            </h3>
            <p className="text-custom-muted small mt-1 mb-0">My professional certifications and achievements</p>
            <div className="section-title-underline mt-2"></div>
          </div>

          {/* 3-Column Certificate Document Cards Grid */}
          <div className="row g-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="col-md-6 col-lg-4">
                <BorderGlow
                  className="p-3 h-100 cursor-pointer text-decoration-none d-flex flex-column justify-content-between"
                  borderRadius={18}
                  edgeSensitivity={35}
                  glowRadius={35}
                  glowIntensity={1.2}
                  colors={['#00d2ff', '#a855f7', '#38bdf8']}
                  onClick={() => setSelectedCert(cert)}
                >
                  <div>
                    {/* Top Certificate Image Frame Container */}
                    <div
                      className="rounded-3 overflow-hidden mb-3 border border-secondary border-opacity-25 position-relative d-flex align-items-center justify-content-center p-2"
                      style={{ height: '210px', backgroundColor: 'var(--card-bg, #ffffff)' }}
                    >
                      <img
                        src={cert.imgSrc}
                        alt={cert.title}
                        className="w-100 h-100 object-fit-contain rounded transition-transform duration-300 shadow-sm"
                        style={{ objectFit: 'contain' }}
                      />
                      {/* High-Contrast Badge Positioned Top-Right */}
                      <div className="position-absolute top-0 end-0 me-2 mt-2">
                        <span className={cert.statusBadgeClass}>
                          <i className="bi bi-patch-check-fill"></i> {cert.status}
                        </span>
                      </div>
                    </div>

                    {/* Certificate Details Header Row */}
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                      <h4 className="fs-6 fw-bold text-custom-heading mb-0 font-heading">
                        {cert.title}
                      </h4>
                      <span className="text-custom-muted small fw-semibold flex-shrink-0">
                        {cert.year}
                      </span>
                    </div>

                    {/* Institution & Optional PDF Direct Link */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <p className="text-cyan small fw-medium mb-0">
                        {cert.institute}
                      </p>
                      {cert.pdfSrc && (
                        <a
                          href={cert.pdfSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-cyan rounded-pill btn-sm px-2.5 py-0.5 x-small fw-semibold"
                          onClick={(e) => e.stopPropagation()}
                          title="View Official PDF Certificate"
                        >
                          <i className="bi bi-file-earmark-pdf me-1"></i> PDF
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Skill Tag Pills Row */}
                  <div className="d-flex flex-wrap gap-1.5 pt-2 border-top border-secondary border-opacity-25">
                    {cert.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="badge bg-secondary bg-opacity-25 text-custom-muted border border-secondary border-opacity-25 rounded-pill px-2.5 py-1 x-small font-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Modal Lightbox Popup */}
        {selectedCert && (
          <div
            className="profile-modal-backdrop active"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="profile-modal-card max-w-2xl w-100 p-4 position-relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="profile-modal-close-btn"
                onClick={() => setSelectedCert(null)}
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <div className="text-center mb-3">
                <h3 className="fs-5 fw-bold text-custom-heading mb-1 font-heading">
                  {selectedCert.title}
                </h3>
                <p className="text-cyan small fw-semibold mb-0">
                  {selectedCert.institute} ({selectedCert.year})
                </p>
              </div>

              {/* Full Certificate Preview Image */}
              <div className="rounded-3 overflow-hidden border border-cyan border-opacity-50 mb-3 bg-white p-2 d-flex align-items-center justify-content-center">
                <img
                  src={selectedCert.imgSrc}
                  alt={selectedCert.title}
                  className="w-100 h-auto d-block rounded"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span className={selectedCert.statusBadgeClass}>
                  <i className="bi bi-patch-check-fill"></i> {selectedCert.status}
                </span>

                <div className="d-flex align-items-center gap-2">
                  {selectedCert.pdfSrc && (
                    <a
                      href={selectedCert.pdfSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-cyan rounded-pill btn-sm px-3 fw-semibold shadow-sm d-inline-flex align-items-center gap-1.5"
                    >
                      <i className="bi bi-file-earmark-pdf-fill"></i> Open Official PDF
                    </a>
                  )}
                  <button
                    className="btn btn-outline-cyan rounded-pill btn-sm px-4"
                    onClick={() => setSelectedCert(null)}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
