import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import gallery1 from '@/assets/gallery-1.png';
import gallery2 from '@/assets/gallery-2.png';
import gallery3 from '@/assets/gallery-3.png';

const galleryImages = [
  { src: gallery1 },
  { src: gallery2 },
  { src: gallery3 },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 lg:py-24 bg-background relative overflow-hidden">
      {/* Background number */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-[20rem] lg:text-[30rem] text-muted/30 select-none pointer-events-none leading-none">
        03
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
            Gallery
          </p>
          <h2 className="font-serif text-headline text-foreground mt-8">
            Our <span className="text-primary italic font-normal">work</span>
          </h2>
        </motion.div>

        {/* Asymmetric masonry grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 relative z-10">
          {/* Large image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="col-span-12 md:col-span-7 aspect-[4/5] overflow-hidden"
          >
            <img
              src={galleryImages[0].src}
              alt="Fresh Saloon"
              className="w-full h-full object-cover lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Stacked images */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 lg:gap-6">
            {galleryImages.slice(1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: (index + 1) * 0.2 }}
                className="aspect-[4/3] overflow-hidden"
              >
                <img
                  src={image.src}
                  alt="Fresh Saloon"
                  className="w-full h-full object-cover lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}