import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="about" className="py-10 sm:py-14 lg:py-20 bg-background relative overflow-hidden">
      {/* Background number (desktop only to keep mobile clean) */}
      <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-[26rem] text-muted/20 select-none pointer-events-none leading-none">
        01
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Visual Showcase - Cinematic Salon Video */}
          <motion.div
            id="salon-tour"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] order-2 lg:order-1 group"
          >
            {/* Salon Tour Video */}
            <video
              ref={videoRef}
              id="salon-tour-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster="/salon-placeholder.webp"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/salon-video.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>

            {/* Top Right Floating Controls (Sound & Play) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-2xl border border-white/20 transition-all active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-2xl border border-white/20 transition-all active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>
            </div>
          </motion.div>

          {/* Content - Modern iOS Card Layout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              About Us
            </p>
            <h2 className="font-serif text-3xl sm:text-headline text-foreground mt-4 mb-4">
              Crafting confidence<br />
              <span className="text-primary italic font-normal">since day one</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
              Located in the heart of Hampankatta, Fresh Unisex Saloon blends master barbering artistry with modern styling trends. Precision haircuts, beard sculpting, and rejuvenating skin care for everyone.
            </p>

            {/* Modern Compact Frosted Bento Highlight Tiles */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Tile 1: 15+ Years */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/15 hover:border-white/25 py-2.5 px-3 sm:py-3 sm:px-3.5 transition-all duration-300 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                <span className="text-[8px] sm:text-[9px] font-sans font-medium uppercase tracking-[0.18em] text-white/40">
                  Experience
                </span>
                <div className="my-0.5 flex items-baseline">
                  <span className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-white">15</span>
                  <span className="text-primary font-light text-base ml-0.5">+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-sans text-white/70">Years Active</span>
              </div>

              {/* Tile 2: 50k+ Clients (Featured Titanium Silver Highlight) */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/35 hover:border-white/50 py-2.5 px-3 sm:py-3 sm:px-3.5 transition-all duration-300 backdrop-blur-2xl shadow-[0_8px_24px_rgba(255,255,255,0.05)] flex flex-col justify-between">
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rounded-full blur-lg pointer-events-none" />
                <span className="text-[8px] sm:text-[9px] font-sans font-medium uppercase tracking-[0.18em] text-primary">
                  Milestone
                </span>
                <div className="my-0.5 flex items-baseline relative z-10">
                  <span className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-white">50k</span>
                  <span className="text-primary font-normal text-base ml-0.5">+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-sans text-white/90 font-medium relative z-10">
                  Happy Clients
                </span>
              </div>

              {/* Tile 3: 6 Master Stylists */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/15 hover:border-white/25 py-2.5 px-3 sm:py-3 sm:px-3.5 transition-all duration-300 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                <span className="text-[8px] sm:text-[9px] font-sans font-medium uppercase tracking-[0.18em] text-white/40">
                  Stylists
                </span>
                <div className="my-0.5 flex items-baseline">
                  <span className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-white">06</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-sans text-white/70">Master Artists</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
