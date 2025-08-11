
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PopularDestinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: 'Swiss Alps',
      location: 'Switzerland',
      price: 'From ₹1,50,000',
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'International',
      duration: '7 Days',
    },
    {
      name: 'Goa Beaches',
      location: 'India',
      price: 'From ₹25,000',
      rating: 4.7,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Domestic',
      duration: '5 Days',
    },
    {
      name: 'Iceland Falls',
      location: 'Iceland',
      price: 'From ₹2,00,000',
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'International',
      duration: '6 Days',
    },
    {
      name: 'Kerala Backwaters',
      location: 'India',
      price: 'From ₹35,000',
      rating: 4.6,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Domestic',
      duration: '4 Days',
    },
    {
      name: 'Himalayas Trek',
      location: 'Nepal',
      price: 'From ₹75,000',
      rating: 4.9,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'International',
      duration: '10 Days',
    },
    {
      name: 'Rajasthan Heritage',
      location: 'India',
      price: 'From ₹45,000',
      rating: 4.5,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Domestic',
      duration: '8 Days',
    },
  ];

  const handleViewDetails = (destination: string) => {
    navigate('/packages', { state: { selectedDestination: destination } });
  };

  const handleViewAll = () => {
    navigate('/packages');
  };

  return (
    <section className="section-standard bg-gradient-to-br from-white to-gray-50/50">
      <div className="container-custom section-padding">
        <div className="text-center mb-20">
          <h2 className="font-serif font-bold gradient-text mb-8 text-balance">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Explore our handpicked destinations that offer unforgettable experiences and breathtaking beauty
          </p>
        </div>

        {/* Quick Destination Links */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-4 justify-center">
            {['Switzerland', 'Iceland', 'Nepal', 'Goa', 'Kerala', 'Rajasthan'].map((destination, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-2xl font-medium hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 border border-primary/20 hover:border-primary"
                onClick={() => handleViewDetails(destination)}
              >
                {destination}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group card-modern hover-lift border-0 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-primary font-semibold shadow-lg rounded-full px-3 py-1">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge variant="secondary" className="bg-primary text-white font-semibold shadow-lg rounded-full px-3 py-1 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{destination.duration}</span>
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 right-6">
                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-white">{destination.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-serif font-bold gradient-text group-hover:scale-105 transition-transform duration-300 origin-left">
                    {destination.name}
                  </h3>
                </div>
                
                <div className="flex items-center text-muted-foreground mb-6">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">{destination.location}</span>
                  <span className="text-sm ml-auto">({destination.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold gradient-text font-serif">{destination.price}</p>
                    <p className="text-sm text-muted-foreground font-medium">per person</p>
                  </div>
                  <Button 
                    className="btn-primary text-sm px-6 py-3 rounded-xl"
                    onClick={() => handleViewDetails(destination.name)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button 
            size="lg" 
            variant="outline" 
            className="btn-secondary text-lg px-12 py-5 rounded-2xl"
            onClick={handleViewAll}
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
