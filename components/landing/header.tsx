"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Flavors", href: "#flavors" },
    { label: "Our Story", href: "#craftsmanship" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Specials", href: "#promotions" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-chocolate/95 backdrop-blur-md py-3 shadow-lg shadow-chocolate/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center border border-golden/30 group-hover:bg-golden/30 transition-colors duration-300">
            <span className="font-serif text-golden text-lg font-bold">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-cream text-xl tracking-wide">
              Cassava Roll Co.
            </span>
            <span className="text-golden/70 text-[10px] uppercase tracking-[0.2em] -mt-0.5">
              Premium Desserts
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-cream/80 hover:text-golden text-sm tracking-wide transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-golden group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button className="bg-highlight hover:bg-highlight/90 text-chocolate font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-highlight/25">
            Order Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-chocolate/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-cream/80 hover:text-golden text-lg tracking-wide transition-colors duration-300 py-2 border-b border-chocolate-lighter/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="bg-highlight hover:bg-highlight/90 text-chocolate font-semibold px-6 py-3 rounded-full mt-4">
            Order Now
          </Button>
        </nav>
      </div>
    </header>
  )
}
