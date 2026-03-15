'use client'

import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Santos',
    location: 'Manila, Philippines',
    rating: 5,
    quote: 'These cassava rolls are absolutely divine! The texture is perfect, and the flavors are so authentic. I order them for every special occasion.',
    avatar: '👩'
  },
  {
    name: 'James Chen',
    location: 'Singapore',
    rating: 5,
    quote: 'I discovered Cassava Roll Co. by chance and now I am a loyal customer. The quality and freshness are unmatched. Highly recommend!',
    avatar: '👨'
  },
  {
    name: 'Sofia Martinez',
    location: 'Los Angeles, USA',
    rating: 5,
    quote: 'Shipped to LA and they arrived fresh and delicious. The ube flavor is my favorite—creamy and perfectly balanced. Worth every penny.',
    avatar: '👩'
  },
  {
    name: 'David Reyes',
    location: 'Cebu, Philippines',
    rating: 5,
    quote: 'Finally, a cassava roll producer that takes pride in their craft. Each roll is consistently excellent. This is the real deal.',
    avatar: '👨'
  }
]

export function TestimonialsSection() {
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
      containerRef.current.querySelectorAll('.testimonial-card').forEach((el) => {
        observer.observe(el)
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden bg-chocolate-light/30">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-caramel/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-golden/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-highlight uppercase tracking-widest text-sm font-semibold mb-4">Customer Love</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream font-bold text-balance mb-6">
            Loved by Dessert Enthusiasts Everywhere
          </h2>
          <p className="text-golden text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have experienced the magic of our artisan cassava rolls.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card p-8 rounded-lg border border-chocolate-lighter bg-chocolate-light/40 backdrop-blur-sm hover:border-golden transition-all duration-500 opacity-0 hover:bg-chocolate-light/60"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-highlight text-highlight"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-cream text-sm leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="text-cream font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-golden/70 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-highlight/20 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="text-cream font-semibold">4.9/5 Rating</p>
              <p className="text-golden/70 text-sm">Based on 1,200+ reviews</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-chocolate-lighter"></div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center">
              <span className="text-2xl">🚚</span>
            </div>
            <div>
              <p className="text-cream font-semibold">Free Shipping</p>
              <p className="text-golden/70 text-sm">On orders over ₱500</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
