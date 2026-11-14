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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const lastInteractionRef = useRef(0);

  // Keep currentIndexRef synchronized
  currentIndexRef.current = activeIndex;

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.children;
    const targetCard = cards[index] as HTMLElement;
    if (targetCard) {
      const targetLeft =
        targetCard.offsetLeft -
        (container.clientWidth - targetCard.clientWidth) / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const scrollNext = () => {
    const next = (currentIndexRef.current + 1) % testimonials.length;
    lastInteractionRef.current = Date.now();
    scrollToSlide(next);
  };

  const scrollPrev = () => {
    const prev = (currentIndexRef.current - 1 + testimonials.length) % testimonials.length;
    lastInteractionRef.current = Date.now();
    scrollToSlide(prev);
  };

  // Robust Auto-swipe left timer (resumes automatically 3s after user interaction)
  useEffect(() => {
    const interval = setInterval(() => {
      // Pause briefly if user recently touched or dragged
      if (Date.now() - lastInteractionRef.current < 3000) {
        return;
      }

      const next = (currentIndexRef.current + 1) % testimonials.length;
      scrollToSlide(next);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  // Real-time scroll listener to update active index
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, clientWidth } = container;
    const cardWidth = clientWidth * 0.84 || 300;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

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

          {/* Auto-Swiping Reviews Carousel - Hidden Scrollbar & Clean Display */}
          <div
            onMouseEnter={handleInteraction}
            onTouchStart={handleInteraction}
            onTouchMove={handleInteraction}
            className="relative"
          >
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="relative flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card/90 backdrop-blur-2xl border border-white/10 rounded-[28px] p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.5)] shrink-0 snap-center w-[84vw] max-w-[360px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <div>
                        <h3 className="font-sans text-sm font-semibold text-white">
                          {testimonial.author}
                        </h3>
                        <span className="text-[10px] text-muted-foreground">{testimonial.tag}</span>
                      </div>
                      <span className="text-xs font-semibold text-white px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                        {testimonial.rating}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
