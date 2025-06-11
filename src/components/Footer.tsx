
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Flight Bookings', href: '/flights' },
    { name: 'Visa Services', href: '/visa' },
    { name: 'About Us', href: '/about' },
  ];

  const services = [
    'Domestic Tours',
    'International Tours',
    'Flight Bookings',
    'Visa Assistance',
    'Travel Insurance',
    'Group Tours',
  ];

  const destinations = [
    'Switzerland',
    'Iceland',
    'Nepal',
    'Goa',
    'Kerala',
    'Rajasthan',
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=Hello, I would like to inquire about your travel services.', '_blank');
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto section-padding py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">W</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold">Wisdom Tours</h3>
                <p className="text-sm text-white/80">& Travels</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted partner for extraordinary travel experiences. We create memories that last a lifetime with our premium domestic and international tour packages.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-sm">123 Travel Street, Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-sm">info@wisdomtours.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white/80 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to get the latest travel deals and destination updates.
            </p>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-accent hover:bg-accent/90 text-primary">
                  Subscribe
                </Button>
              </div>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-accent hover:text-primary hover:border-accent"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
          <div className="flex flex-wrap gap-2">
            {destinations.map((destination, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-accent hover:text-primary transition-colors cursor-pointer"
              >
                {destination}
              </span>
            ))}
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm mb-4 md:mb-0">
            © 2024 Wisdom Tours and Travels. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 text-white/60 hover:text-accent cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-white/60 hover:text-accent cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-white/60 hover:text-accent cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-white/60 hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
