import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 lg:py-20 bg-background relative overflow-hidden">
      {/* Background number */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-serif text-[20rem] lg:text-[30rem] text-muted/30 select-none pointer-events-none leading-none">
        04
      </div>

      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        <div ref={ref} className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Left column - Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Contact
            </p>
            <h2 className="font-serif text-headline text-foreground mt-4 mb-2">
              Find <span className="text-primary italic font-normal">us</span>
            </h2>
            <p className="font-sans text-sm text-muted-foreground mb-6 max-w-md">
              Ready for a fresh look? Visit us or book an appointment. Walk-ins are always welcome!
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div>
                <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground mb-1">Visit Us</p>
                <p className="font-serif text-lg text-foreground leading-snug">
                  Opposite Hotel Roopa,<br />
                  Hampankatta, Mangalore<br />
                  Karnataka 575001
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground mb-1">Call Us</p>
                <a
                  href="tel:08197925360"
                  className="font-serif text-lg text-foreground hover:text-primary transition-colors block"
                >
                  +91 81979 25360
                </a>
              </div>

              {/* Hours */}
              <div>
                <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground mb-1">Open Hours</p>
                <p className="font-serif text-lg text-foreground leading-snug">
                  Every Day: 8:30 AM – 9:00 PM
                </p>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="https://instagram.com/fresh_unisex_saloon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-primary/10 rounded-full transition-colors group w-fit"
                >
                  <Instagram className="w-3.5 h-3.5 text-foreground group-hover:text-primary transition-colors" />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">Instagram</span>
                </a>
                <a
                  href="https://wa.me/918197925360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-primary/10 rounded-full transition-colors group w-fit"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-foreground group-hover:text-primary transition-colors" />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column - Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="aspect-square lg:aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/50 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.2969485567024!2d74.8452722!3d12.8697389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUyJzExLjEiTiA3NMKwNTAnNDMuMCJF!5e0!3m2!1sen!2sin!4v1738759296000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fresh Unisex Saloon Location"
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                Hampankatta, Mangalore
              </p>
              <a
                href="https://www.google.com/maps/place/12%C2%B052'11.1%22N+74%C2%B050'43.0%22E/@12.8697389,74.8452722,17z/data=!3m1!4b1!4m4!3m3!8m2!3d12.8697389!4d74.8452722"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] uppercase tracking-ultra text-primary hover:text-foreground transition-colors group flex items-center gap-1"
              >
                Get Directions <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
