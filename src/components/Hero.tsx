
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star, Users, Globe, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '10,000+' },
    { icon: Globe, label: 'Destinations', value: '150+' },
    { icon: Star, label: 'Rating', value: '4.9/5' },
  ];

  const handleExplorePackages = () => {
    navigate('/packages');
  };

  const handlePlanTrip = () => {
    navigate('/about');
  };

  const handleConsultation = () => {
    const phone = '+911234567890';
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
              Discover the World with 
              <span className="text-white drop-shadow-lg"> Wisdom</span>
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-white/95 font-medium">
              Embark on extraordinary journeys with our premium travel experiences. 
              From exotic international destinations to hidden domestic gems, we craft memories that last a lifetime.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
                onClick={handleExplorePackages}
              >
                Explore Packages
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300"
                onClick={handlePlanTrip}
              >
                Plan Your Trip
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-white drop-shadow-lg group-hover:text-primary transition-colors" />
                  <div className="text-3xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                  <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Hero Card */}
          <div className="lg:justify-self-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass-effect p-8 max-w-md border-2 border-white/20">
              <h3 className="text-3xl font-serif font-bold mb-6 text-primary">
                Start Your Journey Today
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  <span className="font-semibold">Expert Travel Consultants</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  <span className="font-semibold">24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  <span className="font-semibold">Best Price Guarantee</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  <span className="font-semibold">Hassle-free Bookings</span>
                </div>
              </div>
              <Button 
                className="w-full mt-8 bg-primary hover:bg-primary/90 font-bold text-lg py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                onClick={handleConsultation}
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
