import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, FileText, Compass, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: MapPin,
      title: 'Tour Packages',
      description: 'Curated domestic and international travel experiences designed for every type of traveler.',
      features: ['Domestic Adventures', 'International Escapes', 'Group Tours', 'Custom Itineraries'],
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/packages',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Plane,
      title: 'Flight Bookings',
      description: 'Seamless flight booking experience with competitive prices and flexible options.',
      features: ['Best Price Deals', 'Multiple Airlines', 'Easy Cancellation', '24/7 Support'],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/flights',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: FileText,
      title: 'Visa Services',
      description: 'Complete visa assistance and documentation support for hassle-free international travel.',
      features: ['Document Guidance', 'Application Support', 'Fast Processing', 'Expert Assistance'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/visa',
      color: 'from-orange-500 to-yellow-400'
    },
    {
      icon: Compass,
      title: 'Travel Consultation',
      description: 'Personalized travel planning and expert advice to make your journey perfect.',
      features: ['Custom Planning', 'Expert Advice', 'Budget Optimization', 'Destination Insights'],
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/about',
      color: 'from-green-500 to-emerald-400'
    },
  ];

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="min-h-[100dvh] lg:h-[100dvh] snap-start relative flex flex-col justify-center bg-[#F8FAFC] overflow-x-hidden py-16 lg:py-0">
      <div className="container-custom w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Entity - Centered and Stable */}
        <div className="mb-10 lg:mb-16 animate-fade-in text-center">
          <div className="max-w-2xl mx-auto space-y-3 lg:space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-primary font-bold text-[9px] lg:text-[10px] tracking-widest uppercase">
              Expertise
            </div>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Our <span className="gradient-text">Premium</span> Travel Services
            </h2>
            <p className="text-[14px] lg:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
              Tailored solutions crafted to make your journey seamless, from luxury escapes to essential travel documentation.
            </p>
          </div>
        </div>

        {/* Carousel Entity - Separate Swipeable Identity */}
        <div className="w-full relative px-0">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="flex no-scrollbar">
              {services.map((service, index) => (
                <CarouselItem key={index} className="basis-[240px] sm:basis-[300px] lg:basis-[320px] pl-4 lg:pl-6">
                  <Card className="group border border-slate-100 bg-white shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden rounded-2xl h-[340px] sm:h-[400px] flex flex-col">
                    <div className="relative h-32 sm:h-40 overflow-hidden flex-shrink-0">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-3 left-3">
                        <div className={`bg-gradient-to-br ${service.color} rounded-lg p-2 shadow-lg`}>
                          <service.icon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                      <div className="space-y-2 sm:space-y-3">
                        <CardTitle className="text-base sm:text-xl font-serif font-bold text-slate-900">
                          {service.title}
                        </CardTitle>
                        <p className="text-[11px] sm:text-sm text-slate-500 leading-snug line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                      
                      <Button 
                        variant="ghost"
                        className="w-full h-9 sm:h-10 rounded-xl text-primary font-bold hover:bg-primary/5 transition-all text-[11px] sm:text-sm flex items-center justify-between px-3 border border-primary/10 group-hover:border-primary/30"
                        onClick={() => handleServiceClick(service.route)}
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation for Desktop */}
            <div className="hidden lg:flex absolute -top-16 right-0 gap-3">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-xl border-2 border-slate-200 hover:border-primary hover:text-primary transition-all shadow-none" />
              <CarouselNext className="static translate-y-0 h-10 w-10 rounded-xl border-2 border-slate-200 hover:border-primary hover:text-primary transition-all shadow-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Services;
