
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

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

  const handlePhoneClick = () => {
    window.open('tel:+919876543210', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@wisdomtours.com', '_self');
  };

  const handleSubscribe = () => {
    // Add newsletter subscription logic here
    alert('Thank you for subscribing! We will keep you updated with the latest travel deals.');
  };

  const handleDestinationClick = (destination: string) => {
    navigate('/packages', { state: { selectedDestination: destination } });
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-red-600 to-red-700 text-white">
      <div className="container mx-auto section-padding py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-2xl">W</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold">Wisdom Tours</h3>
                <p className="text-sm text-white/90 font-medium">Travel & Tours</p>
                <p className="text-xs text-white/80 italic">A travel Knowledge Co.</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              Your trusted partner for extraordinary travel experiences. We create memories that last a lifetime with our premium domestic and international tour packages.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 cursor-pointer hover:text-accent transition-colors">
                <MapPin className="w-5 h-5 text-accent" />
                <span>123 Travel Street, Mumbai, India</span>
              </div>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-accent transition-colors"
                onClick={handlePhoneClick}
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>+91 98765 43210</span>
              </div>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-accent transition-colors"
                onClick={handleEmailClick}
              >
                <Mail className="w-5 h-5 text-accent" />
                <span>info@wisdomtours.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-white/90 hover:text-accent transition-colors font-medium hover:translate-x-2 transform duration-300 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white/90 font-medium">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-6">Stay Connected</h4>
            <p className="text-white/90 mb-6 leading-relaxed">
              Subscribe to get the latest travel deals and destination updates.
            </p>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
                />
                <Button 
                  className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg hover:scale-105 transition-all duration-300"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-primary hover:border-white backdrop-blur-sm hover:scale-105 transition-all duration-300"
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
          <h4 className="text-xl font-bold mb-6">Popular Destinations</h4>
          <div className="flex flex-wrap gap-3">
            {destinations.map((destination, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-white/20 rounded-full font-medium hover:bg-white hover:text-primary transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm"
                onClick={() => handleDestinationClick(destination)}
              >
                {destination}
              </span>
            ))}
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/90 mb-4 md:mb-0 font-medium">
            © 2024 Wisdom Tours and Travels. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Facebook className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125" />
            <Instagram className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125" />
            <Twitter className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125" />
            <Linkedin className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
