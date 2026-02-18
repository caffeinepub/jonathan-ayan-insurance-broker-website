import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-background.dim_1920x600.png"
          alt="Miami skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/20 backdrop-blur-sm border-2 border-gold">
            <Shield className="w-10 h-10 text-gold" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          Jonathan Ayan
        </h1>
        
        <p className="text-xl md:text-2xl text-gold font-semibold mb-3">
          Life & Annuity Insurance Broker
        </p>
        
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Serving Miami, Florida with access to all A-rated insurance companies in the country
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-6 text-lg rounded-sm shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Today
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-6 text-lg rounded-sm transition-all"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}
