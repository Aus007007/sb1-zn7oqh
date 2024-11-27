import React from 'react';
import { useParams } from 'react-router-dom';
import { regions } from './regions';
import RegionSelector from '../../components/RegionSelector';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import PricingSection from '../../components/landing/PricingSection';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import ContactSection from '../../components/landing/ContactSection';
import Footer from '../../components/landing/Footer';
import Navbar from '../../components/landing/Navbar';
import LoadingScreen from '../../components/LoadingScreen';

function LandingPage() {
  const { region = 'us' } = useParams();
  const regionData = regions[region] || regions.us;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <HeroSection regionData={regionData} />
      <FeaturesSection regionData={regionData} />
      <TestimonialsSection region={region} />
      <PricingSection regionData={regionData} />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default LandingPage;