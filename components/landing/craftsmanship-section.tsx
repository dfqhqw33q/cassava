'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const craftItems = [
  {
    title: 'Premium Cassava',
    description: 'Hand-selected fresh cassava from trusted suppliers, ensuring the finest texture and taste in every roll.',
    icon: '🌾'
  },
  {
    title: 'Rich Coconut Filling',
    description: 'Creamy coconut filling made with fresh coconut milk and toasted shredded coconut for authentic flavor.',
    icon: '🥥'
  },
  {
    title: 'Artisan Preparation',
    description: 'Each roll is carefully prepared by hand using time-honored techniques passed down through generations.',
    icon: '🤲'
  },
  {
    title: 'Fresh Baked Daily',
    description: 'Baked fresh every morning to guarantee maximum freshness and the perfect golden exterior.',
    icon: '🔥'
  }
]

export function CraftsmanshipSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      containerRef.current.querySelectorAll('.craft-item').forEach((el) => {
        observer.observe(el)
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-caramel/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-highlight uppercase tracking-widest text-sm font-semibold mb-4">Our Craft</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-bold text-balance mb-6">
            Made with Premium Ingredients & Artisan Care
          </h2>
          <p className="text-golden text-lg max-w-2xl mx-auto">
            Every cassava roll is a testament to our commitment to quality and tradition. We source the finest ingredients and prepare each batch with meticulous attention to detail.
          </p>
        </div>

        {/* Craft Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {craftItems.map((item, index) => (
            <div
              key={index}
              className="craft-item p-8 rounded-lg border border-chocolate-lighter hover:border-highlight transition-all duration-500 bg-chocolate-light/30 backdrop-blur-sm hover:bg-chocolate-light/50 opacity-0"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-5xl mb-4 block">{item.icon}</div>
              <h3 className="font-serif text-xl text-cream font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-golden/90 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-chocolate-light/50 border border-highlight/50">
            <span className="text-highlight text-sm font-semibold">100% Fresh Guarantee</span>
            <div className="w-2 h-2 rounded-full bg-highlight"></div>
            <span className="text-golden text-sm">All rolls baked to order</span>
          </div>
        </div>
      </div>
    </section>
  )
}
