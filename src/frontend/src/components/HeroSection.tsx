import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
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
            
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
              Serving all 50 states with access to all A+ rated insurance companies in the country
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="bg-white/95 border-2 border-white text-navy hover:bg-white hover:text-navy font-semibold px-8 py-6 text-lg rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Column - Professional Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-accent-blue/30 rounded-2xl blur-2xl transform scale-95" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-2 rounded-2xl border-2 border-white/20 shadow-2xl">
                <img
                  src="/assets/generated/jonathan-headshot.dim_400x400.png"
                  alt="Jonathan Ayan - Professional Insurance Broker"
                  className="w-80 h-80 object-cover rounded-xl"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-blue/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
