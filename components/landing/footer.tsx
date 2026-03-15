'use client'

import { Heart, MapPin, Mail, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-chocolate-lighter border-t border-chocolate/50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-highlight/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <h3 className="font-serif text-2xl text-cream font-bold">
                  Cassava Roll Co.
                </h3>
                <p className="text-golden text-sm mt-2">Premium Filipino Desserts</p>
              </div>
              <p className="text-cream/70 text-sm mb-6 leading-relaxed">
                Crafting artisan cassava rolls with premium ingredients and generations of tradition.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-chocolate/50 hover:bg-highlight/50 transition-colors flex items-center justify-center text-cream hover:text-chocolate">
                  <span className="text-lg">f</span>
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-chocolate/50 hover:bg-highlight/50 transition-colors flex items-center justify-center text-cream hover:text-chocolate">
                  <span className="text-lg">📷</span>
                </a>
                <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-chocolate/50 hover:bg-highlight/50 transition-colors flex items-center justify-center text-cream hover:text-chocolate">
                  <span className="text-lg">🎵</span>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-cream font-semibold text-lg mb-6">Products</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Classic Cassava Roll</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Ube Cassava Roll</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Pandan Cassava Roll</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Strawberry Cassava Roll</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Mystery Box</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-cream font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Our Story</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Sourcing</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Sustainability</a></li>
                <li><a href="#" className="text-cream/70 hover:text-highlight transition-colors text-sm">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-cream font-semibold text-lg mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-highlight mt-0.5 flex-shrink-0" />
                  <a href="mailto:hello@cassavarollco.com" className="text-cream/70 hover:text-highlight transition-colors text-sm">
                    hello@cassavarollco.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-highlight mt-0.5 flex-shrink-0" />
                  <a href="tel:+639171234567" className="text-cream/70 hover:text-highlight transition-colors text-sm">
                    +63 (917) 123-4567
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-highlight mt-0.5 flex-shrink-0" />
                  <p className="text-cream/70 text-sm">
                    Manila, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-chocolate/50 py-8 md:py-12">
            {/* Newsletter Signup */}
            <div className="mb-8 md:mb-0">
              <h4 className="text-cream font-semibold mb-4">Subscribe to Our Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-chocolate/30 border border-chocolate-lighter text-cream placeholder:text-cream/40 focus:outline-none focus:border-highlight transition-colors"
                />
                <button className="px-6 py-3 rounded-lg bg-highlight hover:bg-highlight/90 text-chocolate font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-highlight/30 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-cream/50 text-xs mt-2">Get exclusive offers and baking tips delivered to your inbox.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-chocolate/50 px-4 md:px-8 py-8 md:py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-cream/60 text-sm">
              &copy; {currentYear} Cassava Roll Co. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-cream/60 hover:text-highlight transition-colors">Privacy Policy</a>
              <span className="text-chocolate">•</span>
              <a href="#" className="text-cream/60 hover:text-highlight transition-colors">Terms of Service</a>
              <span className="text-chocolate">•</span>
              <a href="#" className="text-cream/60 hover:text-highlight transition-colors">Shipping Info</a>
            </div>
            <p className="text-cream/60 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="fill-highlight text-highlight" /> in Manila
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
