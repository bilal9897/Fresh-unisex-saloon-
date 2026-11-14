import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const serviceCategories = [
  {
    category: 'Haircuts',
    services: [
      { name: 'Hair Cut (Men)', price: '₹100' },
      { name: 'Hair Cut (Women)', price: '₹200' },
      { name: 'Kids Hair Cut', price: '₹80' },
      { name: 'Beard Trim', price: '₹50' },
      { name: 'Hair Cut + Beard', price: '₹130' },
    ],
  },
  {
    category: 'Shaving',
    services: [
      { name: 'Clean Shave', price: '₹100' },
      { name: 'Hot Towel Shave', price: '₹150' },
      { name: 'Beard Styling', price: '₹100' },
      { name: 'Head Shave', price: '₹100' },
    ],
  },
  {
    category: 'Hair Treatments',
    services: [
      { name: 'Hair Smoothening', price: '₹1,500' },
      { name: 'Hair Keratin', price: '₹3,500' },
      { name: 'Hair Botox', price: '₹4,000' },
      { name: 'Hair Spa', price: '₹500' },
      { name: 'Dandruff Treatment', price: '₹400' },
      { name: 'Hair Color', price: '₹300' },
      { name: 'Hair Highlights', price: '₹800' },
    ],
  },
  {
    category: 'Face & Skin',
    services: [
      { name: 'Clean Up', price: '₹400' },
      { name: 'Facial (Basic)', price: '₹500' },
      { name: 'Facial (Premium)', price: '₹800' },
      { name: 'De-Tan', price: '₹400' },
      { name: 'Threading', price: '₹30' },
    ],
  },
  {
    category: 'Massage',
    services: [
      { name: 'Head Massage', price: '₹100' },
      { name: 'Shoulder Massage', price: '₹150' },
      { name: 'Oil Massage (Head)', price: '₹200' },
      { name: 'Full Body Massage', price: '₹1,000' },
    ],
  },
];

const packages = [
  {
    name: 'Essential Groom',
    description: 'Hair Cut + Shave + Head Massage',
    originalPrice: '₹300',
    price: '₹249',
    savings: 'Save ₹51',
  },
  {
    name: 'Premium Groom',
    description: 'Hair Cut + Hot Towel Shave + Facial + Head Massage',
    originalPrice: '₹850',
    price: '₹699',
    savings: 'Save ₹151',
  },
  {
    name: 'Complete Makeover',
    description: 'Hair Cut + Beard Styling + Clean Up + Hair Spa + Massage',
    originalPrice: '₹1,250',
    price: '₹999',
    savings: 'Save ₹251',
  },
];

function ServiceCategory({ category, services, index }: { category: string; services: { name: string; price: string }[]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.45)] mb-8"
    >
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-2">
        <h3 className="font-serif text-xl text-white font-medium">
          {category}
        </h3>
        <span className="text-xs text-white/50 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
          {services.length} items
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex justify-between items-center py-3.5 px-2 hover:bg-white/[0.02] rounded-xl transition-colors"
          >
            <span className="font-sans text-sm text-white/90">{service.name}</span>
            <span className="font-sans text-sm font-semibold text-white tracking-tight">
              {service.price}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const packagesRef = useRef(null);
  const isPackagesInView = useInView(packagesRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span className="font-sans text-[11px] uppercase tracking-ultra">Back</span>
            </Link>
            <span className="font-serif text-xl text-foreground">
              Fresh<span className="text-primary">.</span>
            </span>
            <a
              href="tel:+918197925360"
              className="font-sans text-[11px] uppercase tracking-ultra text-primary hover:text-foreground transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-card">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Price List
            </p>
            <h1 className="font-serif text-headline text-foreground mt-8">
              Services & <span className="text-primary italic font-normal">Pricing</span>
            </h1>
            <p className="font-sans text-base text-muted-foreground mt-6 max-w-lg leading-relaxed">
              Quality grooming at honest prices. All services include complimentary consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Deals */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            ref={packagesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isPackagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary mb-4">
              Best Value
            </p>
            <h2 className="font-serif text-3xl text-foreground">
              Package <span className="text-primary italic font-normal">Deals</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isPackagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 sm:p-7 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:border-white/25 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-serif text-xl text-white font-medium group-hover:text-primary transition-colors">
                      {pkg.name}
                    </h3>
                    <span className="font-sans text-[10px] font-semibold text-white bg-white/10 border border-white/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {pkg.savings}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/70 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-2xl font-bold text-white">{pkg.price}</span>
                    <span className="font-sans text-xs text-white/40 line-through">{pkg.originalPrice}</span>
                  </div>
                  <a
                    href="/#book"
                    className="py-1.5 px-3.5 rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/15 text-white text-xs font-medium backdrop-blur-xl transition-all"
                  >
                    Select
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Service Menu */}
      <section className="py-20 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left column */}
            <div>
              {serviceCategories.slice(0, 3).map((cat, index) => (
                <ServiceCategory key={cat.category} category={cat.category} services={cat.services} index={index} />
              ))}
            </div>

            {/* Right column */}
            <div>
              {serviceCategories.slice(3).map((cat, index) => (
                <ServiceCategory key={cat.category} category={cat.category} services={cat.services} index={index + 3} />
              ))}

              {/* Note */}
              <div className="mt-12 p-6 border border-border">
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary">Note:</span> Prices may vary based on hair length and condition.
                  Consultation is free. Walk-ins welcome, appointments preferred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
            Ready to look your <span className="text-primary italic font-normal">best</span>?
          </h2>
          <p className="font-sans text-base text-muted-foreground mb-10 max-w-md mx-auto">
            Book your appointment today and experience the Fresh difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918197925360"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-sans text-[11px] uppercase tracking-ultra hover:bg-primary/90 transition-colors"
            >
              Call to Book
            </a>
            <a
              href="https://wa.me/918197925360?text=Hi!%20I'm%20interested%20in%20your%20services.%20Can%20you%20help%20me%20book%20an%20appointment?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-foreground font-sans text-[11px] uppercase tracking-ultra hover:border-primary hover:text-primary transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <p className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
            © {new Date().getFullYear()} Fresh Unisex Saloon • Hampankatta, Mangalore
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}