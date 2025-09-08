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
    { name: 'Bookings', href: '/my-bookings' },
    { name: 'Visa Services', href: '/visa' },
    { name: 'About Us', href: '/about' },
    { name: 'Plan Your Trip', href: "/plan-trip"}
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9856664440?text=Hello, I would like to inquire about your travel services.', '_blank');
  };

  const handleContactClick = () => {
    navigate('/contact');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
           <div className="relative w-32 h-32 flex items-center justify-center">
             <img src="/WisdomLogo.png"  alt="Logo" 
              className="w-full h-full object-contain select-none pointer-events-none"/>
            </div>
            {/* <div className="md:block">
              <h1 className="text-xl font-bold gradient-text font-serif">Wisdom Tours</h1>
              <p className="text-xs font-semibold text-muted-foreground -mt-1">Travel & Tours</p>
              <p className="text-[11px] text-accent italic -mt-1">A travel Knowledge Co.</p>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition duration-300 group ${isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${isActive(item.href) ? 'scale-x-100' : ''}`} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </Button>
            <Button
              size="sm"
              onClick={handleContactClick}
              className="bg-primary text-white hover:bg-primary/90 transition"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white rounded-b-lg shadow-md mt-2 animate-fade-in px-4 py-6">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium rounded-md px-3 py-2 transition-all ${isActive(item.href)
                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                    : 'text-foreground hover:bg-primary/5 hover:text-primary'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWhatsAppClick}
                  className="w-full flex justify-center gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Inquiry
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-primary text-white hover:bg-primary/90"
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
