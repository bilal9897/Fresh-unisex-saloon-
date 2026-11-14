import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoClean from '@/assets/logo-clean.webp';

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'about', 'gallery', 'services'];
      const scrollY = window.scrollY + 180;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop) {
          setActiveSection(`#${section}`);
          return;
        }
      }
      setActiveSection('#');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ================= iOS FLOATING GLASS CAPSULE ================= */}
      <header className="fixed top-3 inset-x-3.5 z-50 md:hidden max-w-md mx-auto pointer-events-none">
        <div className="bg-white/85 dark:bg-black/60 backdrop-blur-2xl border border-black/10 dark:border-white/15 rounded-full px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 pointer-events-auto">
          {/* Clean Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#');
            }}
            className="flex items-center shrink-0 active:scale-95 transition-transform"
          >
            <img
              src={logoClean}
              alt="Fresh Unisex Saloon"
              className="h-8 w-auto object-contain filter drop-shadow-sm"
            />
          </a>

          {/* Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-90 transition-all"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Menu className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </header>

      {/* ================= iOS GLASSY MENU ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Blurred background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* iOS Glass Card Sheet */}
            <motion.div
              initial={{ y: -24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              className="relative z-10 pt-20 px-4 pb-6"
            >
              <div className="bg-white/95 dark:bg-black/75 backdrop-blur-3xl border border-black/10 dark:border-white/15 rounded-[28px] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.9)] max-w-sm mx-auto">
                {/* Clean Navigation Links */}
                <nav className="divide-y divide-black/5 dark:divide-white/5 py-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={`block py-3 px-3 rounded-xl text-base transition-all ${
                          isActive
                            ? 'text-white font-semibold bg-white/10 border border-white/20'
                            : 'text-foreground/80 hover:text-foreground active:bg-black/5 dark:active:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>

                {/* Glassy Buttons */}
                <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 space-y-2.5">
                  <a
                    href="#book"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-200 active:bg-neutral-300 text-black text-center text-sm font-semibold backdrop-blur-xl shadow-lg shadow-white/5 active:scale-[0.98] transition-all"
                  >
                    Book Appointment Online
                  </a>

                  <a
                    href="tel:+918197925360"
                    className="block w-full py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white/95 text-center text-xs font-medium tracking-wide backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all"
                  >
                    Call: +91 81979 25360
                  </a>
                </div>

                {/* Location text */}
                <div className="mt-3 text-center text-[11px] text-muted-foreground">
                  Hampankatta, Mangalore
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
