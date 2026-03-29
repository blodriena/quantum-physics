"use client"

import { useEffect, useRef, useState } from 'react'
import { QuantumCard } from '@/components/quantum/QuantumCard'
import { Atom, Waves, Zap, Infinity, Binary, CircleDot } from 'lucide-react'

const features = [
  {
    icon: Atom,
    title: 'Quantum Superposition',
    description: 'Particles exist in multiple states simultaneously until observed, defying classical intuition.',
    color: 'cyan' as const,
  },
  {
    icon: Waves,
    title: 'Wave-Particle Duality',
    description: 'Matter exhibits both wave and particle properties, revealing the dual nature of reality.',
    color: 'magenta' as const,
  },
  {
    icon: Zap,
    title: 'Quantum Entanglement',
    description: 'Particles become mysteriously connected, sharing states across vast cosmic distances.',
    color: 'purple' as const,
  },
  {
    icon: Infinity,
    title: 'Heisenberg Uncertainty',
    description: 'Position and momentum cannot both be precisely known, a fundamental limit of nature.',
    color: 'cyan' as const,
  },
  {
    icon: Binary,
    title: 'Quantum Computing',
    description: 'Harnessing quantum mechanics for exponentially powerful computational capabilities.',
    color: 'magenta' as const,
  },
  {
    icon: CircleDot,
    title: 'Quantum Tunneling',
    description: 'Particles penetrate barriers that classical physics deems impenetrable.',
    color: 'purple' as const,
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards(prev => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-index]')
    cards?.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-gradient">Quantum</span> Phenomena
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the strange and beautiful principles that govern the subatomic world
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleCards.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <QuantumCard glowColor={feature.color} className="h-full">
                <div className="p-8 space-y-6">
                  {/* Icon */}
                  <div className="relative inline-block">
                    <div 
                      className={`absolute inset-0 blur-xl opacity-50 ${
                        feature.color === 'cyan' ? 'bg-primary' :
                        feature.color === 'magenta' ? 'bg-accent' : 'bg-quantum-purple'
                      }`}
                    />
                    <div className={`
                      relative w-16 h-16 rounded-2xl flex items-center justify-center
                      ${feature.color === 'cyan' ? 'bg-primary/20' :
                        feature.color === 'magenta' ? 'bg-accent/20' : 'bg-quantum-purple/20'}
                    `}>
                      <feature.icon className={`
                        w-8 h-8
                        ${feature.color === 'cyan' ? 'text-primary' :
                          feature.color === 'magenta' ? 'text-accent' : 'text-quantum-purple'}
                      `} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Decorative line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Learn more link */}
                  <button className={`
                    text-sm font-medium flex items-center gap-2 group
                    ${feature.color === 'cyan' ? 'text-primary hover:text-primary/80' :
                      feature.color === 'magenta' ? 'text-accent hover:text-accent/80' : 'text-quantum-purple hover:opacity-80'}
                  `}>
                    Explore concept
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </QuantumCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
