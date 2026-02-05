import { Navigation } from '@/components/Navigation';
import { MobileHeader } from '@/components/MobileHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { GallerySection } from '@/components/GallerySection';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BookingForm } from '@/components/BookingForm';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { GoogleReviewButton } from '@/components/GoogleReviewButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-20 md:pb-0 pt-14 md:pt-0">
      <Navigation />
      <MobileHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
       <BeforeAfterSlider />
      <TestimonialsSection />
       <BookingForm />
      <ContactSection />
      <Footer />
      <GoogleReviewButton />
      <BottomNavigation />
    </div>
  );
};

export default Index;
