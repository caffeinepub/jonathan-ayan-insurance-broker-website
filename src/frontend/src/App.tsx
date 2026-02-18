import HeroSection from './components/HeroSection';
import ChildBenefitsSection from './components/ChildBenefitsSection';
import ServicesSection from './components/ServicesSection';
import CompaniesSection from './components/CompaniesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Redeployment trigger - 2026-02-18
function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <ServicesSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover transform rotate-180"
        />
      </div>
      
      <ChildBenefitsSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CompaniesSection />
      
      {/* Section Divider */}
      <div className="relative h-16 overflow-hidden">
        <img 
          src="/assets/generated/section-divider.dim_1920x100.png" 
          alt="" 
          className="w-full h-full object-cover transform rotate-180"
        />
      </div>
      
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
