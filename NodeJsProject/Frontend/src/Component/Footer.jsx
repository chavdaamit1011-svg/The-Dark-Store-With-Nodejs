import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Accordion } from "react-bootstrap";
import toast from "react-hot-toast";

export default function Footer() {

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    toast.success("Thank you for subscribing! 🎉");
    e.target.reset();
  };

  return (
    <>
      <style>{`
        .footer-section {
          background-color: #000;
          color: #fff;
          padding: 70px 0 30px;
        }

        .footer-brand {
          font-size: 2.1rem;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #fff 60%, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-tagline {
          font-size: 12px;
          color: #00d4ff;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .footer-desc {
          color: rgba(255, 255, 255, 0.65);
          font-size: 15px;
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 28px;
        }

        .newsletter-wrap {
          display: flex;
          gap: 10px;
          max-width: 460px;
        }

        .footer-input.form-control {
          background: #0d0d0d !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          color: #fff !important;
          height: 50px;
          border-radius: 8px !important;
          box-shadow: none !important;
          padding-left: 16px;
          font-size: 14px;
        }

        .footer-input.form-control::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .footer-input.form-control:focus {
          border-color: #00d4ff !important;
        }

        .footer-btn.btn {
          background: linear-gradient(135deg, #00d4ff, #0099bb) !important;
          color: #000 !important;
          border: none !important;
          min-width: 110px;
          height: 50px;
          border-radius: 8px !important;
          font-weight: 700;
          font-size: 14px;
          transition: 0.3s;
        }

        .footer-btn.btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,212,255,0.3);
        }

        .footer-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #00d4ff;
          margin-bottom: 22px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0,212,255,0.2);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 14px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          transition: 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer-links a:hover {
          color: #fff;
          padding-left: 4px;
        }

        .social-icons {
          display: flex;
          gap: 14px;
          margin-top: 5px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 16px;
          transition: 0.3s;
        }

        .social-icon:hover {
          border-color: #00d4ff;
          color: #00d4ff;
          background: rgba(0,212,255,0.08);
          transform: translateY(-3px);
        }

        .footer-divider {
          border-color: rgba(255,255,255,0.06);
          margin: 50px 0 0;
        }

        .about-accordion {
          margin-top: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .about-accordion .accordion-item {
          background: transparent !important;
          border: none !important;
          color: #fff !important;
        }

        .about-accordion .accordion-button {
          background: transparent !important;
          color: rgba(255,255,255,0.7) !important;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 22px 0;
          box-shadow: none !important;
        }

        .about-accordion .accordion-button:not(.collapsed) {
          color: #fff !important;
        }

        .about-accordion .accordion-button::after {
          filter: brightness(0) invert(1);
        }

        .about-accordion .accordion-body {
          color: rgba(255,255,255,0.6);
          padding: 0 0 22px 0;
          max-width: 800px;
          line-height: 1.8;
          font-size: 14px;
        }

        .footer-bottom {
          padding-top: 28px;
        }

        .footer-copy {
          color: rgba(255,255,255,0.45);
          font-size: 13px;
          margin: 0;
        }

        .footer-policy {
          display: flex;
          justify-content: flex-end;
          gap: 28px;
          flex-wrap: wrap;
        }

        .footer-policy a {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          font-size: 13px;
          transition: 0.25s ease;
        }

        .footer-policy a:hover {
          color: #fff;
        }

        .payment-badges {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .pay-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 5px 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        @media (max-width: 991.98px) {
          .footer-section { padding: 50px 0 25px; }
          .footer-brand { font-size: 1.8rem; }
          .footer-desc { max-width: 100%; }
          .footer-title { margin-top: 30px; }
          .footer-policy { justify-content: flex-start; gap: 16px; margin-top: 12px; }
        }

        @media (max-width: 575.98px) {
          .newsletter-wrap { flex-direction: column; }
          .footer-btn.btn { width: 100%; }
          .footer-brand { font-size: 1.6rem; }
          .footer-policy { gap: 12px; }
        }
      `}</style>

      <footer className="footer-section">
        <Container>
          <Row className="gy-4">

            {/* Brand + Newsletter */}
            <Col lg={5}>
              <p className="footer-tagline">Premium Streetwear</p>
              <h2 className="footer-brand">The Dark Store</h2>
              <p className="footer-desc">
                Premium streetwear with a bold identity. Sign up to our newsletter
                to stay updated with the latest drops and exclusive offers.
              </p>

              <Form onSubmit={handleNewsletterSubmit}>
                <div className="newsletter-wrap">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    className="footer-input"
                  />
                  <Button className="footer-btn" type="submit">
                    Subscribe
                  </Button>
                </div>
              </Form>

              <div className="payment-badges">
                <span className="pay-badge">🔒 Razorpay</span>
                <span className="pay-badge">📱 UPI</span>
                <span className="pay-badge">💳 Cards</span>
                <span className="pay-badge">📦 COD</span>
              </div>
            </Col>

            {/* Categories */}
            <Col lg={2} md={4} sm={6}>
              <h5 className="footer-title">Categories</h5>
              <ul className="footer-links">
                <li><Link to="/collections?subcategory=T-Shirt">T-Shirts</Link></li>
                <li><Link to="/collections?subcategory=Shirts">Shirts</Link></li>
                <li><Link to="/collections?subcategory=Hoodies">Hoodies</Link></li>
                <li><Link to="/collections?subcategory=Baby Tee">Baby Tees</Link></li>
                <li><Link to="/collections?subcategory=Mini Hoodies">Mini Hoodies</Link></li>
                <li><Link to="/collections?subcategory=Sweatshirts">Sweatshirts</Link></li>
              </ul>
            </Col>

            {/* Discover */}
            <Col lg={2} md={4} sm={6}>
              <h5 className="footer-title">Discover</h5>
              <ul className="footer-links">
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/men">Mens</Link></li>
                <li><Link to="/Women">Womens</Link></li>
                <li><Link to="/Collection">All Collections</Link></li>
                <li><Link to="/Cart">My Cart</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </Col>

            {/* Connect */}
            <Col lg={3} md={4}>
              <h5 className="footer-title">Connect With Us</h5>
              <div className="social-icons">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="WhatsApp"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>

              <ul className="footer-links mt-4">
                <li>
                  <a href="mailto:support@thedarkstore.in">
                    <i className="bi bi-envelope"></i> support@thedarkstore.in
                  </a>
                </li>
                <li>
                  <a href="tel:+919999999999">
                    <i className="bi bi-telephone"></i> +91 99999 99999
                  </a>
                </li>
              </ul>
            </Col>
          </Row>

          {/* About Accordion */}
          <div className="about-accordion mt-5">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>About Us</Accordion.Header>
                <Accordion.Body>
                  The Dark Store brings premium streetwear with a bold modern identity.
                  We design pieces that blend comfort, quality, and cutting-edge style.
                  Every drop is crafted with attention to detail — from fabric selection
                  to final stitch. Explore our latest collections and discover what
                  premium streetwear truly means.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Shipping & Returns</Accordion.Header>
                <Accordion.Body>
                  We offer free shipping on all orders across India. Orders are typically
                  dispatched within 2-3 business days. Returns and exchanges are accepted
                  within 7 days of delivery for unused items in original packaging.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>FAQs</Accordion.Header>
                <Accordion.Body>
                  <strong>How do I track my order?</strong> Once your order is shipped, you'll receive a tracking
                  link via email or phone. You can also check your order status in "My Orders" from your profile.
                  <br /><br />
                  <strong>What payment methods do you accept?</strong> We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <Row className="align-items-center gy-2">
              <Col md={6}>
                <p className="footer-copy">© 2026 The Dark Store. All rights reserved.</p>
              </Col>
              <Col md={6}>
                <div className="footer-policy">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Refund Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">Shipping Policy</a>
                </div>
              </Col>
            </Row>
          </div>

        </Container>
      </footer>
    </>
  );
}