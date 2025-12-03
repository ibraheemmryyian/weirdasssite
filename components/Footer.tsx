import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  const links = {
    shop: ['New Arrivals', 'Best Sellers', 'Collections', 'Gift Cards'],
    about: ['Our Story', 'Sustainability', 'Careers', 'Press'],
    support: ['Contact Us', 'Shipping', 'Returns', 'Size Guide'],
  };

  return (
    <footer className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden bg-gray-100" id="contact">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-wider mb-3 sm:mb-4">
              ESCAPISM
            </div>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-sm text-sm sm:text-base">
              Contemporary fashion that blends timeless elegance with modern design. Discover your style.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center
                             text-gray-600 hover:text-gray-900 hover:border-gray-400
                             hover:bg-gray-50 transition-all duration-300
                             hover:scale-110 hover:-translate-y-1
                             focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections - Mobile optimized */}
          <div className="space-y-6 sm:space-y-0">
            <div>
              <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 tracking-wide text-sm sm:text-base">SHOP</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.shop.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:hidden">
              <h3 className="text-gray-900 font-semibold mb-3 tracking-wide text-sm">ABOUT</h3>
              <ul className="space-y-2">
                {links.about.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden sm:block">
            <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 tracking-wide">ABOUT</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.about.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4 tracking-wide text-sm sm:text-base">SUPPORT</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-8 sm:mb-12 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">STAY UPDATED</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Subscribe for exclusive releases</p>
              </div>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-gray-200
                         text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20
                         focus:border-gray-400 transition-all duration-300
                         flex-1 lg:w-64 text-sm sm:text-base"
              />
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-900 text-white font-semibold transition-all duration-300
                               hover:scale-105 hover:shadow-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-900/20
                               touch-manipulation text-sm sm:text-base min-w-[100px]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 sm:pt-8 border-t border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © 2024 ESCAPISM. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
