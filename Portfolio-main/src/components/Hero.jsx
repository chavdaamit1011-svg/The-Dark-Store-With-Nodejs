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

        <div className="fs-3 text-custom-heading font-medium mb-5 min-h-12 d-flex align-items-center justify-content-center">
          <span>{text}</span>
          <span className="typing-cursor"></span>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <a href="#projects" className="btn btn-cyan btn-lg rounded-pill px-4 py-3 fs-6">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline-cyan btn-lg rounded-pill px-4 py-3 fs-6">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}
