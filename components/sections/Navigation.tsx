"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Phenomena', href: '#phenomena' },
  { label: 'History', href: '#history' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "py-4 glass-strong" 
          : "py-6 bg-transparent"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">Q</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gradient">Quantum</span>
                <span className="text-foreground">Realm</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative text-muted-foreground hover:text-foreground transition-colors py-2 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-[0_0_30px_rgba(0,220,255,0.4)] transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden",
        isMobileMenuOpen 
          ? "opacity-100 pointer-events-auto" 
          : "opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                "text-3xl font-bold text-muted-foreground hover:text-gradient transition-all duration-300",
                "transform",
                isMobileMenuOpen 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            className={cn(
              "mt-8 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg",
              "transform transition-all duration-500",
              isMobileMenuOpen 
                ? "translate-y-0 opacity-100" 
                : "translate-y-10 opacity-0"
            )}
            style={{ transitionDelay: `${navItems.length * 100}ms` }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}
