import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export function HeroSection() {
  return (
    <section className="relative h-[calc(100svh-56px)] md:h-screen w-full overflow-hidden grain">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh Unisex Saloon - Premium grooming"
          className="w-full h-full object-cover hero-image"
        />
        {/* Enhanced gradient overlay - stronger at top for text contrast */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background/40 dark:from-background/80 dark:via-background/40 dark:to-background/60 lg:dark:from-background/60" />
      </div>

      {/* Left vertical text */}
      <div className="hidden lg:block absolute left-8 bottom-32 z-20">
        <span className="vertical-text font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
          Hampankatta • Mangalore
        </span>
      </div>

      {/* Content - spread across height on mobile */}
      <div className="relative z-20 h-full flex flex-col justify-between pt-20 pb-6 md:justify-center md:pt-20 md:pb-0 px-6 lg:px-24 lg:justify-start lg:pt-32 xl:px-32 xl:pt-40 2xl:px-40">
        {/* Main content group */}
        <div className="md:flex-1 md:flex md:flex-col md:justify-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-[9px] md:text-[10px] uppercase tracking-ultra text-primary mb-4 md:mb-8 lg:mb-10 xl:mb-12"
          >
            Professional Grooming
          </motion.p>

          {/* Main Headline - Tighter spacing on mobile */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif tracking-tight mb-5 md:mb-10 hero-text"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block text-foreground text-[3.25rem] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] md:leading-[0.85] lg:leading-[0.78] xl:leading-[0.75]"
            >
              Fresh
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block text-primary italic font-normal text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] leading-[0.9] md:leading-[0.85] lg:leading-[0.78] xl:leading-[0.75] mt-2 lg:mt-3 xl:mt-4"
            >
              Unisex
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="block text-foreground text-[3.25rem] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] md:leading-[0.85] lg:leading-[0.78] xl:leading-[0.75] mt-2 lg:mt-3 xl:mt-4"
            >
              Saloon
            </motion.span>
          </motion.h1>

          {/* Subtext - More content on mobile */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-sans text-[13px] md:text-base text-foreground/70 max-w-xs md:max-w-md mb-6 md:mb-12 lg:mb-16 xl:mb-20 leading-snug"
          >
            Where precision meets artistry.<br />
            Grooming crafted for the modern individual.<br />
            15+ years of expertise.<br />
            Trusted by 50k+ happy clients.
          </motion.p>

          {/* CTA - Stacked on mobile for better tap targets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8 lg:gap-12 mt-4 md:mt-0"
          >
            <a
              href="#book"
              className="group inline-flex items-center gap-3 md:gap-4 lg:gap-6 font-sans text-[11px] lg:text-[12px] xl:text-[13px] uppercase tracking-ultra text-foreground hover:text-primary transition-colors duration-500"
            >
              <span className="w-10 md:w-12 lg:w-16 xl:w-20 h-px bg-primary group-hover:w-16 md:group-hover:w-20 lg:group-hover:w-24 xl:group-hover:w-28 transition-all duration-500" />
              Book Appointment
            </a>
            <a
              href="tel:+918197925360"
              className="font-sans text-sm text-foreground/60 hover:text-foreground transition-colors pl-[52px] md:pl-0"
            >
              +91 81979 25360
            </a>
          </motion.div>
        </div>

        {/* Mobile info strip - at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="md:hidden space-y-4"
        >
          {/* Stats row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-sans text-xs text-foreground/70">500+ Happy Clients</span>
          </div>

          {/* Info row */}
          <div className="flex items-center gap-6 border-t border-border/30 pt-4">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-ultra text-primary mb-1">Location</p>
              <p className="font-sans text-xs text-foreground/70">Hampankatta, Mangalore</p>
            </div>
            <div className="w-px h-8 bg-border/30" />
            <div>
              <p className="font-sans text-[9px] uppercase tracking-ultra text-primary mb-1">Hours</p>
              <p className="font-sans text-xs text-foreground/70">9AM – 9PM Daily</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}