import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'jonathan-ayan-insurance'
  );

  return (
    <footer className="bg-navy text-white py-8 border-t-4 border-gold">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg mb-1">Jonathan Ayan</p>
            <p className="text-white/70 text-sm">Life & Annuity Insurance Broker</p>
            <p className="text-white/70 text-sm">Miami, Florida</p>
          </div>

          <div className="text-center text-sm text-white/70">
            <p className="mb-2">
              © {currentYear} Jonathan Ayan. All rights reserved.
            </p>
            <p className="flex items-center justify-center gap-1">
              Built with <Heart className="w-4 h-4 text-gold fill-gold" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light underline transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>

          <div className="text-center md:text-right text-sm text-white/70">
            <p>Licensed Insurance Professional</p>
            <p className="text-xs mt-1">Insurance products offered through licensed carriers</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
