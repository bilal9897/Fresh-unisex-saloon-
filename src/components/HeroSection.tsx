import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '@/assets/hero-image.webp';
import mobileHeroImage from '@/assets/mobile-hero.webp';

export function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return (
    <section className="relative h-[100svh] min-h-[620px] md:h-screen w-full overflow-hidden bg-background">
      {/* Background Images & Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image - Cover */}
        <div className="hidden md:block w-full h-full relative">
          <img
            src={heroImage}
            alt="Fresh Unisex Saloon - Premium grooming"
            className="w-full h-full object-cover hero-image"
          />
          <div className="absolute inset-0 bg-background/20 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />
        </div>

        {/* Mobile Hero Image - Clean Real Photo without blur or dark fog */}
        <div className="md:hidden w-full h-full relative">
          <img
            src={mobileHeroImage}
            alt="Fresh Unisex Saloon - Premium grooming"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Desktop left vertical location badge */}
      <div className="hidden lg:block absolute left-8 bottom-32 z-20">
        <span className="vertical-text font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
          Hampankatta • Mangalore
        </span>
      </div>

      {/* ================= EDITORIAL HERO SECTION (Mobile) ================= */}
      <div className="relative z-20 md:hidden h-full flex flex-col justify-between px-5 pt-[38vh] sm:pt-[36vh] pb-8 pointer-events-none">
        {/* Content pushed cleanly onto the center of the dark leather wall */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm mx-auto text-left pointer-events-auto"
        >
          {/* Micro Tag with Silver and Dark Brown */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px bg-[#8C532B]" />
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-zinc-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Look Good <span className="text-[#C68A57] font-semibold">• Feel Fresh</span>
            </span>
          </div>

          {/* Headline with Dark Silver mixed with White & Rich Dark Brown Cursive */}
          <h1 className="tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            <span className="block text-[40px] sm:text-[46px] font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#71717A] via-[#3F3F46] to-[#E2E8F0] tracking-tight leading-[1.0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              Fresh Look,
            </span>
            <span className="block font-cursive text-7xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#C68A57] via-[#94582E] to-[#5C3214] drop-shadow-[0_2px_16px_rgba(92,50,20,0.5)] -mt-3 sm:-mt-4 pb-0.5 leading-[0.9]">
              Every Day.
            </span>
          </h1>

          {/* Subtitle with Dark Silver Metallic Accent */}
          <p className="text-sm sm:text-[15px] text-zinc-300 font-light mt-1.5 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-[290px]">
            Precision grooming & modern styling <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#F1F5F9] via-[#A1A1AA] to-[#71717A]">crafted for everyone.</span>
          </p>
        </motion.div>

        {/* Action buttons pushed to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm mx-auto pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 w-full">
            <a
              href="#book"
              className="flex-1 inline-flex items-center justify-center py-3.5 px-5 rounded-full bg-black/75 hover:bg-black/85 active:bg-black/90 text-white font-medium text-xs sm:text-sm tracking-wide backdrop-blur-2xl border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.3)] active:scale-95 transition-all text-center"
            >
              Book Appointment
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white/95 font-medium text-xs sm:text-sm tracking-wide backdrop-blur-2xl border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.5)] active:scale-95 transition-all text-center"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>

      {/* ================= DESKTOP HERO CONTENT ================= */}
      <div className="hidden md:flex relative z-20 h-full flex-col justify-center pt-12 lg:pt-16 px-6 lg:px-24 xl:px-32 2xl:px-40">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-[10px] uppercase tracking-ultra text-primary mb-6"
          >
            Professional Grooming
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif tracking-tight mb-8 hero-text"
          >
            <span className="block text-foreground text-7xl lg:text-8xl xl:text-9xl leading-[0.85]">
              Fresh
            </span>
            <span className="block text-primary italic font-normal text-7xl lg:text-8xl xl:text-9xl leading-[0.85] mt-2">
              Unisex
            </span>
            <span className="block text-foreground text-7xl lg:text-8xl xl:text-9xl leading-[0.85] mt-2">
              Saloon
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-sans text-base text-foreground/75 max-w-md mb-8 leading-snug"
          >
            Where precision meets artistry.<br />
            Grooming crafted for the modern individual.<br />
            15+ years of expertise. Trusted by 50k+ happy clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center gap-8"
          >
            <a
              href="#book"
              className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-ultra text-foreground hover:text-primary transition-colors duration-500"
            >
              <span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500" />
              Book Appointment
            </a>
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="font-sans text-xs uppercase tracking-ultra text-foreground/75 hover:text-primary transition-colors flex items-center gap-2"
            >
              <span>Watch Tour</span>
            </button>
            <a
              href="tel:+918197925360"
              className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              +91 81979 25360
            </a>
          </motion.div>
        </div>
      </div>

      {/* ================= iOS CINEMATIC VIDEO LIGHTBOX ================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative z-10 w-full max-w-xl aspect-[9/16] sm:aspect-[4/3] max-h-[85vh] bg-black/95 rounded-[28px] overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-center"
            >
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-xl border border-white/20 active:scale-90 transition-all text-sm font-semibold shadow-lg"
                  aria-label="Close video"
                >
                  ✕
                </button>
              </div>

              <video
                src="/salon-video.mp4"
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
