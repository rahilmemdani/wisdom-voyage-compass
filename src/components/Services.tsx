
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
    <section className="py-20 bg-gradient-to-br from-muted/30 to-white">
      <div className="container mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-primary mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive travel solutions designed to make your journey seamless and memorable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover-lift bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary group-hover:text-primary/80 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 shadow-md" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-6 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 font-semibold"
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
