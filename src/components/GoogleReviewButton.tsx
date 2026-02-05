import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CS_Lg-PpHrxEEBM/review';

export function GoogleReviewButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleActivity = () => {
      setIsVisible(true);
      clearTimeout(timeout);

      // Only hide after 3s on mobile
      if (window.innerWidth < 768) {
        timeout = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    // Initial check
    handleActivity();

    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('touchmove', handleActivity);
    window.addEventListener('touchend', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      window.removeEventListener('touchend', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  return (
    <motion.a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-50"
      aria-label="Leave a Google Review"
    >
      <span className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 bg-card/90 backdrop-blur-sm border border-border rounded-full shadow-md hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:scale-105">
        {/* Google G icon */}
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="font-sans text-[10px] md:text-sm font-medium text-foreground">Review on Google</span>
      </span>
    </motion.a>
  );
}
