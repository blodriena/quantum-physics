"use client"

import { useEffect, useState } from 'react'
import { AtomicOrbital } from '@/components/quantum/AtomicOrbital'
import { QuantumButton } from '@/components/quantum/QuantumButton'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  
  const words = ['QUANTUM', 'SUBATOMIC', 'INFINITE', 'ETERNAL']

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,100,150,0.15),transparent_70%)]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,220,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,220,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-10 w-32 h-32 rounded-full bg-quantum-magenta/10 blur-2xl animate-pulse-glow" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Explore the Subatomic Universe</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-foreground">THE</span>
              <br />
              <span 
                key={textIndex}
                className="text-gradient inline-block animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {words[textIndex]}
              </span>
              <br />
              <span className="text-foreground">REALM</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Journey into the quantum realm where particles dance in superposition, 
              waves collapse into reality, and the fabric of spacetime bends to the 
              laws of quantum mechanics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <QuantumButton variant="primary" size="lg">
                Begin Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </QuantumButton>
              <QuantumButton variant="ghost" size="lg">
                Learn More
              </QuantumButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              {[
                { value: '10⁻³⁵', label: 'Planck Length (m)' },
                { value: '∞', label: 'Possibilities' },
                { value: '137', label: 'Fine Structure' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Atom visualization */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative">
              {/* Glow behind atom */}
              <div className="absolute inset-0 blur-3xl opacity-30">
                <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full animate-morph" />
              </div>
              
              {/* Expanding rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full border border-primary/20 animate-expand-ring" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-accent/20 animate-expand-ring" style={{ animationDelay: '-1s' }} />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-primary/20 animate-expand-ring" style={{ animationDelay: '-2s' }} />
              </div>

              <AtomicOrbital size={500} className="relative z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to Explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
