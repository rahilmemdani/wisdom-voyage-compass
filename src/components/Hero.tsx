import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Globe, 
  Phone, 
  Sparkles,
  MessageCircle,
  MapPin,
  Award,
  Shield,
  Clock,
  HeadphonesIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '10,000+', color: 'text-blue-400' },
    { icon: Globe, label: 'Destinations', value: '150+', color: 'text-green-400' },
    { icon: Star, label: 'Rating', value: '4.9/5', color: 'text-yellow-400' },
  ];

  const features = [
    { 
      icon: Award, 
      title: 'Expert Travel Consultants',
      desc: 'Certified travel experts with 10+ years experience'
    },
    { 
      icon: Clock, 
      title: '24/7 Customer Support',
      desc: 'Round-the-clock assistance for peace of mind'
    },
    { 
      icon: Shield, 
      title: 'Best Price Guarantee',
      desc: 'Find better price? We\'ll match it instantly'
    },
    { 
      icon: HeadphonesIcon, 
      title: 'Hassle-free Bookings',
      desc: 'Simple booking process with instant confirmation'
    }
  ];

  const handleExplorePackages = () => {
    navigate('/packages');
  };

  const handlePlanTrip = () => {
    navigate('/plan-trip');
  };

  const handleConsultation = () => {
    navigate('/contact');
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '7042434631'; 
    const message = encodeURIComponent('Hi! I\'m interested in planning a trip with Wisdom Travel. Can you help me?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <Button
          onClick={handleWhatsAppClick}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group relative overflow-hidden"
          size="lg"
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 animation-delay-300"></div>
          
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 relative z-10" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us on WhatsApp!
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </Button>
      </div>

      <section className="section-hero relative overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-[10s] hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-primary/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-accent/15 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-16 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
            {/* Enhanced Hero Content */}
            <div className="text-white animate-fade-in space-y-10">
              {/* Animated Badge */}
              {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 animate-slide-up">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                <span className="text-sm font-semibold text-white/95">India's Premium Travel Experience</span>
              </div> */}

              <div className="space-y-6">
                <h1 className="font-serif font-bold leading-tight text-balance animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Discover the World with 
                  <span className="block bg-gradient-to-r from-white via-primary-light to-accent bg-clip-text text-transparent animate-gradient">
                    Wisdom Travel
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl leading-relaxed text-white/95 font-medium text-balance max-w-2xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  Embark on extraordinary journeys with our premium travel experiences. 
                  From exotic international destinations to hidden domestic gems, we craft 
                  <span className="text-primary-light font-semibold"> memories that last a lifetime</span>.
                </p>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Button 
                  size="lg" 
                  className="group btn-primary text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 relative overflow-hidden"
                  onClick={handleExplorePackages}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    Explore Packages
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group btn-secondary text-lg px-10 py-6 rounded-2xl backdrop-blur-sm border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                  onClick={handlePlanTrip}
                >
                  <MapPin className="mr-3 w-5 h-5 group-hover:bounce transition-all duration-300" />
                  Plan Your Trip
                </Button>
              </div>

              {/* WhatsApp Quick Contact */}
              {/* <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <Button
                  onClick={handleWhatsAppClick}
                  className="group bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 hover:border-green-400/50 text-white backdrop-blur-sm px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                  variant="outline"
                >
                  <MessageCircle className="w-5 h-5 mr-3 text-green-400 group-hover:animate-pulse" />
                  <span className="text-green-100 font-semibold">Quick WhatsApp Consultation</span>
                  <span className="ml-2 text-green-300">→</span>
                </Button>
              </div> */}

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-8 animate-slide-up" style={{ animationDelay: '1s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <stat.icon className={`w-8 h-8 mx-auto text-white drop-shadow-lg ${stat.color} group-hover:scale-110 transition-all duration-300`} />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg font-serif group-hover:text-primary-light transition-colors duration-300">{stat.value}</div>
                    <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Hero Card */}
            <div className="lg:justify-self-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card className="glass-effect p-8 lg:p-10 max-w-md border-2 border-white/20 rounded-3xl relative overflow-hidden group hover:border-white/30 transition-all duration-500 hover:scale-[1.02]">
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 group-hover:from-white/10 group-hover:to-primary/10 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Start Your Journey Today
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                      <div key={index} className="group/item p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-red-500/10 hover:from-primary/20 hover:to-red-500/20 transition-all duration-300 hover:translate-x-2 cursor-pointer border border-transparent hover:border-primary/20">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-red-500 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 shadow-lg">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-foreground block">{feature.title}</span>
                            <span className="text-sm text-muted-foreground mt-1">{feature.desc}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="space-y-4">
                    <Button 
                      className="w-full btn-primary text-lg py-6 rounded-2xl font-bold shadow-2xl hover:shadow-primary/25 group/btn relative overflow-hidden"
                      onClick={handleConsultation}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-red-500 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <Phone className="w-5 h-5 mr-3 relative z-10 group-hover/btn:animate-pulse" />
                      <span className="relative z-10">Get Free Consultation</span>
                    </Button>
                    
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-2xl font-bold shadow-xl hover:shadow-green-500/25 transition-all duration-300 group/whatsapp relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-300"></div>
                      <MessageCircle className="w-5 h-5 mr-3 relative z-10 group-hover/whatsapp:animate-bounce" />
                      <span className="relative z-10">Chat on WhatsApp</span>
                    </Button>
                  </div>
                  
                  {/* Trust Badge */}
                  <div className="mt-6 text-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-semibold">
                      <Shield className="w-4 h-4" />
                      100% Secure & Trusted
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </>
  );
};

export default Hero;
