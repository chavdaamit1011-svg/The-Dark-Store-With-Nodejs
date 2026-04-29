import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields!");
      return;
    }
    setSubmitting(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll get back to you soon. 🎉");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
        .contact-page {
          background: #050505;
          min-height: 100vh;
          padding: 70px 0 100px;
          color: #fff;
        }

        .contact-heading {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #fff 50%, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .contact-subheading {
          color: #aaa;
          font-size: 16px;
          margin-bottom: 60px;
        }

        /* Info Cards */
        .info-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 16px;
          padding: 28px 24px;
          margin-bottom: 20px;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          transition: 0.3s;
        }

        .info-card:hover {
          border-color: rgba(0, 212, 255, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.07);
        }

        .info-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(0, 212, 255, 0.1);
          color: #00d4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #00d4ff;
          margin-bottom: 5px;
        }

        .info-value {
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          display: block;
        }

        .info-value:hover { color: #00d4ff; }

        .info-note {
          font-size: 12px;
          color: #666;
          margin-top: 3px;
        }

        /* Social row */
        .contact-social-row {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .contact-social-btn {
          flex: 1;
          padding: 12px 10px;
          border-radius: 12px;
          border: 1px solid #222;
          background: #111;
          color: #aaa;
          text-decoration: none;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.3s;
        }

        .contact-social-btn:hover {
          border-color: #00d4ff;
          color: #00d4ff;
          background: rgba(0,212,255,0.06);
        }

        /* Form */
        .contact-form-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 20px;
          padding: 40px;
        }

        @media (max-width: 576px) {
          .contact-form-card { padding: 24px 18px; }
        }

        .form-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .form-subtitle {
          color: #666;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .contact-label {
          display: block;
          font-size: 13px;
          color: #ccc;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .contact-input,
        .contact-textarea {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #222;
          border-radius: 10px;
          color: #fff;
          padding: 13px 16px;
          font-size: 14px;
          outline: none;
          transition: 0.3s;
          resize: none;
          font-family: inherit;
          margin-bottom: 20px;
          box-sizing: border-box;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
        }

        .contact-input::placeholder,
        .contact-textarea::placeholder { color: #444; }

        .contact-submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #00d4ff, #0099cc);
          color: #000;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .contact-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,212,255,0.3);
        }

        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>

      <div className="contact-page">
        <Container>
          <div className="text-center mb-2">
            <h1 className="contact-heading">Get In Touch</h1>
            <p className="contact-subheading">Have a question, feedback, or need help? We're here for you.</p>
          </div>

          <Row className="g-4">
            {/* LEFT: Info */}
            <Col lg={5}>
              <div className="info-card">
                <div className="info-icon"><i className="bi bi-envelope-fill"></i></div>
                <div>
                  <div className="info-label">Email Us</div>
                  <a href="mailto:support@thedarkstore.in" className="info-value">support@thedarkstore.in</a>
                  <div className="info-note">We reply within 24 hours</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><i className="bi bi-telephone-fill"></i></div>
                <div>
                  <div className="info-label">Call / WhatsApp</div>
                  <a href="tel:+919999999999" className="info-value">+91 99999 99999</a>
                  <div className="info-note">Mon – Sat, 10am – 7pm IST</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><i className="bi bi-geo-alt-fill"></i></div>
                <div>
                  <div className="info-label">Our Location</div>
                  <span className="info-value">Ahmedabad, Gujarat, India</span>
                  <div className="info-note">Serving across all of India</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><i className="bi bi-clock-fill"></i></div>
                <div>
                  <div className="info-label">Business Hours</div>
                  <span className="info-value">Mon – Sat: 10:00 AM – 7:00 PM</span>
                  <div className="info-note">Sunday: Closed</div>
                </div>
              </div>

              {/* Social */}
              <div className="contact-social-row">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                  <i className="bi bi-instagram"></i> Instagram
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                  <i className="bi bi-facebook"></i> Facebook
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                  <i className="bi bi-whatsapp"></i> WhatsApp
                </a>
              </div>
            </Col>

            {/* RIGHT: Form */}
            <Col lg={7}>
              <div className="contact-form-card">
                <h2 className="form-title">Send Us a Message</h2>
                <p className="form-subtitle">Fill in the form and our team will respond as soon as possible.</p>

                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm={6}>
                      <label className="contact-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="contact-input"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={6}>
                      <label className="contact-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="contact-input"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>

                  <label className="contact-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="contact-input"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                  />

                  <label className="contact-label">Message *</label>
                  <textarea
                    name="message"
                    className="contact-textarea"
                    rows={6}
                    placeholder="Describe your issue or question in detail..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="contact-submit-btn" disabled={submitting}>
                    {submitting ? (
                      <><span className="spinner-border spinner-border-sm" role="status"></span> Sending...</>
                    ) : (
                      <><i className="bi bi-send-fill"></i> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
