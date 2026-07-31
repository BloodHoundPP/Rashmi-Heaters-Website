import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import logoImage from "../../imports/image_95cf2b7b-removebg-preview.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-[1320px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logoImage}
                alt="Rashmi Heaters Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="text-2xl font-bold text-foreground">Rashmi Heaters</div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Precision industrial heating solutions engineered for reliability and efficiency across industries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              {/* <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a> */}
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products/customized-heaters" className="text-muted-foreground text-sm hover:text-primary transition-colors">Customized Heaters</Link></li>
              <li><Link to="/products/d-type-heaters" className="text-muted-foreground text-sm hover:text-primary transition-colors">D-Type Heaters</Link></li>
              <li><Link to="/products/control-panel" className="text-muted-foreground text-sm hover:text-primary transition-colors">Control Panels</Link></li>
              <li><Link to="/products/std-heaters" className="text-muted-foreground text-sm hover:text-primary transition-colors">Standard Heaters</Link></li>
              <li><Link to="/products/cartridge-heaters" className="text-muted-foreground text-sm hover:text-primary transition-colors">Cartridge Heaters</Link></li>
              <li><Link to="/products/open-wire" className="text-muted-foreground text-sm hover:text-primary transition-colors">Open Wire Heaters</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Industries We Serve</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              <li><span className="text-muted-foreground text-sm">Plastic & Rubber</span></li>
              <li><span className="text-muted-foreground text-sm">Pharmaceutical</span></li>
              <li><span className="text-muted-foreground text-sm">Thermal Power</span></li>
              <li><span className="text-muted-foreground text-sm">Automobile</span></li>
              <li><span className="text-muted-foreground text-sm">Food Processing</span></li>
              <li><span className="text-muted-foreground text-sm">Aero Space</span></li>
              <li><span className="text-muted-foreground text-sm">Steel Industry</span></li>
              <li><span className="text-muted-foreground text-sm">Petrochemical</span></li>
              <li><span className="text-muted-foreground text-sm">Gas Industry</span></li>
              <li><span className="text-muted-foreground text-sm">Chemical Industry</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Gat No 118/1, Alandi Markal Road, <br />
                  Dhanorie, Taluka Khed,<br />
                  Pune, Maharashtra 412105
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+91 9822946344</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">sales@rashmiheaters.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2026 Rashmi Heaters. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
