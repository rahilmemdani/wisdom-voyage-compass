
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Flight Bookings', href: '/flights' },
    { name: 'Visa Services', href: '/visa' },
    { name: 'About Us', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=Hello, I would like to inquire about your travel services.', '_blank');
  };

  const handleContactClick = () => {
    navigate('/about');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-primary/10">
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary via-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-primary"></div>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">Wisdom Tours</h1>
              <p className="text-sm text-muted-foreground -mt-1 font-medium">Travel & Tours</p>
              <p className="text-xs text-accent -mt-1 italic">A travel Knowledge Co.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold transition-all duration-300 relative ${
                  isActive(item.href)
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                    : 'text-foreground hover:text-primary hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={handleContactClick}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t bg-white/95 backdrop-blur-sm rounded-b-lg shadow-xl animate-slide-in-right">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-semibold transition-all duration-300 px-4 py-3 rounded-lg ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 border-l-4 border-primary'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t px-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 shadow-lg"
                  onClick={handleContactClick}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
