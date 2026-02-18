import { Card, CardContent } from '@/components/ui/card';

export default function CompaniesSection() {
  const carriers = [
    {
      name: 'Mutual of Omaha',
      logo: '/assets/generated/mutual-of-omaha-logo.dim_400x200.png',
    },
    {
      name: 'Transamerica',
      logo: '/assets/generated/transamerica-logo.dim_400x200.png',
    },
    {
      name: 'Ethos',
      logo: '/assets/generated/ethos-logo.dim_400x200.png',
    },
    {
      name: 'Fidelity and Guaranteed Life',
      logo: '/assets/generated/fidelity-guaranteed-logo.dim_400x200.png',
    },
    {
      name: 'Foresters',
      logo: '/assets/generated/forrester-logo-alt.dim_400x200.png',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy/5 via-background to-slate-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Trusted A+ Rated Carriers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            As an independent broker, I work with all the top-rated insurance companies in the country. 
            This means I can shop the market to find you the best rates and coverage options, 
            without being limited to a single company's products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-8">
          {carriers.map((carrier) => (
            <Card
              key={carrier.name}
              className="border-2 border-border hover:border-accent-blue transition-all duration-300 hover:shadow-lg rounded-xl bg-white/90 backdrop-blur-sm"
            >
              <CardContent className="p-8 flex items-center justify-center min-h-[200px]">
                <img
                  src={carrier.logo}
                  alt={carrier.name}
                  className="w-full h-auto object-contain transition-all duration-300"
                  style={{ maxHeight: '120px' }}
                />
              </CardContent>
            </Card>
          ))}

          <Card className="border-2 border-dashed border-gold hover:border-gold-dark transition-all duration-300 hover:shadow-lg rounded-xl bg-gradient-to-br from-gold/5 to-gold/10">
            <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold mb-1">+25</p>
                <p className="text-sm font-semibold text-navy">Other Carriers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-transparent rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-navy mb-4 text-center">
                Why Choose an Independent Broker?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong className="text-navy">Unbiased Recommendations:</strong> I work for you, not the insurance company
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong className="text-navy">Best Rates:</strong> I compare quotes from multiple carriers to find you the lowest price
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong className="text-navy">More Options:</strong> Access to 30+ A+ rated carriers means more choices for your unique needs
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
