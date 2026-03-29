"use client"

import { useEffect, useRef } from 'react'
import { QuantumButton } from '@/components/quantum/QuantumButton'
import { ArrowRight, Rocket } from 'lucide-react'

export function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    interface Star {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }

    const stars: Star[] = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 20, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        star.opacity += (Math.random() - 0.5) * 0.1
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.8})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Starfield background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(0,50,100,0.1), transparent)' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,150,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(180,0,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30">
            <Rocket className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent">Begin Your Quantum Journey</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">Ready to explore the</span>
            <br />
            <span className="text-gradient">quantum frontier?</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of researchers, enthusiasts, and curious minds 
            diving deep into the mysteries of the subatomic world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <QuantumButton variant="primary" size="lg">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </QuantumButton>
            <QuantumButton variant="secondary" size="lg">
              Watch Demo
            </QuantumButton>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '50K+', label: 'Researchers' },
              { value: '200+', label: 'Institutions' },
              { value: '1M+', label: 'Simulations' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
