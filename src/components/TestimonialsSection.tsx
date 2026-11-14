import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "The best haircut I've ever had. The attention to detail is remarkable, and the ambiance makes you feel like you're getting a true luxury experience.",
    author: "Rahul Shetty",
    tag: "Regular Client",
    rating: "★★★★★",
  },
  {
    quote: "Fresh Saloon has been my go-to for years. Their hair smoothening treatment transformed my hair completely. Highly recommend their stylists!",
    author: "Priya Nair",
    tag: "Hair Treatment",
    rating: "★★★★★",
  },
  {
    quote: "Professional service, master barbers, and they understand modern styles without any hassle. Worth every rupee.",
    author: "Avinash Kumar",
    tag: "Beard & Haircut",
    rating: "★★★★★",
  },
  {
    quote: "Best unisex salon in Mangalore! Got my hair styling and beard sculpting done here. Exceptional team and top hygiene.",
    author: "Sneha Alva",
    tag: "Styling & Grooming",
    rating: "★★★★★",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 4000);
  };

  const scrollNext = () => {
    handleInteraction();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const scrollPrev = () => {
    handleInteraction();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Continuous auto-rotation every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteractingRef.current) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Reviews
            </p>
            <h2 className="font-serif text-3xl sm:text-headline text-foreground mt-4 mb-3">
              What our<br />
              <span className="text-primary italic font-normal">clients say</span>
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-base font-bold text-white">★ 4.9</span>
              <span className="text-xs text-muted-foreground">Rating across 500+ client reviews</span>
            </div>

            {/* Desktop Navigation Controls */}
            <div className="hidden sm:flex items-center gap-2 mt-6">
              <button
                type="button"
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-all active:scale-90"
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-all active:scale-90"
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Auto-Rotating Reviews Carousel */}
          <div
            onMouseEnter={handleInteraction}
            onTouchStart={handleInteraction}
            className="relative w-full max-w-xl mx-auto lg:max-w-none overflow-hidden rounded-[28px]"
          >
            <motion.div
              className="flex touch-pan-y cursor-grab active:cursor-grabbing"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
                mass: 0.8,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -35 || info.velocity.x < -200) {
                  scrollNext();
                } else if (info.offset.x > 35 || info.velocity.x > 200) {
                  scrollPrev();
                }
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 px-1 select-none"
                >
                  <div className="bg-card/90 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[200px]">
                    <div>
                      <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3.5">
                        <div>
                          <h3 className="font-sans text-sm sm:text-base font-semibold text-white">
                            {testimonial.author}
                          </h3>
                          <span className="text-[11px] text-muted-foreground">{testimonial.tag}</span>
                        </div>
                        <span className="text-xs font-semibold text-white px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                          {testimonial.rating}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-foreground/85 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handleInteraction();
                    setActiveIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-5 bg-primary'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
