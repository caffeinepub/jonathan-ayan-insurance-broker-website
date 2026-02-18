import { TrendingUp, Shield, Sparkles } from 'lucide-react';

export default function ChildBenefitsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-gold" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Invest in Your Child's Future Today
              </h2>
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Opening a life insurance policy for your child is one of the smartest financial decisions you can make
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tax-Free Wealth Building */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Tax-Free Wealth Building
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    Build substantial tax-free wealth that your child can access at any point in life—for college, a first home, starting a business, or retirement. The earlier you start, the more wealth accumulates.
                  </p>
                </div>
              </div>
            </div>

            {/* Compounded Growth with Protection */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Compounded Interest with Market Protection
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    Your child's policy grows with compounded interest over time while being protected from market downturns. Enjoy growth potential without the risk of losing principal value.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-white/90 text-lg font-medium">
              Whether at birth or any age, it's never too late to secure your child's financial future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
