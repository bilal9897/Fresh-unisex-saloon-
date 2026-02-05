import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-24 bg-background relative overflow-hidden">
      {/* Large background number */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-[20rem] lg:text-[30rem] text-muted/30 select-none pointer-events-none leading-none">
        01
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column - Cinematic Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative aspect-[9/16] lg:aspect-[4/5] overflow-hidden rounded-sm order-2 lg:order-1"
          >
            {/* AI-generated placeholder image */}
            <img
              src="/salon-placeholder.png"
              alt="Fresh Unisex Saloon Interior"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/salon-video.mp4" type="video/mp4" />
            </video>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />

            {/* "About Us" label overlay on video */}
            <div className="absolute top-8 left-8 z-10">
              <p className="font-sans text-[10px] uppercase tracking-ultra text-white/90 line-accent">
                About Us
              </p>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 order-1 lg:order-2"
          >
            <h2 className="font-serif text-headline text-foreground mb-10">
              Crafting confidence<br />
              <span className="text-primary italic font-normal">since day one</span>
            </h2>

            <div className="space-y-6 mb-16">
              <p className="font-sans text-base text-muted-foreground leading-[1.8]">
                At Fresh Unisex Saloon, we believe grooming is more than a service—it's an experience.
                Located in the heart of Hampankatta, Mangalore, we've built our reputation on precision
                cuts, personalized attention, and an unwavering commitment to making every client feel exceptional.
              </p>
              <p className="font-sans text-base text-muted-foreground leading-[1.8]">
                Our team of skilled professionals combines traditional barbering techniques with modern
                styling trends, ensuring you leave looking and feeling your absolute best.
              </p>
            </div>

            {/* Stats - horizontal layout */}
            <div className="flex gap-12 lg:gap-16 border-t border-border pt-10">
              <div>
                <p className="font-serif text-4xl lg:text-5xl text-foreground">15+</p>
                <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground mt-2">Years</p>
              </div>
              <div>
                <p className="font-serif text-4xl lg:text-5xl text-foreground">50k+</p>
                <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground mt-2">Clients</p>
              </div>
              <div>
                <p className="font-serif text-4xl lg:text-5xl text-foreground">6</p>
                <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground mt-2">Stylists</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}