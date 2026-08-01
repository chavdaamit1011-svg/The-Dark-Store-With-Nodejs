import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import heroImg from '../assets/amit.jpeg'; 

const About = () => {
  return (
    <section id="about" className="position-relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <Row className="gy-5 align-items-center mt-3">
          {/* Image Column */}
          <Col lg={5} className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="position-relative d-inline-block"
            >
              <div 
                className="position-absolute w-100 h-100 rounded-circle" 
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                  filter: 'blur(30px)',
                  opacity: 0.4,
                  transform: 'scale(1.05)',
                  zIndex: 0
                }}
              ></div>
              <img 
                src={heroImg} 
                alt="Amit Chavda" 
                className="img-fluid rounded-circle position-relative"
                style={{ 
                  width: '100%',
                  maxWidth: '320px', 
                  aspectRatio: '1/1', 
                  objectFit: 'cover', 
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  zIndex: 1,
                  background: 'var(--bg-secondary)'
                }} 
              />
            </motion.div>
          </Col>

          {/* Text and Details Column */}
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="h3 mb-3 text-white">Full Stack Web Developer</h3>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                Seeking a challenging role in web development where I can apply my knowledge of front-end and back-end
                technologies to build responsive and user-friendly websites, while continuously enhancing my skills and contributing to
                organizational growth. I am passionate about crafting elegant solutions to complex problems and delivering exceptional user experiences.
              </p>

              <Row className="gy-4 mt-2">
                <Col md={6}>
                  <div className="glass-card p-3 h-100" style={{ padding: '1.5rem !important' }}>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-journal-check text-accent fs-4 me-2" style={{ color: 'var(--accent-color)' }}></i>
                      <h4 className="h5 text-white mb-0">Education</h4>
                    </div>
                    <ul className="list-unstyled mb-0 text-secondary">
                      <li className="mb-4">
                        <strong className="d-block text-white">Master of Computer Application</strong>
                        <span className="d-flex align-items-center mt-1 text-secondary">Monark University</span>
                        <small className="text-accent mt-1 d-block" style={{ color: 'var(--accent-color)' }}>2025 - 2027 (Pursuing)</small>
                      </li>
                      <li>
                        <strong className="d-block text-white">Bachelor of Commerce</strong>
                        <span className="d-flex align-items-center mt-1 text-secondary">Monark University</span>
                        <small className="mt-1 d-block">2021 - 2024 (First Class)</small>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="glass-card p-3 h-100" style={{ padding: '1.5rem !important' }}>
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-patch-check-fill text-accent fs-4 me-2" style={{ color: 'var(--accent-color)' }}></i>
                      <h4 className="h5 text-white mb-0">Certification</h4>
                    </div>
                    <div className="bg-dark rounded p-3" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                      <strong className="d-block text-white mb-1">Full Stack Web Development</strong>
                      <span className="text-secondary small d-block">Red & White Multimedia Education</span>
                      <span className="badge bg-success bg-opacity-25 text-success mt-2">Attending</span>
                    </div>
                  </div>
                </Col>
              </Row>
              
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
