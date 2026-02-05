import { Instagram, Phone, MapPin, Clock } from 'lucide-react';

const INSTAGRAM_HANDLE = 'fresh_unisex_saloon';
const PHONE_NUMBER = '+918197925360';

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Contact Info */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-ultra text-primary mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +91 81979 25360
              </a>
              <div className="flex items-start gap-3 font-sans text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Hampankatta,<br />Mangalore, Karnataka</span>
              </div>
              <div className="flex items-center gap-3 font-sans text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                9:00 AM - 9:00 PM
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-ultra text-primary mb-6">Follow Us</h4>
            <div className="flex flex-col gap-4">
              <a 
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary via-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                @{INSTAGRAM_HANDLE}
              </a>
            </div>
            <p className="font-sans text-xs text-muted-foreground mt-4">Latest styles, offers & updates!</p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border">
          <p className="font-sans text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Fresh Unisex Saloon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}