"use client"

import { useEffect, useRef } from 'react'

export function WaveFunction() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 400
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.02

      const waves = [
        { amplitude: 60, frequency: 0.008, speed: 1.2, color: 'rgba(0, 220, 255, 0.6)', phase: 0 },
        { amplitude: 40, frequency: 0.012, speed: 0.8, color: 'rgba(180, 0, 255, 0.5)', phase: Math.PI / 3 },
        { amplitude: 30, frequency: 0.015, speed: 1.5, color: 'rgba(0, 255, 200, 0.4)', phase: Math.PI / 2 },
      ]

      const centerY = canvas.height / 2

      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.moveTo(0, centerY)

        for (let x = 0; x <= canvas.width; x += 2) {
          // Quantum probability wave (Gaussian modulated sine)
          const envelope = Math.exp(-Math.pow((x - canvas.width / 2) / (canvas.width / 3), 2))
          const y = centerY + 
            wave.amplitude * envelope * 
            Math.sin(x * wave.frequency + timeRef.current * wave.speed + wave.phase) *
            Math.cos(x * wave.frequency * 0.5 + timeRef.current * wave.speed * 0.3)
          
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Add glow effect
        ctx.strokeStyle = wave.color.replace('0.6', '0.2').replace('0.5', '0.15').replace('0.4', '0.1')
        ctx.lineWidth = 8
        ctx.stroke()

        // Draw probability density (|ψ|²)
        if (index === 0) {
          ctx.beginPath()
          for (let x = 0; x <= canvas.width; x += 3) {
            const envelope = Math.exp(-Math.pow((x - canvas.width / 2) / (canvas.width / 3), 2))
            const psi = wave.amplitude * envelope * 
              Math.sin(x * wave.frequency + timeRef.current * wave.speed + wave.phase)
            const probability = Math.abs(psi) * 0.5
            
            ctx.fillStyle = `rgba(0, 220, 255, ${probability / 60 * 0.3})`
            ctx.fillRect(x, centerY - probability, 3, probability * 2)
          }
        }
      })

      // Draw center line
      ctx.beginPath()
      ctx.setLineDash([5, 10])
      ctx.moveTo(0, centerY)
      ctx.lineTo(canvas.width, centerY)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px]"
      style={{ background: 'transparent' }}
    />
  )
}
