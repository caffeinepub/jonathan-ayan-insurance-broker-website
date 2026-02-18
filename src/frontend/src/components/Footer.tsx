import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'equity-insurance-partners';

  return (
    <footer className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 border-t-4 border-gold">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Equity Insurance Partners</h3>
            <p className="text-white/80 mb-2">Jonathan Ayan</p>
            <p className="text-white/70 text-sm">Life & Annuity Insurance Broker</p>
            <p className="text-white/70 text-sm mt-2">Licensed in all 50 states</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Contact</h3>
            <div className="space-y-2 text-white/80">
              <p>
                <a href="tel:239-331-0544" className="hover:text-gold transition-colors">
                  239-331-0544
                </a>
              </p>
              <p>
                <a href="mailto:jonathanayan.eip@gmail.com" className="hover:text-gold transition-colors">
                  jonathanayan.eip@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Services</h3>
            <ul className="space-y-2 text-white/80">
              <li>Life Insurance</li>
              <li>Annuities</li>
              <li>Retirement Planning</li>
              <li>Coverage Analysis</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70 text-sm mb-2">
            © {currentYear} Equity Insurance Partners. All rights reserved.
          </p>
          <p className="text-white/60 text-sm flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4 text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
