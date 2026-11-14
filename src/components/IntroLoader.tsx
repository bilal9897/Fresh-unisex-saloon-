import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import freshLogo from '@/assets/fresh-logo.png';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast 0 to 100 counter (1 second total for a snappy, fast feel)
    const startTime = performance.now();
    const duration = 1000;

    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Smooth accelerating ease curve
      const easedProgress = Math.round(
        (1 - Math.pow(1 - progressFraction, 2.4)) * 100
      );

      setProgress(easedProgress);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete?.();
          }, 450);
        }, 120);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09)_0%,transparent_65%)] pointer-events-none" />

          {/* Centered Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm">
            {/* Salon Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-7"
            >
              <img
                src={freshLogo}
                alt="Fresh Unisex Saloon Logo"
                className="w-48 sm:w-56 h-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)] filter brightness-105"
              />
            </motion.div>

            {/* Fast 0 to 100 Loading Bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="w-44 sm:w-52 flex flex-col items-center gap-2.5"
            >
              {/* Loading Bar Track */}
              <div className="w-full h-[3.5px] bg-white/10 rounded-full overflow-hidden p-[0.5px]">
                <div
                  className="h-full bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Count */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-wider text-white/50">
                <span className="uppercase text-[9px] tracking-widest text-primary/80 font-sans font-medium">
                  Loading
                </span>
                <span className="text-white/80 font-semibold tabular-nums">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
