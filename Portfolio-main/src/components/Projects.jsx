import React from 'react'
import BorderGlow from './BorderGlow'

const projects = [
  {
    id: 'kingqueen',
    title: 'KingQueen (E-Commerce)',
    domain: 'kingqueen.in',
    imgUrl: 'https://s.wordpress.com/mshots/v1/http%3A%2F%2Fkingqueen.in%2F?w=800',
    description: 'E-Commerce fashion & lifestyle brand web platform featuring product listings, smooth cart interactions, and modern responsive layout.',
    tags: ['React.js', 'E-Commerce', 'Tailwind CSS'],
    link: 'http://kingqueen.in/',
    isExternal: true,
  },
  {
    id: 'destiny',
    title: 'Destiny Service Agency',
    domain: 'destinyservice.nl',
    imgUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdestinyservice.nl%2F?w=800',
    description: 'International business service agency website built with modern frontend architecture, service showcases, and responsive lead forms.',
    tags: ['Next.js', 'React', 'Responsive Design'],
    link: 'https://destinyservice.nl/',
    isExternal: true,
  },
  {
    id: 'sugar',
    title: 'Sugar Cosmetics UI',
    domain: 'cosmetic-123.netlify.app',
    imgUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcosmetic-123.netlify.app%2F?w=800',
    description: 'Built a responsive e-commerce UI with product listing. Added Add to Cart, Login/Signup, Wishlist, and Purchase flow functionality.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cosmetic-123.netlify.app/',
    isExternal: true,
  },
  {
    id: 'kisah',
    title: 'Kisah Ethnic Wear',
    domain: 'kisah-ecommerce.vercel.app',
    imgUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fkisah-ecommerce-react-js.vercel.app%2F?w=800',
    description: 'Created an E-commerce website with reusable components, robust state management, and seamless API integration.',
    tags: ['React.js', 'State Management', 'API Integration'],
    link: 'https://kisah-ecommerce-react-js.vercel.app/',
    isExternal: true,
  },
  {
    id: 'darkstore',
    title: 'The Dark Store Backend',
    domain: 'api.thedarkstore.internal',
    isBackend: true,
    description: 'Developed backend architecture featuring secure login, product catalog management, and a scalable MongoDB database structure.',
    tags: ['Node.js', 'Express.js', 'MongoDB'],
    link: '#contact',
    isExternal: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="section-title">My Projects</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="row g-4">
          {projects.map((proj) => (
            <div key={proj.id} className="col-md-6 col-lg-4">
              <BorderGlow
                className="h-100 p-3"
                borderRadius={16}
                edgeSensitivity={35}
                glowRadius={35}
                glowIntensity={1.2}
                colors={['#00d2ff', '#a855f7', '#38bdf8']}
              >
                <div className="d-flex flex-column justify-content-between h-100">
                  <div>
                    {/* Browser Mockup Banner */}
                    <div className="project-banner-container mb-4">
                      <div className="browser-header-bar">
                        <span className="browser-dot red"></span>
                        <span className="browser-dot yellow"></span>
                        <span className="browser-dot green"></span>
                        <span className="browser-url-pill">{proj.domain}</span>
                      </div>

                      <div className="project-img-wrapper">
                        {proj.isBackend ? (
                          <div className="terminal-preview-box">
                            <div className="terminal-line">
                              <span className="keyword">const</span> express = <span className="string">require('express')</span>;
                            </div>
                            <div className="terminal-line">
                              <span className="keyword">const</span> app = express();
                            </div>
                            <div className="terminal-line">
                              <span className="comment">// MongoDB Auth & API</span>
                            </div>
                            <div className="terminal-line">
                              app.use(<span className="string">'/api/products'</span>, router);
                            </div>
                            <div className="terminal-line">
                              <span className="keyword">app.listen</span>(5000, () =&gt; <span className="string">'Server live'</span>);
                            </div>
                          </div>
                        ) : (
                          <img
                            src={proj.imgUrl}
                            alt={proj.title}
                            className="project-img-preview"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <h3 className="fs-5 fw-bold text-custom-heading mb-2">{proj.title}</h3>
                    <p className="text-custom-muted small lh-base mb-4">{proj.description}</p>
                  </div>

                  <div>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {proj.tags.map((t) => (
                        <span key={t} className="badge-custom py-1 px-3" style={{ fontSize: '0.75rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {proj.isExternal ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                      >
                        View Live Project <i className="bi bi-arrow-up-right fs-6"></i>
                      </a>
                    ) : (
                      <a
                        href={proj.link}
                        className="text-cyan small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                      >
                        Backend Architecture Details <i className="bi bi-arrow-right fs-6"></i>
                      </a>
                    )}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
