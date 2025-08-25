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
    <footer className="bg-gradient-to-br from-red-50 to-red-100 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-red-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Main Cards Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          
          {/* About Us Card with Logo Above */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-200/50 group border border-red-100">
            <div className="space-y-6">
              {/* Logo Above About Us */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <img
                    src="/WisdomLogo.png"
                    alt="Wisdom Tours Logo"
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold text-red-600 text-center mb-4">About Us</h4>
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                Your trusted partner for extraordinary travel experiences. We create memories that last a lifetime with our premium domestic and international tour packages.
              </p>
            </div>
          </div>

          {/* Our Services Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-200/50 group border border-red-100">
            <h4 className="text-xl font-bold text-red-600 text-center mb-6">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-200/50 group border border-red-100">
            <h4 className="text-xl font-bold text-red-600 text-center mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <Link
                    to={link.href}
                    className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium text-sm group-hover:translate-x-1 transform block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-200/50 group border border-red-100">
            <h4 className="text-xl font-bold text-red-600 text-center mb-6">Stay Connected</h4>
            <p className="text-gray-700 text-sm mb-6 text-center">
              Subscribe for latest travel deals and updates.
            </p>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter email"
                  className="flex-1 border-red-200 focus:border-red-400 rounded-lg text-sm"
                />
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 rounded-lg transition-colors duration-300"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-lg transition-all duration-300"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Inquiry
              </Button>
              <div className="space-y-2 pt-2">
                <div
                  className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer hover:text-red-600 transition-colors justify-center"
                  onClick={handlePhoneClick}
                >
                  <Phone className="w-3 h-3" />
                  <span>+91 98566 64440</span>
                </div>
                <div
                  className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer hover:text-red-600 transition-colors justify-center"
                  onClick={handleEmailClick}
                >
                  <Mail className="w-3 h-3" />
                  <span>sales@wisdomtravel.co.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <MapPin className="w-5 h-5 text-red-500" />
            <span className="text-lg font-medium leading-relaxed">
              Dheeraj Heritage, G-14, Swami Vivekananda Rd, Santacruz (West), Mumbai - 400054
            </span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-red-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-sm font-medium">
            © 2018 Wisdom Tours and Travels. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
