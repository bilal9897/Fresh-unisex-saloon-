import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import gallery1 from '@/assets/gallery-1.webp';
import gallery2 from '@/assets/gallery-2.webp';
import gallery3 from '@/assets/gallery-3.webp';

interface TransformationProps {
  before: string;
  after: string;
  title: string;
  index: number;
  isInView: boolean;
}

function TransformationCard(props: TransformationProps) {
  const { before, after, title, index, isInView } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const beforeWidth = sliderPosition > 0 ? (100 / (sliderPosition / 100)) : 10000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="space-y-4"
    >
      <div
        ref={containerRef}
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <img
          src={after}
          alt="After transformation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={before}
            alt="Before transformation"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${beforeWidth}%`, maxWidth: 'none' }}
            draggable={false}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white font-medium">Before</span>
        </div>
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
          <span className="font-sans text-[10px] uppercase tracking-wider text-primary font-medium">After</span>
        </div>
      </div>

      <h3 className="font-serif text-base text-foreground text-center font-medium">{title}</h3>
    </motion.div>
  );
}

const transformations = [
  { before: gallery1, after: gallery2, title: 'Classic Fade Transformation' },
  { before: gallery2, after: gallery3, title: 'Beard Styling Makeover' },
  { before: gallery3, after: gallery1, title: 'Hair Treatment Results' },
];

export function BeforeAfterSlider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-background relative overflow-hidden">
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-serif text-[20rem] lg:text-[30rem] text-muted/30 select-none pointer-events-none leading-none">
        06
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
            Transformations
          </p>
          <h2 className="font-serif text-headline text-foreground mt-8">
            Before & <span className="text-primary italic font-normal">after</span>
          </h2>
          <p className="font-sans text-base text-muted-foreground mt-4 max-w-md">
            Drag the slider to see the transformation. Real results from our clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {transformations.map((t, index) => (
            <TransformationCard
              key={t.title}
              before={t.before}
              after={t.after}
              title={t.title}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}