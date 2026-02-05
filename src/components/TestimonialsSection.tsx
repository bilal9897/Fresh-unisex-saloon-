import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "The best haircut I've ever had. The attention to detail is remarkable, and the ambiance makes you feel like you're getting a premium experience.",
    author: "Rahul Shetty",
  },
  {
    quote: "Fresh Saloon has been my go-to for years. Their hair smoothening treatment transformed my hair completely. Highly recommend!",
    author: "Priya Nair",
  },
  {
    quote: "Professional service, skilled barbers, and they really understand what you want. Worth every rupee.",
    author: "Avinash Kumar",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column - Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Testimonials
            </p>
            <h2 className="font-serif text-headline text-foreground mt-8">
              What our<br />
              <span className="text-primary italic font-normal">clients say</span>
            </h2>
          </motion.div>

          {/* Right column - Testimonials */}
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex gap-6">
                  <span className="font-serif text-5xl text-primary leading-none">"</span>
                  <div>
                    <p className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed mb-6">
                      {testimonial.quote}
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                      — {testimonial.author}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}