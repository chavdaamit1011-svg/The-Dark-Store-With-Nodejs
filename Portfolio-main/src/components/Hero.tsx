import React, { useState, useEffect } from 'react'

const phrases = ['Full Stack Web Developer', 'Passionate Fast Learner', 'MERN Stack - Next.js Developer']

export default function Hero() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(120)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const handleTyping = () => {
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1))
        setTypingSpeed(40)
      } else {
        setText(currentPhrase.substring(0, text.length + 1))
        setTypingSpeed(100)
      }

      if (!isDeleting && text === currentPhrase) {
        setTypingSpeed(2000)
        setIsDeleting(true)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
        setTypingSpeed(300)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, phraseIndex, typingSpeed])

  return (
    <section
      id="home"
      className="position-relative d-flex align-items-center justify-content-center min-vh-100 text-center px-3"
      style={{ paddingTop: '100px', paddingBottom: '60px' }}
    >
      <div className="bg-ambient-light" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>

      <div className="container position-relative z-1 max-w-4xl mx-auto">
        <p className="text-custom-muted fs-5 mb-2 font-medium">Hello, I'm</p>

        <h1 className="display-2 hero-name-text text-custom-heading mb-3">
          AMIT <span className="text-gradient-cyan-purple">CHAVDA</span>
        </h1>

        <div className="fs-3 text-custom-heading font-medium mb-4 min-h-12 d-flex align-items-center justify-content-center">
          <span>{text}</span>
          <span className="typing-cursor"></span>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4 mb-4">
          <a href="#projects" className="btn btn-cyan btn-lg rounded-pill px-4 py-3 fs-6">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline-cyan btn-lg rounded-pill px-4 py-3 fs-6">
            Contact Me
          </a>
        </div>

        {/* Hero Social Icon Bar */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <a
            href="https://github.com/chavdaamit1011-svg"
            target="_blank"
            rel="noopener noreferrer"
            className="custom-card p-3 text-custom-heading text-decoration-none d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: '42px', height: '42px' }}
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
            style={{ width: '42px', height: '42px' }}
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
            style={{ width: '42px', height: '42px' }}
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
            style={{ width: '42px', height: '42px' }}
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <i className="bi bi-whatsapp fs-5 text-success"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
