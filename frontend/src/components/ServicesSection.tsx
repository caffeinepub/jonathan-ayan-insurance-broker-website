import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingUp } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-light via-background to-accent-blue/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/assets/generated/services-bg-pattern.dim_1920x600.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-4 mb-6">
            <img
              src="/assets/generated/security-icon.dim_256x256.png"
              alt="Security"
              className="w-12 h-12 opacity-80"
            />
            <img
              src="/assets/generated/partnership-icon.dim_256x256.png"
              alt="Partnership"
              className="w-12 h-12 opacity-80"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Comprehensive Insurance Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guidance and personalized service for all your life insurance and annuity needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Life Insurance Card */}
          <Card className="border-2 border-border hover:border-accent-blue transition-all duration-300 hover:shadow-2xl rounded-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4 bg-gradient-to-br from-accent-blue/5 to-transparent rounded-t-xl">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-accent-blue" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-navy">Life Insurance</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-base text-foreground/80 leading-relaxed mb-6">
                Protect your loved ones with comprehensive life insurance coverage. I'll help you find the right policy that fits your budget and provides the security your family deserves. Whether you need term life, whole life, or universal life insurance, I have access to competitive rates from top-rated carriers.
              </CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">Term & Permanent Life Insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">Competitive Rates & Fast Approval</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">Personalized Coverage Analysis</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Annuities Card */}
          <Card className="border-2 border-border hover:border-gold transition-all duration-300 hover:shadow-2xl rounded-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4 bg-gradient-to-br from-gold/5 to-transparent rounded-t-xl">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-10 h-10 text-gold" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-navy">Annuities</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-base text-foreground/80 leading-relaxed mb-6">
                Secure your retirement with reliable annuity products designed to provide guaranteed income for life. I specialize in helping clients build retirement strategies that offer financial stability and peace of mind. Let me guide you through fixed, variable, and indexed annuity options.
              </CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">Fixed & Indexed Annuities</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">Guaranteed Lifetime Income</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">Retirement Planning Expertise</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
