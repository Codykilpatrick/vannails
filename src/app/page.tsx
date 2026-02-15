import HeroSection from '@/components/home/HeroSection';
import FeaturedServices from '@/components/home/FeaturedServices';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <Testimonials />
      <CTABanner />
    </>
  );
}
