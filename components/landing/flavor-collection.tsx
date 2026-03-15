"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"

const flavors = [
  {
    id: 1,
    name: "Classic Cassava Roll",
    description: "Our signature creation featuring golden cassava wrapped around rich, creamy coconut filling. A timeless Filipino favorite.",
    price: 280,
    rating: 4.9,
    reviews: 324,
    color: "from-amber-600/20 to-amber-800/20",
    accentColor: "#E6B980",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Ube Cassava Roll",
    description: "Purple yam-infused cassava with a delicate sweetness and signature violet hue. An elegant twist on tradition.",
    price: 320,
    rating: 4.9,
    reviews: 256,
    color: "from-purple-600/20 to-purple-800/20",
    accentColor: "#9333EA",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Pandan Cassava Roll",
    description: "Fragrant pandan-scented cassava with hints of vanilla and coconut. A tropical paradise in every bite.",
    price: 300,
    rating: 4.8,
    reviews: 198,
    color: "from-emerald-600/20 to-emerald-800/20",
    accentColor: "#10B981",
    badge: "New",
  },
  {
    id: 4,
    name: "Strawberry Cassava Roll",
    description: "Sweet strawberry-kissed cassava with a beautiful blush color. Perfect for those who love fruity desserts.",
    price: 340,
    rating: 4.8,
    reviews: 167,
    color: "from-rose-600/20 to-rose-800/20",
    accentColor: "#F43F5E",
    badge: "Limited",
  },
]

export function FlavorCollection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="flavors" className="py-24 bg-chocolate relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-caramel/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-golden/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-golden uppercase tracking-[0.25em] text-sm mb-4">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 text-balance">
            Signature Flavors
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed">
            Each flavor tells a story of tradition, crafted with the finest ingredients 
            to bring you an unforgettable dessert experience.
          </p>
        </div>

        {/* Flavor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flavors.map((flavor, index) => (
            <div
              key={flavor.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(flavor.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div
                className={`relative bg-chocolate-light rounded-3xl overflow-hidden transition-all duration-500 border border-chocolate-lighter hover:border-golden/40 ${
                  hoveredCard === flavor.id ? "scale-[1.02] shadow-2xl" : ""
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium bg-chocolate/80 backdrop-blur-sm border"
                    style={{
                      color: flavor.accentColor,
                      borderColor: `${flavor.accentColor}40`,
                    }}
                  >
                    {flavor.badge}
                  </span>
                </div>

                {/* Product Image Area */}
                <div className={`relative h-56 bg-gradient-to-br ${flavor.color} overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 120%, ${flavor.accentColor}40, transparent 70%)`,
                    }}
                  />
                  
                  {/* Product visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-32 h-32 rounded-full transition-all duration-500 flex items-center justify-center ${
                        hoveredCard === flavor.id ? "scale-110" : ""
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${flavor.accentColor}60, ${flavor.accentColor}20)`,
                        boxShadow: `0 20px 40px ${flavor.accentColor}30`,
                      }}
                    >
                      <svg viewBox="0 0 60 60" className="w-16 h-16">
                        <ellipse cx="30" cy="30" rx="24" ry="15" fill={flavor.accentColor} opacity="0.8" />
                        <ellipse cx="30" cy="30" rx="18" ry="10" fill="#FFF4E6" opacity="0.3" />
                        <ellipse cx="30" cy="30" rx="8" ry="4" fill="#FFF4E6" opacity="0.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Floating particles */}
                  <div
                    className={`absolute w-3 h-3 rounded-full top-8 right-12 transition-opacity duration-300 ${
                      hoveredCard === flavor.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: `${flavor.accentColor}80` }}
                  />
                  <div
                    className={`absolute w-2 h-2 rounded-full bottom-12 left-8 transition-opacity duration-300 delay-100 ${
                      hoveredCard === flavor.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: `${flavor.accentColor}60` }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-golden text-golden"
                        />
                      ))}
                    </div>
                    <span className="text-cream/50 text-sm">
                      {flavor.rating} ({flavor.reviews})
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-serif text-xl text-cream group-hover:text-golden transition-colors duration-300">
                    {flavor.name}
                  </h3>

                  {/* Description */}
                  <p className="text-cream/50 text-sm leading-relaxed line-clamp-2">
                    {flavor.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-chocolate-lighter">
                    <div>
                      <span className="text-cream/40 text-xs">Starting at</span>
                      <p className="text-golden font-serif text-2xl">
                        ₱{flavor.price}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-highlight/20 hover:bg-highlight text-highlight hover:text-chocolate border border-highlight/30 hover:border-highlight rounded-full px-4 transition-all duration-300"
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-golden/30 text-golden hover:bg-golden/10 hover:border-golden rounded-full px-10 py-6 text-lg transition-all duration-300"
          >
            View All Flavors
          </Button>
        </div>
      </div>
    </section>
  )
}
