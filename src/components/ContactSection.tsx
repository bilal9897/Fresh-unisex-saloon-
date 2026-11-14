import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-10 sm:py-14 lg:py-20 bg-background relative overflow-hidden">
      {/* Background number (desktop only) */}
      <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 font-serif text-[26rem] text-muted/20 select-none pointer-events-none leading-none">
        04
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl relative z-10">
        <div ref={ref} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          {/* Left column - iOS Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Contact
            </p>
            <h2 className="font-serif text-3xl sm:text-headline text-foreground mt-4 mb-3">
              Find <span className="text-primary italic font-normal">us</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground mb-6 max-w-md">
              Visit our unisex salon in Balmatta / Hampankatta or reach out via WhatsApp & call. Walk-ins always welcome.
            </p>

            {/* iOS Grouped Details Card */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] p-6 space-y-5 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
              {/* Address */}
              <div className="pb-4 border-b border-white/10">
                <span className="font-sans text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                  Location
                </span>
                <p className="font-serif text-base sm:text-lg text-white leading-snug">
                  Opposite Hotel Roopa, Balmatta Road,<br />
                  Hampankatta, Mangalore, Karnataka 575001
                </p>
              </div>

              {/* Phone */}
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-white/50 block mb-0.5">
                    Phone
                  </span>
                  <a
                    href="tel:08197925360"
                    className="font-serif text-base sm:text-lg text-primary hover:underline block"
                  >
                    +91 81979 25360
                  </a>
                </div>
                <a
                  href="tel:08197925360"
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white/95 text-xs font-medium tracking-wide backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-95 transition-all"
                >
                  Call
                </a>
              </div>

              {/* Hours */}
              <div className="pb-4 border-b border-white/10">
                <span className="font-sans text-[10px] uppercase tracking-wider text-white/50 block mb-0.5">
                  Opening Hours
                </span>
                <p className="font-sans text-sm text-white/90">
                  Daily: 8:30 AM – 9:00 PM
                </p>
              </div>

              {/* Quick Chat / Social Pills */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://wa.me/918197925360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white/95 text-xs font-medium text-center flex items-center justify-center gap-2 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/fresh_unisex_saloon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white/95 text-xs font-medium text-center flex items-center justify-center gap-2 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all active:scale-95"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column - iOS Map Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.2969485567024!2d74.8452722!3d12.8697389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUyJzExLjEiTiA3NMKwNTAnNDMuMCJF!5e0!3m2!1sen!2sin!4v1738759296000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fresh Unisex Saloon Location"
                className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
