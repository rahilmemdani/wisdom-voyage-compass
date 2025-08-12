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
    window.open('https://wa.me/9856664440?text=Hello, I would like to inquire about your travel services.', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+919856664440', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:sales@wisdomtravel.co.in', '_self');
  };

  const handleSubscribe = () => {
    alert('Thank you for subscribing! We will keep you updated with the latest travel deals.');
  };

  const handleDestinationClick = (destination: string) => {
    navigate('/packages', { state: { selectedDestination: destination } });
  };

  return (
<footer className="bg-gradient-to-br from-gray-900 via-primary to-red-800 text-white relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-16 w-48 h-48 bg-white rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
  </div>

  <div className="relative z-10 container-custom section-padding py-20">
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
      {/* Enhanced Company Info */}
      <div className="space-y-8">
        <div className="flex items-center space-x-4 group">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Soft background glow behind logo */}
              <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl z-0 backdrop-blur-sm" />
              <img
                src="/WisdomLogo.png"
                alt="Logo"
                className="w-full h-full object-contain select-none pointer-events-none relative z-10"
              />
            </div>
          </Link>
        </div>
        <p className="text-white/90 leading-relaxed text-balance">
          Your trusted partner for extraordinary travel experiences. We create memories that last a lifetime with our premium domestic and international tour packages.
        </p>
        <div className="space-y-6">
          {/* <div className="flex items-start space-x-4 cursor-pointer hover:text-white/80 transition-colors group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors flex-shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm">123 Travel Street, Mumbai, India</span>
          </div> * */}
          <div className="space-y-4">
  <div className="flex items-start space-x-3 cursor-pointer hover:text-white/80 transition-colors group">
    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors flex-shrink-0">
      <MapPin className="w-5 h-5 text-accent" />
    </div>
    <p className="text-sm leading-relaxed max-w-xs">
      Ground floor, Dheeraj Heritage, G-14,<br />
      Swami Vivekananda Rd, near Milan Subway,<br />
      Junction, Santacruz (West), Mumbai,<br />
      Maharashtra 400054
    </p>
  </div>
</div>
          <div
            className="flex items-center space-x-3 cursor-pointer hover:text-white/80 transition-colors group"
            onClick={handlePhoneClick}
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm">+91 98566 64440</span>
          </div>
          <div
            className="flex items-center space-x-3 cursor-pointer hover:text-white/80 transition-colors group"
            onClick={handleEmailClick}
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm">sales@wisdomtravel.co.in</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-bold mb-8 font-serif">Quick Links</h4>
        <ul className="space-y-4">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:translate-x-2 transform block group"
              >
                <span className="border-b border-transparent group-hover:border-white/50 transition-all duration-300">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-xl font-bold mb-8 font-serif">Our Services</h4>
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="text-white/90 font-medium flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-xl font-bold mb-8 font-serif">Stay Connected</h4>
        <p className="text-white/90 mb-8 leading-relaxed text-balance">
          Subscribe to get the latest travel deals and destination updates.
        </p>
        <div className="space-y-6">
          <div className="flex space-x-3">
            <Input
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm rounded-xl flex-1"
            />
            <Button
              className="bg-white text-primary hover:bg-white/90 font-bold shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-6"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full border-white/20 text-primary hover:bg-white hover:text-primary hover:border-white backdrop-blur-sm hover:scale-105 transition-all duration-300 rounded-xl"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp Inquiry
          </Button>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-white/20 mt-12 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
      <p className="text-white/90 font-medium">
        © 2018 Wisdom Tours and Travels. All rights reserved.
      </p>
      <div className="flex space-x-6">
        <Facebook className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" />
        <Instagram className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" />
        <Twitter className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" />
        <Linkedin className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" />
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;
