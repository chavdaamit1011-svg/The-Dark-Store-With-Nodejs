import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Navigation = () => {
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      collapseOnSelect 
      expand="lg" 
      variant="dark" 
      fixed="top"
      className={navBackground ? 'navbar-glass py-2' : 'bg-transparent py-4 transition-all'}
      style={{ transition: 'all 0.3s ease-in-out' }}
    >
      <Container>
        <Navbar.Brand href="#home" as={Link} to="home" smooth={true} duration={500} className="brand-animated" style={{cursor: 'pointer'}}>
          AMIT.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="home" smooth={true} duration={500} offset={-70} style={{cursor: 'pointer'}}>Home</Nav.Link>
            <Nav.Link as={Link} to="about" smooth={true} duration={500} offset={-70} style={{cursor: 'pointer'}}>About</Nav.Link>
            <Nav.Link as={Link} to="skills" smooth={true} duration={500} offset={-70} style={{cursor: 'pointer'}}>Skills</Nav.Link>
            <Nav.Link as={Link} to="projects" smooth={true} duration={500} offset={-70} style={{cursor: 'pointer'}}>Projects</Nav.Link>
            <Nav.Link as={Link} to="contact" smooth={true} duration={500} offset={-70} style={{cursor: 'pointer'}}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
