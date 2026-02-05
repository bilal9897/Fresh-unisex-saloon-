import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import logo from '@/assets/logo.png';

export function MobileHeader() {
  const [isDark, setIsDark] = useState(true);

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
    <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href="#" className="block">
            <img
              src={logo}
              alt="Fresh Unisex Saloon"
              className="h-10 w-auto"
            />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-card border border-border text-foreground hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} strokeWidth={1.5} />
            ) : (
              <Moon size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}