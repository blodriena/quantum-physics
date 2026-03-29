"use client"

import { useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface QuantumButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function QuantumButton({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick 
}: QuantumButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    
    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 600)
    
    onClick?.()
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground border border-primary/30',
    ghost: 'bg-transparent text-foreground border border-border hover:border-primary/50',
  }

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
        "group",
        sizeClasses[size],
        variantClasses[variant],
        isHovered && variant === 'primary' && "shadow-[0_0_30px_rgba(0,220,255,0.4)]",
        isHovered && variant === 'secondary' && "shadow-[0_0_30px_rgba(180,0,255,0.3)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Animated background gradient */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(135deg, rgba(0,220,255,0.2), rgba(180,0,255,0.2))'
            : 'linear-gradient(135deg, rgba(180,0,255,0.1), rgba(0,220,255,0.1))'
        }}
      />
      
      {/* Shimmer effect */}
      <div 
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-700",
          isHovered && "translate-x-full"
        )}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
      />

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute animate-ping rounded-full bg-white/30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Border glow */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(0,220,255,0.5), rgba(180,0,255,0.5))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />
    </button>
  )
}
