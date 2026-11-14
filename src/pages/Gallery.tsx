import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Maximize2, Play, Film, Image as ImageIcon } from 'lucide-react';
import { Footer } from '@/components/Footer';

import newGallery1 from '@/assets/new-gallery-1.webp';
import newGallery2 from '@/assets/new-gallery-2.webp';
import newGallery3 from '@/assets/new-gallery-3.webp';
import gallery1 from '@/assets/gallery-1.webp';
import gallery2 from '@/assets/gallery-2.webp';
import gallery3 from '@/assets/gallery-3.webp';

interface PhotoItem {
  type: 'photo';
  src: string;
  title: string;
  category: string;
}

interface VideoItem {
  type: 'video';
  src: string;
  title: string;
  category: string;
}

type GalleryItem = PhotoItem | VideoItem;

const galleryPhotos: PhotoItem[] = [
  { type: 'photo', src: newGallery1, title: 'Signature Haircut & Styling', category: 'Haircut' },
  { type: 'photo', src: newGallery2, title: 'Master Beard Sculpting', category: 'Beard' },
  { type: 'photo', src: newGallery3, title: 'Modern Texture & Fade', category: 'Styling' },
  { type: 'photo', src: gallery1, title: 'Precision Hair Styling', category: 'Styling' },
  { type: 'photo', src: gallery2, title: 'Beard Sculpting & Trim', category: 'Beard' },
  { type: 'photo', src: gallery3, title: 'Colour & Texture Treatment', category: 'Hair' },
];

