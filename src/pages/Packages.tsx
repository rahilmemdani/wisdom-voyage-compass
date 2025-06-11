
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

const Packages = () => {
  const [activeTab, setActiveTab] = useState('domestic');

  const domesticPackages = [
    {
      name: 'Golden Triangle Tour',
      location: 'Delhi, Agra, Jaipur',
      duration: '6 Days / 5 Nights',
      price: '₹35,000',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Taj Mahal Visit', 'Red Fort', 'Hawa Mahal', 'Local Cuisine'],
      groupSize: '2-15 people',
    },
    {
      name: 'Kerala Backwaters',
      location: 'Kochi, Alleppey, Munnar',
      duration: '5 Days / 4 Nights',
      price: '₹28,000',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Houseboat Stay', 'Tea Plantations', 'Spice Gardens', 'Ayurvedic Spa'],
      groupSize: '2-12 people',
    },
    {
      name: 'Goa Beach Paradise',
      location: 'North & South Goa',
      duration: '4 Days / 3 Nights',
      price: '₹22,000',
      rating: 4.6,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Beach Activities', 'Water Sports', 'Local Markets', 'Sunset Cruise'],
      groupSize: '2-20 people',
    },
    {
      name: 'Himachal Hill Stations',
      location: 'Shimla, Manali, Dharamshala',
      duration: '7 Days / 6 Nights',
      price: '₹32,000',
      rating: 4.9,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Mountain Views', 'Adventure Sports', 'Local Culture', 'Photography'],
      groupSize: '2-10 people',
    },
  ];

  const internationalPackages = [
    {
      name: 'Swiss Alps Adventure',
      location: 'Zurich, Interlaken, Jungfraujoch',
      duration: '8 Days / 7 Nights',
      price: '₹1,85,000',
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Alpine Railways', 'Snow Activities', 'Lake Cruises', 'Mountain Hiking'],
      groupSize: '2-8 people',
    },
    {
      name: 'Iceland Nature Tour',
      location: 'Reykjavik, Blue Lagoon, Golden Circle',
      duration: '6 Days / 5 Nights',
      price: '₹1,95,000',
      rating: 4.8,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Northern Lights', 'Geysers', 'Waterfalls', 'Glacier Walks'],
      groupSize: '2-12 people',
    },
    {
      name: 'Nepal Himalayan Trek',
      location: 'Kathmandu, Pokhara, Everest Base Camp',
      duration: '12 Days / 11 Nights',
      price: '₹95,000',
      rating: 4.9,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Everest Views', 'Sherpa Culture', 'Mountain Lodges', 'Photography'],
      groupSize: '4-12 people',
    },
    {
      name: 'Bali Tropical Escape',
      location: 'Ubud, Seminyak, Nusa Penida',
      duration: '7 Days / 6 Nights',
      price: '₹75,000',
      rating: 4.7,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Temple Visits', 'Beach Clubs', 'Rice Terraces', 'Volcano Tours'],
      groupSize: '2-15 people',
    },
  ];

  const PackageCard = ({ pkg }: { pkg: any }) => (
    <Card className="group overflow-hidden hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-accent text-primary">
            {pkg.duration}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-accent fill-current" />
            <span className="text-sm font-medium">{pkg.rating}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-serif text-primary">{pkg.name}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {pkg.location}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-accent" />
            {pkg.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-accent" />
            {pkg.groupSize}
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Package Highlights:</h4>
          <div className="grid grid-cols-2 gap-1">
            {pkg.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                {highlight}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-2xl font-bold text-primary">{pkg.price}</p>
            <p className="text-sm text-muted-foreground">per person</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          {pkg.reviews} reviews • Trusted by travelers
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              Our Travel Packages
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover handcrafted travel experiences designed to create unforgettable memories
            </p>
          </div>

          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="domestic" className="font-semibold">
                Domestic Tours
              </TabsTrigger>
              <TabsTrigger value="international" className="font-semibold">
                International Tours
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="domestic" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-semibold text-primary mb-2">
                  Domestic Travel Packages
                </h2>
                <p className="text-muted-foreground">
                  Explore the incredible diversity and beauty of India
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {domesticPackages.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="international" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-semibold text-primary mb-2">
                  International Travel Packages
                </h2>
                <p className="text-muted-foreground">
                  Experience the wonders of the world with our curated international tours
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {internationalPackages.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Let us create a custom package for you.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary">
              Request Custom Package
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Packages;
