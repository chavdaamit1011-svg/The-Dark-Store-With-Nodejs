import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home">
      <Container>
        <Row className="align-items-center">
          <Col lg={8} md={10} className="mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h5 className="text-secondary mb-3">Hello, I'm</h5>
              <h1 className="display-2 fw-bold text-white mb-4">
                AMIT <span className="text-gradient">CHAVDA</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-subtitle fw-semiblod"
            >
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Web Developer',
                    'Passionate Fast Learner',
                    'Creative Problem Solver'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-5 d-flex justify-content-center gap-3"
            >
              <Link to="projects" smooth={true} duration={500} offset={-70}>
                <button className="btn-custom-solid">View My Work</button>
              </Link>
              <Link to="contact" smooth={true} duration={500} offset={-70}>
                <button className="btn btn-custom">Contact Me</button>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
