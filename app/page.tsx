import { ParticleField } from '@/components/quantum/ParticleField'
import { Navigation } from '@/components/sections/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { WaveSection } from '@/components/sections/WaveSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'

export default function QuantumPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Interactive particle field */}
      <ParticleField />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section id="phenomena">
        <FeaturesSection />
      </section>
      
      {/* Wave Function Visualization */}
      <WaveSection />
      
      {/* Timeline Section */}
      <section id="history">
        <TimelineSection />
      </section>
      
      {/* CTA Section */}
      <section id="research">
        <CTASection />
      </section>
      
      {/* Footer */}
      <section id="contact">
        <Footer />
      </section>
    </main>
  )
}
