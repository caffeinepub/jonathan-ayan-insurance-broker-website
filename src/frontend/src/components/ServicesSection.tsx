import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Comprehensive Insurance Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guidance and personalized service for all your life insurance and annuity needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Life Insurance Card */}
          <Card className="border-2 border-border hover:border-gold transition-all duration-300 hover:shadow-xl rounded-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-sm bg-navy/5 flex items-center justify-center">
                  <img
                    src="/assets/generated/life-insurance-icon.dim_64x64.png"
                    alt="Life Insurance"
                    className="w-12 h-12"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-navy">Life Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-foreground/80 leading-relaxed">
                Protect your loved ones with comprehensive life insurance coverage. I'll help you find the right policy that fits your budget and provides the security your family deserves. Whether you need term life, whole life, or universal life insurance, I have access to competitive rates from top-rated carriers.
              </CardDescription>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">Term & Permanent Life Insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">Competitive Rates & Fast Approval</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">Personalized Coverage Analysis</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Annuities Card */}
          <Card className="border-2 border-border hover:border-gold transition-all duration-300 hover:shadow-xl rounded-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-sm bg-navy/5 flex items-center justify-center">
                  <img
                    src="/assets/generated/annuities-icon.dim_64x64.png"
                    alt="Annuities"
                    className="w-12 h-12"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-navy">Annuities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-foreground/80 leading-relaxed">
                Secure your retirement with reliable annuity products designed to provide guaranteed income for life. I specialize in helping clients build retirement strategies that offer financial stability and peace of mind. Let me guide you through fixed, variable, and indexed annuity options.
              </CardDescription>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">Fixed & Indexed Annuities</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">Guaranteed Lifetime Income</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80">Retirement Planning Expertise</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
