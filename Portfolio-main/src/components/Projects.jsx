import React from 'react'

const projects = [
  {
    id: 'kingqueen',
    title: 'KingQueen (E-Commerce)',
    bannerBg: 'linear-gradient(135deg, #fef08a 0%, #eab308 100%)',
    bannerContent: (
      <div className="d-flex align-items-center justify-content-center gap-2 font-black fs-4 text-black fw-bold">
        <i className="bi bi-person-fill-gear fs-3 text-dark"></i>
        <span className="tracking-widest fw-extrabold text-dark">KING & QUEEN</span>
      </div>
    ),
    description: 'E-Commerce fashion & lifestyle brand web platform featuring product listings, smooth cart interactions, and modern responsive layout.',
    tags: ['React.js', 'E-Commerce', 'Tailwind CSS'],
    link: 'http://kingqueen.in/',
    isExternal: true,
  },
  {
    id: 'destiny',
    title: 'Destiny Service Agency',
    bannerBg: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
    bannerContent: (
      <div className="d-flex align-items-center justify-content-center gap-2 font-black fs-4 text-white fw-bold">
        <i className="bi bi-globe2 fs-3 text-white"></i>
        <span className="tracking-widest fw-extrabold text-white">DESTINY SERVICE</span>
      </div>
    ),
    description: 'International business service agency website built with modern frontend architecture, service showcases, and responsive lead forms.',
    tags: ['Next.js', 'React', 'Responsive Design'],
    link: 'https://destinyservice.nl/',
    isExternal: true,
  },
  {
    id: 'sugar',
    title: 'Sugar Cosmetics UI',
    bannerBg: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)',
    bannerContent: (
      <div className="d-flex align-items-center justify-content-center gap-2 font-black fs-4 text-black fw-bold">
        <div className="rounded-circle bg-black text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px', fontSize: '1.2rem' }}>
          S
        </div>
        <span className="tracking-widest fw-extrabold">SUGAR</span>
      </div>
    ),
    description: 'Built a responsive e-commerce UI with product listing. Added Add to Cart, Login/Signup, Wishlist, and Purchase flow functionality.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cosmetic-123.netlify.app/',
    isExternal: true,
  },
  {
    id: 'kisah',
    title: 'Kisah Ethnic Wear',
    bannerBg: 'linear-gradient(135deg, #a7f3d0 0%, #38bdf8 100%)',
    bannerContent: (
      <div className="d-flex align-items-center justify-content-center gap-2 font-black fs-4 text-black fw-bold">
        <div className="rounded-circle bg-warning text-dark border border-2 border-dark d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px', fontSize: '1.2rem' }}>
          K
        </div>
        <span className="tracking-widest fw-bold text-dark">KISAH</span>
      </div>
    ),
    description: 'Created an E-commerce website with reusable components, robust state management, and seamless API integration.',
    tags: ['React.js', 'State Management', 'API Integration'],
    link: 'https://kisah-ecommerce-react-js.vercel.app/',
    isExternal: true,
  },
  {
    id: 'darkstore',
    title: 'The Dark Store Backend',
    bannerBg: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    bannerContent: (
      <div className="fs-4 text-white fw-extrabold tracking-wide">
        The Dark Store
      </div>
    ),
    description: 'Developed backend architecture featuring secure login, product catalog management, and a scalable database structure.',
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
              <div className="custom-card h-100 p-3 d-flex flex-column justify-content-between">
                <div>
                  {/* Card Banner Image / Mockup Container */}
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center mb-4 p-4 shadow-sm"
                    style={{ background: proj.bannerBg, height: '150px' }}
                  >
                    {proj.bannerContent}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
