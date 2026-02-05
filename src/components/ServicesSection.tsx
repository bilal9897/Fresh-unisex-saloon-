import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    title: 'Hair Cutting',
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-16 lg:py-24 bg-card relative overflow-hidden">
      {/* Background number */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-serif text-[20rem] lg:text-[30rem] text-muted/30 select-none pointer-events-none leading-none">
        02
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
            Services
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-6">
            <h2 className="font-serif text-headline text-foreground">
              Price <span className="text-primary italic font-normal">List</span>
            </h2>
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-ultra text-foreground hover:text-primary transition-colors duration-500"
            >
              <span className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-500" />
              View Price List
            </Link>
          </div>
        </motion.div>

        {/* Services Grid - Compact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {serviceCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-background/50 border border-border p-4"
            >
              <h3 className="font-serif text-base text-primary mb-3 pb-2 border-b border-border/50">
                {category.title}
              </h3>
              <div className="space-y-1.5">
                {category.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex justify-between items-baseline gap-2 text-[11px]"
                  >
                    <span className="font-sans text-foreground/80 truncate">
                      {service.name}
                    </span>
                    <span className="font-sans text-primary whitespace-nowrap">
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-[10px] text-muted-foreground mt-6 text-center"
        >
          * Prices may vary. Package deals available.
        </motion.p>
      </div>
    </section>
  );
}
