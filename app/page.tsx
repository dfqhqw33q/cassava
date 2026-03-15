import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { FlavorCollection } from '@/components/landing/flavor-collection'
import { CraftsmanshipSection } from '@/components/landing/craftsmanship-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { PromotionSection } from '@/components/landing/promotion-section'
import { CtaSection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <FlavorCollection />
      <CraftsmanshipSection />
      <TestimonialsSection />
      <PromotionSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
