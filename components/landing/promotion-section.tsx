'use client'

import { useEffect, useRef } from 'react'

export function PromotionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const gradientElement = sectionRef.current.querySelector('.gradient-overlay') as HTMLElement
      if (gradientElement) {
        gradientElement.style.backgroundPosition = `${x}px ${y}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Main Promo Card */}
        <div className="relative group">
          {/* Glow Background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-highlight/20 via-golden/10 to-caramel/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Card Content */}
          <div className="relative rounded-2xl overflow-hidden border border-highlight/30 group-hover:border-highlight/60 transition-all duration-500 bg-gradient-to-br from-chocolate-light to-chocolate-lighter p-8 md:p-16">
            {/* Animated Gradient Overlay */}
            <div 
              className="gradient-overlay absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(200, 122, 43, 0.15), transparent 80%)`,
                backgroundSize: '200% 200%',
                backgroundPosition: '0 0',
              }}
            ></div>

            <div className="relative z-20 grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-highlight/20 border border-highlight/50 text-highlight text-sm font-semibold">
                    Limited Time Offer
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-cream font-bold mb-4 leading-tight">
                  Buy 5,<br />Get 1 Free
                </h2>
                <p className="text-golden text-lg mb-2">
                  Our biggest promotion of the season
                </p>
                <p className="text-cream/70 text-base mb-8">
                  Order any 5 boxes of your favorite cassava rolls and receive one premium box completely free. Mix and match flavors to create your perfect collection.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-highlight text-lg mt-1">✓</span>
                    <div>
                      <p className="text-cream font-semibold">Free Premium Box</p>
                      <p className="text-golden/70 text-sm">Choose any flavor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-highlight text-lg mt-1">✓</span>
                    <div>
                      <p className="text-cream font-semibold">Free Shipping</p>
                      <p className="text-golden/70 text-sm">Nationwide delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-highlight text-lg mt-1">✓</span>
                    <div>
                      <p className="text-cream font-semibold">Fresh Guarantee</p>
                      <p className="text-golden/70 text-sm">Baked and shipped fresh</p>
                    </div>
                  </div>
                </div>

                <button className="px-8 py-4 rounded-lg bg-highlight hover:bg-highlight/90 text-chocolate font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-highlight/30 hover:scale-105 transform">
                  Claim Your Deal Now
                </button>
              </div>

              {/* Right - Visual */}
              <div className="relative h-80 md:h-96 flex items-center justify-center">
                {/* Decorative boxes */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Box Stack */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Back boxes - stacked effect */}
                    <div className="absolute w-48 h-48 rounded-lg bg-caramel/10 border-2 border-caramel/20 transform -rotate-3 -translate-x-12 -translate-y-12"></div>
                    <div className="absolute w-48 h-48 rounded-lg bg-golden/10 border-2 border-golden/20 transform rotate-2 translate-x-12 translate-y-12"></div>
                    
                    {/* Main promotion box */}
                    <div className="relative w-56 h-56 rounded-xl bg-gradient-to-br from-highlight/30 to-caramel/20 border-2 border-highlight/40 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500 shadow-2xl shadow-highlight/20">
                      <div className="text-center">
                        <p className="text-cream/80 text-sm mb-2">Special Offer</p>
                        <div className="mb-3">
                          <span className="text-5xl font-serif text-highlight">6</span>
                          <p className="text-cream text-sm">Boxes</p>
                        </div>
                        <p className="text-golden text-sm font-semibold">Pay for 5</p>
                        <div className="mt-4 pt-4 border-t border-cream/20">
                          <p className="text-cream/70 text-xs">Ends March 31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Promos */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 rounded-lg border border-chocolate-lighter bg-chocolate-light/30 hover:bg-chocolate-light/50 transition-all duration-300">
            <p className="text-highlight text-sm font-semibold uppercase tracking-wide mb-2">Early Bird Special</p>
            <p className="text-cream font-semibold text-lg mb-1">20% Off Morning Orders</p>
            <p className="text-golden/70 text-sm">Order before 10 AM for fresh-from-the-oven rolls</p>
          </div>
          <div className="p-6 rounded-lg border border-chocolate-lighter bg-chocolate-light/30 hover:bg-chocolate-light/50 transition-all duration-300">
            <p className="text-highlight text-sm font-semibold uppercase tracking-wide mb-2">Flavor Mystery Box</p>
            <p className="text-cream font-semibold text-lg mb-1">₱599 - 6 Surprise Flavors</p>
            <p className="text-golden/70 text-sm">Discover new favorites with our mystery assortment</p>
          </div>
        </div>
      </div>
    </section>
  )
}
