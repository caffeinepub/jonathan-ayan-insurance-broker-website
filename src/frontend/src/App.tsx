import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import CompaniesSection from './components/CompaniesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <CompaniesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
