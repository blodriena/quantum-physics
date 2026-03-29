"use client"

import { WaveFunction } from '@/components/quantum/WaveFunction'

export function WaveSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Wave Function</span>
              <br />
              <span className="text-foreground">Visualization</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The wave function ψ describes the quantum state of a particle. 
              Its square magnitude |ψ|² represents the probability density of 
              finding the particle at a given position.
            </p>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Real-time wave propagation</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-sm text-muted-foreground">Probability amplitude visualization</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-quantum-cyan animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-sm text-muted-foreground">Gaussian envelope modulation</span>
              </div>
            </div>

            {/* Schrödinger equation */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Schrödinger Equation</p>
              <div className="font-mono text-lg text-primary">
                iℏ ∂ψ/∂t = Ĥψ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave visualization */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <WaveFunction />
      </div>

      {/* Bottom labels */}
      <div className="container mx-auto px-6 mt-8">
        <div className="flex justify-between text-xs text-muted-foreground font-mono">
          <span>x = -∞</span>
          <span>|ψ(x)|² → Probability Density</span>
          <span>x = +∞</span>
        </div>
      </div>
    </section>
  )
}
