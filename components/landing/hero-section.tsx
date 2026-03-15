"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate via-chocolate/95 to-chocolate">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-caramel/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-golden/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-highlight/10 rounded-full blur-[80px]" />
        </div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFF4E6' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-chocolate-light/50 border border-golden/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-golden animate-pulse" />
              <span className="text-golden text-sm tracking-wider uppercase">
                Freshly Baked Daily
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-tight text-balance">
              Artisan Cassava Rolls,{" "}
              <span className="text-golden italic">Perfected</span>
            </h1>

            {/* Description */}
            <p className="text-cream/70 text-lg md:text-xl leading-relaxed max-w-xl">
              Experience the timeless tradition of Filipino dessert craftsmanship. 
              Each roll is handmade with premium cassava and filled with our 
              signature coconut filling.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-highlight hover:bg-highlight/90 text-chocolate font-semibold px-8 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-highlight/30 group"
              >
                Order Now
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-golden/40 text-golden hover:bg-golden/10 hover:text-golden px-8 py-6 rounded-full text-lg transition-all duration-300 hover:border-golden"
              >
                Explore Flavors
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-chocolate-lighter/50">
              <div>
                <p className="text-3xl font-serif text-golden">10K+</p>
                <p className="text-cream/50 text-sm">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-chocolate-lighter" />
              <div>
                <p className="text-3xl font-serif text-golden">4.9</p>
                <p className="text-cream/50 text-sm">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-chocolate-lighter" />
              <div>
                <p className="text-3xl font-serif text-golden">4</p>
                <p className="text-cream/50 text-sm">Signature Flavors</p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Visual */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            {/* Main Product Image Container */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-golden/20 via-highlight/10 to-caramel/20 rounded-full blur-3xl scale-75" />
              
              {/* Decorative ring */}
              <div className="absolute inset-8 border border-golden/20 rounded-full animate-[spin_30s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-golden rounded-full" />
              </div>
              
              {/* Product showcase circle */}
              <div className="absolute inset-16 bg-gradient-to-br from-chocolate-light to-chocolate rounded-full border border-golden/30 flex items-center justify-center overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-highlight/20 to-transparent" />
                
                {/* Product imagery placeholder */}
                <div className="relative z-10 text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-golden/40 to-caramel/30 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-20 h-20"
                      fill="none"
                    >
                      {/* Stylized cassava roll icon */}
                      <ellipse cx="50" cy="50" rx="40" ry="25" fill="url(#rollGradient)" />
                      <ellipse cx="50" cy="50" rx="35" ry="20" fill="url(#innerGradient)" />
                      <ellipse cx="50" cy="50" rx="15" ry="8" fill="#FFF4E6" opacity="0.6" />
                      <defs>
                        <linearGradient id="rollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E6B980" />
                          <stop offset="100%" stopColor="#C87A2B" />
                        </linearGradient>
                        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4A574" />
                          <stop offset="100%" stopColor="#8B5A3C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="font-serif text-golden text-xl">Premium Quality</p>
                  <p className="text-cream/60 text-sm mt-1">Handcrafted with love</p>
                </div>
              </div>

              {/* Floating flavor badges */}
              <div className="absolute -left-4 top-1/3 bg-chocolate-light/90 backdrop-blur-sm border border-golden/30 rounded-2xl px-4 py-3 animate-bounce-slow shadow-xl">
                <p className="text-golden font-serif text-sm">Ube</p>
              </div>
              <div className="absolute -right-4 top-1/2 bg-chocolate-light/90 backdrop-blur-sm border border-golden/30 rounded-2xl px-4 py-3 animate-bounce-slow animation-delay-500 shadow-xl">
                <p className="text-golden font-serif text-sm">Pandan</p>
              </div>
              <div className="absolute left-8 bottom-8 bg-chocolate-light/90 backdrop-blur-sm border border-golden/30 rounded-2xl px-4 py-3 animate-bounce-slow animation-delay-1000 shadow-xl">
                <p className="text-golden font-serif text-sm">Classic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-cream/40 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-golden/60" />
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
