import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const serviceCategories = [
  {
    title: 'Hair Cutting',
    tag: 'Classic & Modern Styles',
    services: [
      { name: 'Hair Cutting', price: '₹150' },
      { name: 'Hair Cutting (Stylish)', price: '₹200' },
      { name: 'Shaving (Normal)', price: '₹100' },
      { name: 'Shaving (Stylish)', price: '₹150' },
      { name: 'Threading', price: '₹50' },
      { name: 'Head Massage', price: '₹50' },
      { name: 'Hair Wash', price: '₹150' },
      { name: 'Hair Dryer', price: '₹50' },
    ],
  },
  {
    title: 'Hair Colour',
    tag: 'Premium Hair Shades',
    services: [
      { name: 'Garnier', price: '₹350' },
      { name: 'Keywest', price: '₹400' },
      { name: 'Raga', price: '₹500' },
      { name: 'Loreal', price: '₹600' },
      { name: 'High Light', price: '₹500' },
      { name: 'Fashion Shade', price: '₹800' },
    ],
  },
  {
    title: 'Hair Treatment',
    tag: 'Hair Care & Repair',
    services: [
      { name: 'Hair Spa', price: '₹800-1000' },
      { name: 'Hair Fall Treatment', price: '₹800' },
      { name: 'Dandruff Treatment', price: '₹800' },
      { name: 'Set Straightening', price: '₹800' },
      { name: 'Hair Straightening', price: '₹1200' },
      { name: 'Hair Smoothening', price: '₹1500' },
      { name: 'Hair Keratin', price: '₹2000' },
      { name: 'Hair Botox', price: '₹2000' },
    ],
  },
  {
    title: 'Face Care',
    tag: 'Skin Glow & D-Tan',
    services: [
      { name: 'Face Wash', price: '₹200' },
      { name: 'Face Scrub', price: '₹250' },
      { name: 'Face Massage', price: '₹500' },
      { name: 'Face D-Tan', price: '₹500' },
      { name: 'Face Clean Up', price: '₹450-650' },
      { name: 'Facial VLCC', price: '₹600' },
      { name: 'Facial Fruit', price: '₹700' },
      { name: 'Facial Raga', price: '₹1800' },
      { name: 'Facial Natures Gold', price: '₹2200' },
      { name: 'Facial Shahnaz Gold', price: '₹3000' },
    ],
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const goToNextCategory = () => {
    setCurrentCategoryIndex((prev) => (prev + 1) % serviceCategories.length);
  };

  const goToPrevCategory = () => {
    setCurrentCategoryIndex(
      (prev) => (prev - 1 + serviceCategories.length) % serviceCategories.length
    );
  };

  return (
    <section id="services" className="pt-10 pb-6 sm:py-14 lg:py-20 bg-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
            Services & Pricing
          </p>
          <div className="mt-6">
            <h2 className="font-serif text-3xl sm:text-headline text-foreground">
              Price <span className="text-primary italic font-normal">List</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-md">
              Transparent rates for haircutting, grooming, premium styling, and rejuvenating skin care.
            </p>
          </div>

          {/* Category Filter - All 4 in ONE Single Row */}
          <div className="mt-6 sm:mt-8 grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-2xl mx-auto">
            {serviceCategories.map((c, idx) => {
              const isSelected = currentCategoryIndex === idx;
              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setCurrentCategoryIndex(idx)}
                  className={`py-2 sm:py-2.5 px-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium text-center transition-all active:scale-95 border truncate backdrop-blur-2xl ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-md font-semibold'
                      : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/90 hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                  }`}
                  title={c.title}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* iOS-Inspired Grouped Price Card - Continuous Butter-Smooth Sliding Track */}
        <div className="max-w-2xl mx-auto overflow-hidden rounded-[28px]">
          <motion.div
            className="flex touch-pan-y cursor-grab active:cursor-grabbing"
            animate={{ x: `-${currentCategoryIndex * 100}%` }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 28,
              mass: 0.8,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -35 || info.velocity.x < -200) {
                goToNextCategory();
              } else if (info.offset.x > 35 || info.velocity.x > 200) {
                goToPrevCategory();
              }
            }}
          >
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className="w-full shrink-0 px-0.5 select-none"
              >
                <div className="bg-card border border-border rounded-[28px] p-5 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:border-border/80 transition-colors flex flex-col justify-between min-h-[460px]">
                  <div>
                    {/* iOS Card Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-2">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                          {cat.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">{cat.tag}</span>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                        {cat.services.length} items
                      </span>
                    </div>

                    {/* iOS Inset Grouped Service List */}
                    <div className="divide-y divide-border/40">
                      {cat.services.map((service) => (
                        <div
                          key={service.name}
                          className="flex items-center justify-between py-3 px-2 hover:bg-muted/30 rounded-xl transition-colors"
                        >
                          <span className="font-sans text-xs sm:text-sm text-foreground/90">
                            {service.name}
                          </span>
                          <span className="font-sans text-xs sm:text-sm font-semibold text-foreground tracking-tight">
                            {service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* iOS Glassy CTA Button */}
                  <div className="mt-6 pt-4 border-t border-border/60">
                    <a
                      href="#book"
                      className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-200 active:bg-neutral-300 border border-transparent text-black text-xs sm:text-sm font-semibold text-center block transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                    >
                      Book {cat.title} Service
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Swipe indicator dots & subtle mobile hint */}
        <div className="flex flex-col items-center gap-1.5 mt-4 sm:hidden">
          <div className="flex items-center gap-1.5">
            {serviceCategories.map((c, idx) => (
              <button
                key={c.title}
                type="button"
                onClick={() => setCurrentCategoryIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentCategoryIndex === idx ? 'w-5 bg-primary' : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Go to ${c.title}`}
              />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest font-sans">
            Swipe left / right for more categories
          </p>
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans text-[11px] text-muted-foreground mt-4 sm:mt-6 text-center"
        >
          * Prices are subject to customization. Package deals and custom groom packages available upon request.
        </motion.p>
      </div>
    </section>
  );
}
