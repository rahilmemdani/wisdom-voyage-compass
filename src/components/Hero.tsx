
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star, Users, Globe } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '10,000+' },
    { icon: Globe, label: 'Destinations', value: '150+' },
    { icon: Star, label: 'Rating', value: '4.9/5' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Discover the World with 
              <span className="gradient-text text-accent"> Wisdom</span>
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-white/90">
              Embark on extraordinary journeys with our premium travel experiences. 
              From exotic international destinations to hidden domestic gems, we craft memories that last a lifetime.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold">
                Explore Packages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Plan Your Trip
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="lg:justify-self-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass-effect p-8 max-w-md">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">
                Start Your Journey Today
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">Expert Travel Consultants</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">Best Price Guarantee</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">Hassle-free Bookings</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
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
