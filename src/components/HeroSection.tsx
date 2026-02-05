import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

import mobileImage from '@/assets/mobile.png';
import dayImage from '@/assets/day.png';

export function HeroSection() {
  return (
    <section className="relative h-[calc(100svh-56px)] md:h-screen w-full overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image - Cover */}
        <img
          src={heroImage}
          alt="Fresh Unisex Saloon - Premium grooming"
          className="hidden md:block w-full h-full object-cover hero-image"
        />

        {/* Mobile Dark Image (Default) - Fill */}
        <img
          src={mobileImage}
          alt="Fresh Unisex Saloon - Premium grooming"
          className="md:hidden block [.light_&]:hidden w-full h-full object-fill hero-image"
        />

        {/* Mobile Day Image - Fill */}
        <img
          src={dayImage}
          alt="Fresh Unisex Saloon - Premium grooming"
          className="md:hidden hidden [.light_&]:block w-full h-full object-fill hero-image"
        />
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



        </div>

        {/* Mobile info strip - at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="md:hidden space-y-4"
        >






        </motion.div>
      </div>
    </section>
  );
}