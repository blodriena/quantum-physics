"use client"

import { useState, useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface QuantumCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'cyan' | 'magenta' | 'purple'
}

export function QuantumCard({ children, className, glowColor = 'cyan' }: QuantumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const glowColors = {
    cyan: 'rgba(0, 220, 255, 0.15)',
    magenta: 'rgba(180, 0, 255, 0.15)',
    purple: 'rgba(100, 0, 200, 0.15)',
  }

  const borderColors = {
    cyan: 'rgba(0, 220, 255, 0.3)',
    magenta: 'rgba(180, 0, 255, 0.3)',
    purple: 'rgba(100, 0, 200, 0.3)',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-500",
        "bg-card/50 backdrop-blur-xl",
        "border border-border/50",
        isHovered && "scale-[1.02] border-primary/30",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered 
          ? `0 25px 50px -12px ${glowColors[glowColor]}, 0 0 100px ${glowColors[glowColor]}`
          : 'none'
      }}
    >
      {/* Gradient follow cursor */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 40%)`,
        }}
      />
      
      {/* Border gradient */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${borderColors[glowColor]}, transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-accent/20 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/20 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-2xl" />
    </div>
  )
}
