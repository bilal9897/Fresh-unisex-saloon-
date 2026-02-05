import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import logo from '@/assets/logo.png';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
      <div className={`px-6 lg:px-12 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
        } ${isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
          : 'bg-background/80 backdrop-blur-sm'
        }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <img
              src={logo}
              alt="Fresh Unisex Saloon"
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'
                }`}
            />
          </a>

          {/* Desktop Nav */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[11px] uppercase tracking-ultra text-foreground/70 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground/70 hover:text-primary transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}