const galleryVideos: VideoItem[] = [
  { type: 'video', src: '/featured-reel.mp4', title: 'Signature Cut & Styling Reel', category: 'Reel' },
  { type: 'video', src: '/salon-reel-1.mp4', title: 'Fade & Hair Sculpting Transformation', category: 'Reel' },
  { type: 'video', src: '/salon-reel-2.mp4', title: 'Precision Styling & Hair Cut Reel', category: 'Reel' },
  { type: 'video', src: '/salon-reel-3.mp4', title: 'Master Beard Grooming Reel', category: 'Reel' },
  { type: 'video', src: '/salon-reel-4.mp4', title: 'Salon Ambience & Client Experience', category: 'Reel' },
  { type: 'video', src: '/salon-reel-5.mp4', title: 'Fresh Saloon Master Groomers', category: 'Reel' },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const goToNextPhoto = () => {
    setSwipeDirection('left');
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : null));
  };

  const goToPrevPhoto = () => {
    setSwipeDirection('right');
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only trigger if horizontal swipe is prominent and larger than vertical swipe
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goToNextPhoto();
      } else {
        goToPrevPhoto();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const displayedItems: GalleryItem[] =
    activeTab === 'all'
      ? [...galleryPhotos, ...galleryVideos]
      : activeTab === 'photos'
      ? galleryPhotos
      : galleryVideos;

  // Keyboard navigation for full screen photo viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex !== null) {
        if (e.key === 'Escape') setSelectedPhotoIndex(null);
        if (e.key === 'ArrowRight') {
          goToNextPhoto();
        }
        if (e.key === 'ArrowLeft') {
          goToPrevPhoto();
        }
      }
      if (selectedVideoUrl !== null && e.key === 'Escape') {
        setSelectedVideoUrl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, selectedVideoUrl]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedPhotoIndex !== null || selectedVideoUrl !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex, selectedVideoUrl]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-3.5">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white/95 text-xs font-medium backdrop-blur-2xl transition-all active:scale-95 shadow-sm"
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </Link>

            <span className="font-serif text-lg sm:text-xl text-foreground font-semibold">
              Fresh<span className="text-primary italic font-normal">.</span>
            </span>

            <a
              href="tel:+918197925360"
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white/95 text-xs font-medium backdrop-blur-2xl transition-all active:scale-95 shadow-sm"
            >
              Book
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 sm:pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          {/* Page Heading */}
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent justify-center">
              Our Portfolio
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 tracking-tight">
              Work <span className="text-primary italic font-normal">Gallery</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
              Explore our master haircuts, precision beard sculpts, video reels, and salon ambiance. Tap any item to view in full screen.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 border backdrop-blur-2xl ${
                  activeTab === 'all'
                    ? 'bg-white text-black border-white shadow-md font-semibold'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/90'
                }`}
              >
                All ({galleryPhotos.length + galleryVideos.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 border backdrop-blur-2xl ${
                  activeTab === 'photos'
                    ? 'bg-white text-black border-white shadow-md font-semibold'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/90'
                }`}
              >
                <ImageIcon size={13} />
                <span>Photos ({galleryPhotos.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('videos')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 border backdrop-blur-2xl ${
                  activeTab === 'videos'
                    ? 'bg-white text-black border-white shadow-md font-semibold'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/90'
                }`}
              >
                <Film size={13} />
                <span>Reels ({galleryVideos.length})</span>
              </button>
            </div>
          </div>

          {/* 2-Column Grid (2 img in one row) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-4xl mx-auto">
            {displayedItems.map((item, index) => {
              if (item.type === 'photo') {
                const photoIdx = galleryPhotos.findIndex((p) => p.src === item.src);
                return (
                  <motion.div
                    key={`photo-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    onClick={() => setSelectedPhotoIndex(photoIdx)}
                    className="group relative aspect-[4/5] rounded-[20px] sm:rounded-[28px] overflow-hidden border border-white/15 bg-card cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Bottom title gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-3 sm:p-4">
                      <span className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
                        {item.title}
                      </span>
                    </div>

                    {/* Top zoom indicator pill */}
                    <div className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white/90 shadow-md">
                      <Maximize2 size={13} />
                    </div>
                  </motion.div>
                );
              }

              // Video reel card
              return (
                <motion.div
                  key={`video-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={() => setSelectedVideoUrl(item.src)}
                  className="group relative aspect-[4/5] rounded-[20px] sm:rounded-[28px] overflow-hidden border border-white/15 bg-neutral-950 cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all"
                >
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />

                  {/* Video Reel Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Reel</span>
                  </div>

                  {/* Top expand indicator pill */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white/90 shadow-md">
                    <Maximize2 size={13} />
                  </div>

                  {/* Play icon overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom title gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3 sm:p-4 pointer-events-none">
                    <span className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
                      {item.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ================= FULL SCREEN PHOTO LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl touch-pan-y select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Click backdrop to close */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedPhotoIndex(null)}
            />

            {/* Top Bar with title, count, and close button */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-20 flex items-center justify-between text-white pointer-events-auto">
              <div>
                <h4 className="text-sm sm:text-base font-semibold drop-shadow-md">
                  {galleryPhotos[selectedPhotoIndex].title}
                </h4>
                <span className="text-xs text-white/65">
                  {selectedPhotoIndex + 1} of {galleryPhotos.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-lg"
                aria-label="Close full screen"
              >
                <X size={20} />
              </button>
            </div>

            {/* Full Screen Image with touch & mouse drag swiping */}
            <motion.div
              key={selectedPhotoIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -35 || info.velocity.x < -250) {
                  goToNextPhoto();
                } else if (info.offset.x > 35 || info.velocity.x > 250) {
                  goToPrevPhoto();
                }
              }}
              initial={{
                opacity: 0,
                x: swipeDirection === 'left' ? 60 : swipeDirection === 'right' ? -60 : 0,
                scale: 0.96,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: swipeDirection === 'left' ? -60 : swipeDirection === 'right' ? 60 : 0,
                scale: 0.96,
              }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative z-10 max-h-[78vh] max-w-[95vw] sm:max-w-[85vw] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <img
                src={galleryPhotos[selectedPhotoIndex].src}
                alt={galleryPhotos[selectedPhotoIndex].title}
                draggable={false}
                className="max-h-[74vh] w-auto max-w-full object-contain rounded-2xl sm:rounded-3xl border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.9)] pointer-events-none select-none"
              />
            </motion.div>

            {/* Previous Photo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevPhoto();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNextPhoto();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>

            {/* Bottom Dots & Swipe Hint */}
            <div className="absolute bottom-5 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 pointer-events-auto">
                {galleryPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSwipeDirection(idx > selectedPhotoIndex ? 'left' : 'right');
                      setSelectedPhotoIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      selectedPhotoIndex === idx
                        ? 'w-5 bg-primary'
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-white/50 font-sans tracking-wider uppercase sm:hidden">
                Swipe left / right to browse
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FULL SCREEN VIDEO LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedVideoUrl !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl">
            {/* Click backdrop to close */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedVideoUrl(null)}
            />

            <div className="absolute top-4 right-4 sm:right-8 z-20">
              <button
                type="button"
                onClick={() => setSelectedVideoUrl(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all shadow-lg"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-lg aspect-[9/16] sm:aspect-[4/3] max-h-[85vh] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.9)]"
            >
              <video
                src={selectedVideoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
