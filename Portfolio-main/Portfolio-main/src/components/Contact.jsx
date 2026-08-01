import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/919998320342?text=Hi Amit, my name is ${encodeURIComponent(formData.name)} (${encodeURIComponent(formData.email)}). ${encodeURIComponent(formData.message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section id="contact" className="position-relative pb-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Get In Touch</h2>
          </motion.div>

          <Row className="gy-5 mt-3 justify-content-between">
            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="h4 text-white mb-4">Contact Information</h3>
                <p className="text-secondary mb-5">
                  I am currently open for full-time opportunities and freelance projects. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="d-flex align-items-center mb-4">
                  <div className="social-icon flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '1.2rem', margin: '0 15px 0 0' }}>
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div>
                    <strong className="text-white d-block">Location</strong>
                    <span className="text-secondary">Ahmedabad, Gujarat, India</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div className="social-icon flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '1.2rem', margin: '0 15px 0 0' }}>
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div>
                    <strong className="text-white d-block">Email</strong>
                    <a href="mailto:chavdaamit1011@gmail.com" className="text-secondary text-decoration-none hover-accent">
                      chavdaamit1011@gmail.com
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="social-icon flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '1.2rem', margin: '0 15px 0 0' }}>
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div>
                    <strong className="text-white d-block">Phone</strong>
                    <a href="tel:+919998320342" className="text-secondary text-decoration-none hover-accent">
                      +91-9998320342
                    </a>
                  </div>
                </div>

                <h4 className="h5 text-white mb-3">Connect with me</h4>
                <div className="d-flex">
                  <a href="https://github.com/chavdaamit1011-svg" target="_blank" rel="noreferrer" className="social-icon text-decoration-none" style={{ marginLeft: 0 }}>
                    <i className="bi bi-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/amit-chavda-9ab181355/" target="_blank" rel="noreferrer" className="social-icon text-decoration-none">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="h4 text-white mb-4">Send me a message</h3>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-3">
                    <Col md={12}>
                      <Form.Group>
                        <Form.Control 
                          type="text" 
                          name="name"
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="custom-input"
                          style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '12px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Control 
                          type="email" 
                          name="email"
                          placeholder="Your Email" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="custom-input"
                          style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '12px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Control 
                          as="textarea" 
                          name="message"
                          rows={5} 
                          placeholder="Your Message..." 
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="custom-input"
                          style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '12px' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <button type="submit" className="btn-custom-solid w-100 mt-2">
                        Send Message <i className="bi bi-send ms-2"></i>
                      </button>
                    </Col>
                  </Row>
                </Form>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="py-4 text-center" style={{ borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.5)' }}>
        <Container>
          <p className="text-secondary mb-0 small">
            © {new Date().getFullYear()} Amit Chavda. Built with React & <span className="text-gradient">bootstrap</span>.
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Contact;
