import { HeroSection } from "@/components/landing/hero-section"
import { FlavorCollection } from "@/components/landing/flavor-collection"
import { CraftsmanshipSection } from "@/components/landing/craftsmanship-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PromotionSection } from "@/components/landing/promotion-section"
import { FinalCTA } from "@/components/landing/final-cta"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <FlavorCollection />
      <CraftsmanshipSection />
      <TestimonialsSection />
      <PromotionSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
