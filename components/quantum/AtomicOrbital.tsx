"use client"

import { useEffect, useRef } from 'react'

interface AtomicOrbitalProps {
  size?: number
  className?: string
}

export function AtomicOrbital({ size = 400, className = "" }: AtomicOrbitalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    interface Electron {
      angle: number
      orbitRadius: number
      speed: number
      size: number
      color: string
      orbitTilt: number
      orbitRotation: number
    }

    const electrons: Electron[] = [
      { angle: 0, orbitRadius: size * 0.35, speed: 0.02, size: 6, color: '#00dcff', orbitTilt: 0.2, orbitRotation: 0 },
      { angle: Math.PI * 0.66, orbitRadius: size * 0.35, speed: 0.02, size: 6, color: '#00dcff', orbitTilt: 0.2, orbitRotation: 0 },
      { angle: Math.PI * 1.33, orbitRadius: size * 0.35, speed: 0.02, size: 6, color: '#00dcff', orbitTilt: 0.2, orbitRotation: 0 },
      { angle: 0, orbitRadius: size * 0.25, speed: 0.03, size: 5, color: '#b400ff', orbitTilt: -0.3, orbitRotation: Math.PI / 3 },
      { angle: Math.PI, orbitRadius: size * 0.25, speed: 0.03, size: 5, color: '#b400ff', orbitTilt: -0.3, orbitRotation: Math.PI / 3 },
      { angle: Math.PI * 0.5, orbitRadius: size * 0.15, speed: 0.04, size: 4, color: '#00ffc8', orbitTilt: 0.5, orbitRotation: Math.PI * 0.7 },
    ]

    const centerX = size / 2
    const centerY = size / 2

    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      timeRef.current += 0.01

      // Draw nucleus glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 0.15)
      gradient.addColorStop(0, 'rgba(255, 100, 100, 0.8)')
      gradient.addColorStop(0.3, 'rgba(255, 50, 50, 0.4)')
      gradient.addColorStop(0.6, 'rgba(200, 0, 100, 0.2)')
      gradient.addColorStop(1, 'rgba(100, 0, 50, 0)')
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, size * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw nucleus core
      ctx.beginPath()
      ctx.arc(centerX, centerY, size * 0.04, 0, Math.PI * 2)
      ctx.fillStyle = '#ff4466'
      ctx.fill()
      
      // Nucleus inner glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, size * 0.025, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // Draw orbital paths
      electrons.forEach((electron) => {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(electron.orbitRotation)
        
        ctx.beginPath()
        ctx.ellipse(0, 0, electron.orbitRadius, electron.orbitRadius * Math.cos(electron.orbitTilt), 0, 0, Math.PI * 2)
        ctx.strokeStyle = `${electron.color}22`
        ctx.lineWidth = 1
        ctx.stroke()
        
        ctx.restore()
      })

      // Draw electrons with trails
      electrons.forEach((electron) => {
        electron.angle += electron.speed

        // Calculate 3D position
        const x3d = Math.cos(electron.angle) * electron.orbitRadius
        const y3d = Math.sin(electron.angle) * electron.orbitRadius * Math.cos(electron.orbitTilt)
        const z3d = Math.sin(electron.angle) * electron.orbitRadius * Math.sin(electron.orbitTilt)

        // Rotate by orbit rotation
        const rotatedX = x3d * Math.cos(electron.orbitRotation) - y3d * Math.sin(electron.orbitRotation)
        const rotatedY = x3d * Math.sin(electron.orbitRotation) + y3d * Math.cos(electron.orbitRotation)

        const x = centerX + rotatedX
        const y = centerY + rotatedY

        // Draw trail
        for (let i = 1; i <= 8; i++) {
          const trailAngle = electron.angle - electron.speed * i * 3
          const trailX3d = Math.cos(trailAngle) * electron.orbitRadius
          const trailY3d = Math.sin(trailAngle) * electron.orbitRadius * Math.cos(electron.orbitTilt)
          
          const trailRotatedX = trailX3d * Math.cos(electron.orbitRotation) - trailY3d * Math.sin(electron.orbitRotation)
          const trailRotatedY = trailX3d * Math.sin(electron.orbitRotation) + trailY3d * Math.cos(electron.orbitRotation)
          
          const trailX = centerX + trailRotatedX
          const trailY = centerY + trailRotatedY
          
          ctx.beginPath()
          ctx.arc(trailX, trailY, electron.size * (1 - i * 0.1), 0, Math.PI * 2)
          ctx.fillStyle = electron.color + Math.floor((1 - i / 10) * 50).toString(16).padStart(2, '0')
          ctx.fill()
        }

        // Draw electron glow
        const electronGlow = ctx.createRadialGradient(x, y, 0, x, y, electron.size * 3)
        electronGlow.addColorStop(0, electron.color)
        electronGlow.addColorStop(0.5, electron.color + '40')
        electronGlow.addColorStop(1, electron.color + '00')
        
        ctx.beginPath()
        ctx.arc(x, y, electron.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = electronGlow
        ctx.fill()

        // Draw electron
        ctx.beginPath()
        ctx.arc(x, y, electron.size, 0, Math.PI * 2)
        ctx.fillStyle = electron.color
        ctx.fill()
        
        // Electron core
        ctx.beginPath()
        ctx.arc(x, y, electron.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ background: 'transparent' }}
    />
  )
}
