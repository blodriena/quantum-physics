"use client"

import { useEffect, useRef, useState } from 'react'

const timelineEvents = [
  {
    year: '1900',
    title: 'Quantum Birth',
    scientist: 'Max Planck',
    description: 'Introduction of energy quanta, marking the birth of quantum theory.',
    color: '#00dcff',
  },
  {
    year: '1905',
    title: 'Photoelectric Effect',
    scientist: 'Albert Einstein',
    description: 'Light behaves as particles (photons), earning Einstein the Nobel Prize.',
    color: '#b400ff',
  },
  {
    year: '1913',
    title: 'Atomic Model',
    scientist: 'Niels Bohr',
    description: 'Quantized electron orbits explained atomic spectra.',
    color: '#00ffc8',
  },
  {
    year: '1925',
    title: 'Matrix Mechanics',
    scientist: 'Werner Heisenberg',
    description: 'First complete formulation of quantum mechanics.',
    color: '#00dcff',
  },
  {
    year: '1926',
    title: 'Wave Equation',
    scientist: 'Erwin Schrödinger',
    description: 'The famous Schrödinger equation describing quantum wave functions.',
    color: '#b400ff',
  },
  {
    year: '1927',
    title: 'Uncertainty Principle',
    scientist: 'Werner Heisenberg',
    description: 'Fundamental limits on simultaneous measurements of conjugate variables.',
    color: '#00ffc8',
  },
]

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const items = sectionRef.current.querySelectorAll('[data-timeline-item]')
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.6) {
          setActiveIndex(prev => Math.max(prev, index))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,0,255,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-gradient">Quantum</span> History
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The revolutionary discoveries that shaped our understanding of the universe
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              data-timeline-item
              className={`
                relative flex items-center gap-8 mb-16 last:mb-0
                ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
                transition-all duration-700
                ${activeIndex >= index ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                transform: activeIndex >= index ? 'translateY(0)' : 'translateY(50px)',
              }}
            >
              {/* Content card */}
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div 
                  className={`
                    inline-block glass rounded-2xl p-6 max-w-md
                    transition-all duration-500
                    ${activeIndex >= index ? 'scale-100' : 'scale-95'}
                  `}
                  style={{
                    boxShadow: activeIndex >= index 
                      ? `0 0 40px ${event.color}20`
                      : 'none'
                  }}
                >
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: event.color }}
                  >
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-primary mb-3">{event.scientist}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="relative z-10">
                <div 
                  className={`
                    w-6 h-6 rounded-full border-4 border-background
                    transition-all duration-500
                    ${activeIndex >= index ? 'scale-100' : 'scale-0'}
                  `}
                  style={{ 
                    backgroundColor: event.color,
                    boxShadow: `0 0 20px ${event.color}80`
                  }}
                />
                {activeIndex >= index && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: event.color, opacity: 0.3 }}
                  />
                )}
              </div>

              {/* Empty space for layout */}
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
