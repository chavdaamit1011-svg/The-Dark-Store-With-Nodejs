import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

// To add your project images, import them here like this:
// import project1Img from '../assets/project1.png';
// import project2Img from '../assets/project2.png';
// import project3Img from '../assets/project3.png';

const projectsData = [
  {
    title: 'E-Commerce (Sugar Cosmetics)',
    description: 'Built a responsive e-commerce UI with product listing. Added Add to Cart, Login/Signup, Wishlist, and Purchase flow functionality.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cosmetic-123.netlify.app/',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    image: 'https://www.sugarcosmetics.com/cdn/shop/files/SugarCosmetics-Logo_SC-Logo-H-Transparent_56fde146-25cb-454c-969e-a03e840cce6a.png?v=1751454357&width=661'
  },
  {
    title: 'E-Commerce (Kisah Ethinic Wear)',
    description: 'Created an E-commerce website with reusable components, robust state management, and seamless API integration.',
    tech: ['React.js', 'State Management', 'API Integration'],
    link: 'https://kisah-ecommerce-react-js.vercel.app/',
    gradient: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    image: 'https://kisah.in/cdn/shop/files/Group_63_1.png?v=1715841265&width=300'
  },
  {
    title: 'E-Commerce (The Dark Store)',
    description: 'Developed backend architecture featuring secure login, product catalog management, and a scalable database structure.',
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    link: '#',
    gradient: 'linear-gradient(to right, #434343 0%, black 100%)'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="position-relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My Projects</h2>
        </motion.div>

        <Row className="gy-4 mt-3">
          {projectsData.map((project, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div
                className="glass-card project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                  <div 
                  className="project-img-container d-flex justify-content-center align-items-center"
                  style={{ background: project.gradient }}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-100 h-100" style={{ objectFit: 'contain', padding: '1.5rem', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
                  ) : (
                    <h3 className="text-white fw-bold text-center px-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                      {project.title.split('(')[1]?.replace(')', '') || 'Project'}
                    </h3>
                  )}
                  
                  <div className="project-overlay">
                    {project.link !== '#' ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="btn-custom-solid text-decoration-none">
                        View Live <i className="bi bi-box-arrow-up-right ms-2"></i>
                      </a>
                    ) : (
                      <span className="btn-custom-solid text-decoration-none bg-secondary">
                        Code Repository
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="h5 text-white mb-3">{project.title}</h4>
                <p className="text-secondary flex-grow-1" style={{ fontSize: '0.9rem' }}>
                  {project.description}
                </p>
                
                <div className="d-flex flex-wrap gap-2 mt-auto pt-3">
                  {project.tech.map((tech, tIdx) => (
                    <span key={tIdx} className="badge bg-dark border border-secondary text-light px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
