import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Let's Discuss Your Insurance Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to protect your family or secure your retirement? Get in touch today for a free consultation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-border rounded-sm shadow-lg">
            <CardHeader className="text-center bg-navy/5 border-b-2 border-border">
              <CardTitle className="text-3xl font-bold text-navy">Contact Information</CardTitle>
              <CardDescription className="text-base">
                I'm here to help you find the right insurance solution
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Location</h3>
                      <p className="text-foreground/80">Miami, Florida</p>
                      <p className="text-sm text-muted-foreground mt-1">Serving all of Florida</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Phone</h3>
                      <p className="text-foreground/80">(555) 123-4567</p>
                      <p className="text-sm text-muted-foreground mt-1">Call or text anytime</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Email</h3>
                      <p className="text-foreground/80">jonathan@insurancebroker.com</p>
                      <p className="text-sm text-muted-foreground mt-1">I'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Availability</h3>
                      <p className="text-foreground/80">Monday - Friday: 9am - 6pm</p>
                      <p className="text-sm text-muted-foreground mt-1">Weekend appointments available</p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col justify-center bg-navy/5 rounded-sm p-8 border-2 border-gold/20">
                  <h3 className="text-2xl font-bold text-navy mb-4">
                    Free Consultation
                  </h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    No obligation, no pressure. Let's have a conversation about your insurance needs and I'll provide honest recommendations tailored to your situation.
                  </p>
                  <Button
                    size="lg"
                    className="bg-gold hover:bg-gold-dark text-navy font-semibold rounded-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Schedule a Call
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Most consultations take 15-30 minutes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
