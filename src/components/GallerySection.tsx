import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Maximize2, X } from 'lucide-react';
import newGallery1 from '@/assets/new-gallery-1.webp';
import newGallery2 from '@/assets/new-gallery-2.webp';
import newGallery3 from '@/assets/new-gallery-3.webp';

type HomeGalleryItem =
  | { type: 'image'; src: string; title: string }
  | { type: 'video'; src: string; title: string };

const homeItems: HomeGalleryItem[] = [
  {
    type: 'image',
    src: newGallery1,
    title: 'Signature Curly Fade & Texture',
  },
  {
    type: 'image',
    src: newGallery2,
    title: 'Master Scissor & Fade Sculpting',
  },
  {
    type: 'image',
    src: newGallery3,
    title: 'Precision Taper & Back Profile',
  },
  {
    type: 'video',
    src: '/featured-reel.mp4',
    title: 'Signature Salon Transformation Reel',
  },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedItem, setSelectedItem] = useState<HomeGalleryItem | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <section id="gallery" className="pt-6 pb-10 sm:py-14 lg:py-20 bg-background relative overflow-hidden">
      {/* Background number (desktop only) */}
      <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-[26rem] text-muted/20 select-none pointer-events-none leading-none">
        03
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-4 mb-5 sm:mb-8"
        >
          <div>
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-headline text-foreground mt-4">
              Our <span className="text-primary italic font-normal">work</span>
            </h2>
          </div>

          {/* More Button */}
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white/95 font-medium text-xs tracking-wide backdrop-blur-2xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-95 transition-all self-end mb-1"
          >
            <span>More</span>
            <ArrowRight size={13} />
          </Link>
        </motion.div>

        {/* 4 Items Carousel / Grid: 3 Images First + 1 Video Reel */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {homeItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="relative aspect-[4/5] w-[82vw] max-w-[320px] sm:w-auto shrink-0 snap-center rounded-[28px] overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_16px_40px_rgba(0,0,0,0.5)] group cursor-pointer active:scale-[0.98] transition-transform"
            >
              {item.type === 'image' ? (
                <>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle top indicator */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                  </div>
                </>
              ) : (
                <>
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  {/* Reel Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/25 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Reel</span>
                  </div>

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  </div>
                </>
              )}

              {/* Bottom gradient with title (hidden on mobile for pure work photo view) */}
              <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent items-end p-4 pointer-events-none">
                <span className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View More Photos Full Pill */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white/95 font-medium text-xs tracking-wide backdrop-blur-2xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-95 transition-all w-full max-w-xs mx-auto"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal for Image or Video */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedItem(null)}
            />

            {/* Top Close Button & Title */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-20 flex items-center justify-between text-white pointer-events-auto">
              <span className="text-sm font-medium drop-shadow-md">
                {selectedItem.title}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-lg"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Display */}
            {selectedItem.type === 'image' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 max-h-[82vh] max-w-[95vw] sm:max-w-[85vw] flex items-center justify-center pointer-events-auto"
              >
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl sm:rounded-3xl border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.9)]"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-lg aspect-[9/16] sm:aspect-[4/3] max-h-[85vh] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.9)]"
              >
                <video
                  src={selectedItem.src}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
