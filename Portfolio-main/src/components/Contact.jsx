import React, { useState } from 'react'
import BorderGlow from './BorderGlow'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hi Amit, my name is ${formData.name} (${formData.email}). ${formData.message}`
    window.open(`https://wa.me/919998320342?text=${encodeURIComponent(text)}`, '_blank')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="row g-5">
          {/* Left Column: Contact Information */}
          <div className="col-lg-5">
            <h3 className="fs-3 fw-bold text-custom-heading mb-3">Contact Information</h3>
            <p className="text-custom-muted lh-lg mb-4">
              I am currently open for full-time opportunities and freelance projects.
              Whether you have a question or just want to say hi, I'll try my best to get
              back to you!
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              {/* Location */}
              <BorderGlow className="p-3" borderRadius={14} edgeSensitivity={35} glowRadius={30}>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-dark p-3 me-3 text-cyan border border-secondary border-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-geo-alt-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fs-6 fw-bold text-custom-heading mb-0">Location</h4>
                    <p className="text-custom-muted small mb-0">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </BorderGlow>

              {/* Email */}
              <BorderGlow className="p-3" borderRadius={14} edgeSensitivity={35} glowRadius={30}>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-dark p-3 me-3 text-cyan border border-secondary border-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-envelope-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fs-6 fw-bold text-custom-heading mb-0">Email</h4>
                    <a href="mailto:chavdaamit1011@gmail.com" className="text-custom-muted small text-decoration-none hover-white mb-0">
                      chavdaamit1011@gmail.com
                    </a>
                  </div>
                </div>
              </BorderGlow>

              {/* Phone */}
              <BorderGlow className="p-3" borderRadius={14} edgeSensitivity={35} glowRadius={30}>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-dark p-3 me-3 text-cyan border border-secondary border-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-telephone-fill fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fs-6 fw-bold text-custom-heading mb-0">Phone</h4>
                    <a href="tel:+919998320342" className="text-custom-muted small text-decoration-none hover-white mb-0">
                      +91-9998320342
                    </a>
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Social Links */}
            <div className="d-flex gap-3 mt-4">
              <a
                href="https://github.com/chavdaamit1011-svg"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-card p-3 text-custom-heading text-decoration-none d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '45px', height: '45px' }}
                aria-label="GitHub"
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
              >
                <i className="bi bi-linkedin fs-5"></i>
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
                    required
                    rows={5}
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control form-input-custom"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-cyan btn-lg rounded-pill px-5 w-100 fw-bold">
                  Send Message
                </button>
              </form>
            </BorderGlow>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-custom-muted small border-top border-secondary border-opacity-25 pt-4 mt-5">
          <p className="mb-0">
            © {new Date().getFullYear()} Amit Chavda. Built with React & Bootstrap.
          </p>
        </footer>
      </div>
    </section>
  )
}
