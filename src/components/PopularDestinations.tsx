
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';

const PopularDestinations = () => {
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

  return (
    <section className="py-20">
      <div className="container mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked destinations that offer unforgettable experiences and breathtaking beauty
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-primary text-white">
                    {destination.duration}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-serif font-semibold text-primary">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                  <span className="text-sm ml-auto">({destination.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{destination.price}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
