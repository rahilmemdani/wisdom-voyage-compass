
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star, Users, Globe, Phone, Sparkles } from 'lucide-react';
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
    <section className="section-hero">
      {/* Enhanced Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-element"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl floating-element" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl floating-element" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-accent/10 rounded-full blur-xl floating-element" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="text-white animate-fade-in space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold">Premium Travel Experiences</span>
            </div>
            
            <h1 className="font-serif font-bold leading-tight text-balance">
              Discover the World with 
              <span className="block gradient-text bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent"> Wisdom</span>
            </h1>
            
            <p className="text-xl lg:text-2xl leading-relaxed text-white/95 font-medium text-balance max-w-2xl">
              Embark on extraordinary journeys with our premium travel experiences. 
              From exotic international destinations to hidden domestic gems, we craft memories that last a lifetime.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-10 py-5 rounded-2xl shadow-2xl glow-effect"
                onClick={handleExplorePackages}
              >
                Explore Packages
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-secondary text-lg px-10 py-5 rounded-2xl backdrop-blur-sm"
                onClick={handlePlanTrip}
              >
                Plan Your Trip
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-110 transition-all duration-500">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 group-hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 mx-auto text-white drop-shadow-lg group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg font-serif">{stat.value}</div>
                  <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Hero Card */}
          <div className="lg:justify-self-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass-effect p-10 max-w-md border-2 border-white/20 rounded-3xl">
              <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-8 gradient-text">
                Start Your Journey Today
              </h3>
              <div className="space-y-6">
                {[
                  'Expert Travel Consultants',
                  '24/7 Customer Support', 
                  'Best Price Guarantee',
                  'Hassle-free Bookings'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-red-500/10 hover:from-primary/20 hover:to-red-500/20 transition-all duration-300 hover:translate-x-2 group">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-red-500 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="font-semibold text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-10 btn-primary text-lg py-5 rounded-2xl font-bold shadow-2xl"
                onClick={handleConsultation}
              >
                <Phone className="w-5 h-5 mr-3" />
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
