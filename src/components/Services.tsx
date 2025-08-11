
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, FileText, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    },
    {
      icon: Plane,
      title: 'Flight Bookings',
      description: 'Seamless flight booking experience with competitive prices and flexible options.',
      features: ['Best Price Deals', 'Multiple Airlines', 'Easy Cancellation', '24/7 Support'],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/flights',
    },
    {
      icon: FileText,
      title: 'Visa Services',
      description: 'Complete visa assistance and documentation support for hassle-free international travel.',
      features: ['Document Guidance', 'Application Support', 'Fast Processing', 'Expert Assistance'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/visa',
    },
    {
      icon: Compass,
      title: 'Travel Consultation',
      description: 'Personalized travel planning and expert advice to make your journey perfect.',
      features: ['Custom Planning', 'Expert Advice', 'Budget Optimization', 'Destination Insights'],
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      route: '/about',
    },
  ];

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="section-standard bg-gradient-to-br from-gray-50/50 to-white">
      <div className="container-custom section-padding">
        <div className="text-center mb-20">
          <h2 className="font-serif font-bold gradient-text mb-8 text-balance">
            Our Premium Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Comprehensive travel solutions designed to make your journey seamless and memorable
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group card-modern hover-lift border-0 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 group-hover:bg-white/30 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-serif gradient-text group-hover:scale-105 transition-transform duration-300 origin-left">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6 pb-8">
                <p className="text-muted-foreground leading-relaxed text-balance">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 50}ms` }}>
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-red-500 rounded-full mr-3 shadow-lg flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-8 btn-secondary text-base py-3 rounded-xl"
                  onClick={() => handleServiceClick(service.route)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
