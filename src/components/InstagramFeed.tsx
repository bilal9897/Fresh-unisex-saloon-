 import { motion } from 'framer-motion';
 import { useInView } from 'framer-motion';
 import { useRef } from 'react';
 import { Instagram } from 'lucide-react';

const INSTAGRAM_HANDLE = 'fresh_unisex_saloon';
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
 
 export function InstagramFeed() {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   return (
     <section className="py-20 lg:py-32 bg-card">
       <div className="container mx-auto px-6 lg:px-16">
         <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8 }}
           className="text-center mb-12"
         >
           <div className="inline-flex items-center gap-3 mb-6">
             <Instagram className="w-5 h-5 text-primary" />
             <span className="font-sans text-[10px] uppercase tracking-ultra text-primary">
                @{INSTAGRAM_HANDLE}
             </span>
           </div>
           <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
             Follow our <span className="text-primary italic font-normal">journey</span>
           </h2>
         </motion.div>
 
          {/* Instagram Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full max-w-2xl aspect-[4/5] bg-secondary/50 border border-border overflow-hidden hover:border-primary/50 transition-colors duration-500"
            >
              {/* Instagram Preview Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent via-primary to-accent flex items-center justify-center mb-6">
                  <Instagram className="w-12 h-12 text-foreground" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2">@{INSTAGRAM_HANDLE}</h3>
                <p className="font-sans text-sm text-muted-foreground mb-6">
                  Fresh Unisex Saloon • Hampankatta, Mangalore
                </p>
                <div className="flex gap-8 mb-8">
                  <div className="text-center">
                    <span className="block font-serif text-2xl text-foreground">500+</span>
                    <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">Posts</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-serif text-2xl text-foreground">5K+</span>
                    <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">Followers</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-ultra group-hover:bg-primary/90 transition-colors">
                  <Instagram className="w-4 h-4" />
                  View Profile
                </span>
              </div>
            </a>
          </motion.div>
 
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="text-center mt-10"
         >
           <a
              href={INSTAGRAM_URL}
             target="_blank"
             rel="noopener noreferrer"
             className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-ultra text-foreground hover:text-primary transition-colors duration-500"
           >
             <span className="w-8 h-px bg-primary group-hover:w-16 transition-all duration-500" />
             Follow on Instagram
             <span className="w-8 h-px bg-primary group-hover:w-16 transition-all duration-500" />
           </a>
         </motion.div>
       </div>
     </section>
   );
 }