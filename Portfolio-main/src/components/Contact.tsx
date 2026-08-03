import React, { useState } from 'react'
import BorderGlow from './BorderGlow'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 4000)
  }

  return (
    <section id="contact" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="row g-4 align-items-start">
          {/* Left Column: Contact Cards */}
          <div className="col-lg-5">
            <h3 className="fs-3 fw-bold text-custom-heading mb-3">
              Let's talk about everything!
            </h3>
            <p className="text-custom-muted mb-4 fs-6 lh-base">
              Feel free to reach out to me for web development projects, freelance
              inquiries, or software engineering job opportunities.
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              {/* Location Card */}
              <BorderGlow className="p-3" borderRadius={14} edgeSensitivity={30} glowRadius={35}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-cyan">
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 fw-semibold text-custom-heading mb-0">Location</h5>
                    <p className="text-custom-muted small mb-0">Nikol, Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </BorderGlow>

              {/* Email Card */}
              <BorderGlow className="p-3" borderRadius={14} edgeSensitivity={30} glowRadius={35}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-cyan">
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 fw-semibold text-custom-heading mb-0">Email</h5>
                    <a href="mailto:chavdaamit1011@gmail.com" className="text-custom-muted small text-decoration-none hover-white mb-0">
                      chavdaamit1011@gmail.com
                    </a>
                  </div>
                </div>
              </BorderGlow>

              {/* Phone Card */}
              <BorderGlow className="p-3" borderRadius={14} edgeSensitivity={30} glowRadius={35}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-cyan">
                    <i className="bi bi-telephone-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 fw-semibold text-custom-heading mb-0">Phone</h5>
                    <a href="tel:+919998320342" className="text-custom-muted small text-decoration-none hover-white mb-0">
                      +91-9998320342
                    </a>
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Social Links (GitHub, LinkedIn, Instagram, WhatsApp) */}
            <div className="d-flex gap-3 mt-4">
              <a
                href="https://github.com/chavdaamit1011-svg"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-card p-3 text-custom-heading text-decoration-none d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '45px', height: '45px' }}
                aria-label="GitHub"
                title="GitHub"
              >
                <i className="bi bi-github fs-5"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/amit-chavda-9ab181355/"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-card p-3 text-custom-heading text-decoration-none d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '45px', height: '45px' }}
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a
                href="https://www.instagram.com/chavda_amit_111/"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-card p-3 text-custom-heading text-decoration-none d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '45px', height: '45px' }}
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="bi bi-instagram fs-5 text-danger"></i>
              </a>
              <a
                href="https://wa.me/919998320342"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-card p-3 text-custom-heading text-decoration-none d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '45px', height: '45px' }}
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <i className="bi bi-whatsapp fs-5 text-success"></i>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form Card wrapped with BorderGlow */}
          <div className="col-lg-7">
            <BorderGlow className="p-4 p-md-5" borderRadius={20} edgeSensitivity={35} glowRadius={40}>
              <h3 className="fs-4 fw-bold text-custom-heading mb-4">Send me a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control form-input-custom"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-control form-input-custom"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    rows={5}
                    required
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control form-input-custom"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-cyan btn-lg rounded-pill w-100 py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-send-fill"></i> Send Message
                </button>
              </form>

              {submitted && (
                <div className="mt-3 p-3 bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-3 text-center small">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  )
}
