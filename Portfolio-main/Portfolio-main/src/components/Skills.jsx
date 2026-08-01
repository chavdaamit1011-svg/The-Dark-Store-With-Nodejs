import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: 'bi-window-sidebar',
    skills: [
      { name: 'Bootstrap', icon: 'bi-bootstrap' },
      { name: 'React.js', icon: 'bi-code-slash' }
    ]
  },
  {
    title: 'Backend Development',
    icon: 'bi-server',
    skills: [
      { name: 'Node.js', icon: 'bi-node-plus' },
      { name: 'Express.js', icon: 'bi-cpu' },
      { name: 'MongoDB', icon: 'bi-database' }
    ]
  },
  {
    title: 'Languages',
    icon: 'bi-code-square',
    skills: [
      { name: 'JavaScript', icon: 'bi-filetype-js' },
      { name: 'HTML5', icon: 'bi-filetype-html' },
      { name: 'CSS3', icon: 'bi-filetype-css' }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Skills = () => {
  return (
    <section id="skills">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Technical Skills</h2>
        </motion.div>

        <Row className="gy-4 mt-3">
          {skillCategories.map((category, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div
                className="glass-card h-100 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-4">
                  <i className={`bi ${category.icon}`} style={{ fontSize: '3rem', color: 'var(--accent-color)' }}></i>
                </div>
                <h3 className="h5 text-white mb-4">{category.title}</h3>
                
                <motion.div 
                  className="d-flex flex-wrap justify-content-center"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill, sIdx) => (
                    <motion.div key={sIdx} variants={itemVariants} className="skill-badge">
                      <i className={`bi ${skill.icon}`}></i> {skill.name}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Skills;
