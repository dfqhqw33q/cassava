'use client'

import { useEffect, useRef } from 'react'

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-background opacity-0" style={{
      animation: 'fadeInUp 0.8s ease-out forwards'
    }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-b from-highlight/5 to-transparent"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-caramel/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-golden/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-highlight uppercase tracking-widest text-sm font-semibold mb-6">Ready to Indulge?</p>

        {/* Main Heading */}
        <h2 className="font-serif text-4xl md:text-6xl text-cream font-bold mb-6 leading-tight text-balance">
          Experience Premium Cassava Rolls Today
        </h2>

        {/* Subheading */}
        <p className="text-golden text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Order your favorite flavors now and taste the difference that quality ingredients and artisan craftsmanship make. Fresh, delicious, and delivered to your door.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-10 py-5 rounded-lg bg-highlight hover:bg-highlight/90 text-chocolate font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-highlight/40 hover:scale-105 transform">
            Order Your Cassava Roll Today
          </button>
          <button className="px-10 py-5 rounded-lg border-2 border-highlight hover:border-golden text-cream hover:text-golden font-semibold text-lg transition-all duration-300 bg-transparent hover:bg-chocolate-light/30">
            View Full Menu
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-highlight text-2xl">✓</span>
            <span className="text-cream/80">100% Fresh Guarantee</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-chocolate-lighter"></div>
          <div className="flex items-center gap-2">
            <span className="text-golden text-2xl">🚚</span>
            <span className="text-cream/80">Free Shipping Over ₱500</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-chocolate-lighter"></div>
          <div className="flex items-center gap-2">
            <span className="text-highlight text-2xl">⭐</span>
            <span className="text-cream/80">4.9/5 Customer Rating</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-12 border-t border-chocolate-lighter">
          <p className="text-cream/70 text-sm mb-4">Have questions? We're here to help!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:hello@cassavarollco.com" className="text-highlight hover:text-golden transition-colors font-semibold">
              hello@cassavarollco.com
            </a>
            <div className="hidden sm:block w-px h-4 bg-chocolate-lighter"></div>
            <a href="tel:+639171234567" className="text-highlight hover:text-golden transition-colors font-semibold">
              +63 (917) 123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-in {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
