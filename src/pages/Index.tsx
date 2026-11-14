import { Navigation } from '@/components/Navigation';
import { MobileHeader } from '@/components/MobileHeader';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { GallerySection } from '@/components/GallerySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BookingForm } from '@/components/BookingForm';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { GoogleReviewButton } from '@/components/GoogleReviewButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <MobileHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingForm />
      <ContactSection />
      <Footer />
      <GoogleReviewButton />
    </div>
  );
};

export default Index;
