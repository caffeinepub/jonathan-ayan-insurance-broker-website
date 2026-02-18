import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

export default function CompaniesSection() {
  const companies = [
    'Mutual of Omaha',
    'FNG',
    'Transamerica',
    'Ethos',
    'Forrester',
    'And Many More'
  ];

  return (
    <section className="py-20 bg-navy text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-gold/20 border border-gold">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold">A-Rated Carriers</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Access to Top Insurance Companies
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            As an independent broker, I work with all the leading A-rated insurance companies in the country. 
            This means I can shop the market to find you the best coverage at the most competitive rates.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {companies.map((company) => (
              <div
                key={company}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 text-center hover:bg-white/15 transition-all duration-300 hover:border-gold"
              >
                <p className="font-semibold text-lg text-white">{company}</p>
              </div>
            ))}
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-sm p-6 text-center">
            <p className="text-white/90 text-base leading-relaxed">
              <span className="font-semibold text-gold">Why it matters:</span> Working with multiple carriers 
              allows me to compare policies and pricing to ensure you get the best value. You're not limited 
              to one company's products—you get access to the entire market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
