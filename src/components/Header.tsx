
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
    <header className="bg-white/95 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-gray-100/50">
      <div className="container-custom section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-2xl tracking-tight">W</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-3 border-primary shadow-lg"></div>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <div className="md:block hidden">
                <h1 className="text-3xl font-serif font-bold gradient-text">Wisdom Tours</h1>
                <p className="text-sm text-muted-foreground -mt-1 font-semibold tracking-wide">Travel & Tours</p>
                <p className="text-xs text-accent -mt-1 italic font-medium">A travel Knowledge Co.</p>
              </div>
              <div className="block md:hidden">
                <h1 className="text-xl font-bold gradient-text leading-tight">Wisdom Tours</h1>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold transition-all duration-300 relative group ${isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                  }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-red-500 transform transition-transform duration-300 origin-left ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-2 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-white/80"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold">WhatsApp</span>
            </Button>
            <Button
              size="sm"
              className="btn-primary font-bold"
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
            className="lg:hidden hover:bg-primary/10 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-8 border-t border-gray-100/50 bg-white/98 backdrop-blur-xl rounded-b-2xl shadow-2xl animate-fade-in">
            <nav className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-semibold transition-all duration-300 px-6 py-4 rounded-xl ${isActive(item.href)
                      ? 'text-primary bg-primary/10 border-l-4 border-primary shadow-lg'
                      : 'text-foreground hover:text-primary hover:bg-primary/5 hover:translate-x-2'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 pt-6 border-t border-gray-100/50 px-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center space-x-2 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white btn-secondary"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-semibold">WhatsApp Inquiry</span>
                </Button>
                <Button
                  size="sm"
                  className="btn-primary font-bold"
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
