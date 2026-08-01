import React from 'react'

const row1Skills = [
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
]

const row2Skills = [
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
]

export default function Skills() {
  const doubleRow1 = [...row1Skills, ...row1Skills]
  const doubleRow2 = [...row2Skills, ...row2Skills]

  return (
    <section id="skills" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Heading matching reference design */}
        <div className="text-center mb-5">
          <h2 className="section-title font-heading d-inline-flex align-items-center gap-2">
            <span className="text-cyan fs-3 font-monospace">&lt;/&gt;</span> Skills
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-custom-muted fs-6 mt-2 mb-0">My coding skills</p>
        </div>

        {/* Marquee Row 1 */}
        <div className="marquee-container mb-3">
          <div className="marquee-track">
            {doubleRow1.map((skill, idx) => (
              <div key={`r1-${idx}`} className="skill-pill">
                <img src={skill.icon} alt={skill.name} loading="lazy" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Reverse direction) */}
        <div className="marquee-container">
          <div className="marquee-track reverse">
            {doubleRow2.map((skill, idx) => (
              <div key={`r2-${idx}`} className="skill-pill">
                <img src={skill.icon} alt={skill.name} loading="lazy" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
