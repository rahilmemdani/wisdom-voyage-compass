
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane, Calendar, Users, ArrowRight, Clock, Star } from 'lucide-react';

const Flights = () => {
  const [tripType, setTripType] = useState('round-trip');

  const popularRoutes = [
    { from: 'Mumbai', to: 'Dubai', price: '₹25,000', duration: '3h 30m' },
    { from: 'Delhi', to: 'London', price: '₹45,000', duration: '8h 45m' },
    { from: 'Bangalore', to: 'Singapore', price: '₹28,000', duration: '4h 15m' },
    { from: 'Chennai', to: 'Bangkok', price: '₹22,000', duration: '3h 45m' },
    { from: 'Kolkata', to: 'Kathmandu', price: '₹15,000', duration: '1h 30m' },
    { from: 'Pune', to: 'Goa', price: '₹8,000', duration: '1h 15m' },
  ];

  const airlines = [
    { name: 'Air India', logo: '🇮🇳', rating: 4.2 },
    { name: 'Emirates', logo: '🇦🇪', rating: 4.7 },
    { name: 'Qatar Airways', logo: '🇶🇦', rating: 4.8 },
    { name: 'Singapore Airlines', logo: '🇸🇬', rating: 4.9 },
    { name: 'Thai Airways', logo: '🇹🇭', rating: 4.5 },
    { name: 'IndiGo', logo: '💙', rating: 4.3 },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 container mx-auto section-padding text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Flight Bookings Made Easy
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find the best deals on domestic and international flights with our comprehensive booking platform
          </p>
        </div>
      </section>

      {/* Flight Search Form */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto section-padding">
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-primary text-center">
                Search Flights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="round-trip" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="multi-city">Multi City</TabsTrigger>
                </TabsList>
                
                <TabsContent value="round-trip" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From</Label>
                      <Input id="from" placeholder="Departure city" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <Input id="to" placeholder="Destination city" className="h-12" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departure">Departure Date</Label>
                      <Input id="departure" type="date" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="return">Return Date</Label>
                      <Input id="return" type="date" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Passengers</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4+ Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium">Premium Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="airline">Preferred Airline</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any airline" />
                        </SelectTrigger>
                        <SelectContent>
                          {airlines.map((airline, index) => (
                            <SelectItem key={index} value={airline.name.toLowerCase()}>
                              {airline.logo} {airline.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
                    <Plane className="w-5 h-5 mr-2" />
                    Search Flights
                  </Button>
                </TabsContent>

                <TabsContent value="one-way" className="space-y-6 mt-6">
                  <div className="text-center p-8 text-muted-foreground">
                    <Plane className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>One-way flight search form will be available here.</p>
                    <p className="text-sm mt-2">Please contact us for one-way bookings.</p>
                  </div>
                </TabsContent>

                <TabsContent value="multi-city" className="space-y-6 mt-6">
                  <div className="text-center p-8 text-muted-foreground">
                    <Plane className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Multi-city flight search form will be available here.</p>
                    <p className="text-sm mt-2">Please contact us for multi-city bookings.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Popular Flight Routes
            </h2>
            <p className="text-lg text-muted-foreground">
              Book the most popular destinations at great prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="group hover-lift cursor-pointer transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold">{route.from}</div>
                    <ArrowRight className="w-5 h-5 text-accent" />
                    <div className="text-lg font-semibold">{route.to}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {route.duration}
                    </div>
                    <div className="text-2xl font-bold text-primary">{route.price}</div>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Airlines */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Our Partner Airlines
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose from top-rated airlines for your journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {airlines.map((airline, index) => (
              <Card key={index} className="text-center p-6 hover-lift cursor-pointer">
                <div className="text-4xl mb-3">{airline.logo}</div>
                <h3 className="font-semibold text-sm mb-2">{airline.name}</h3>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-accent fill-current mr-1" />
                  <span className="text-sm font-medium">{airline.rating}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Integration Notice */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <Plane className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                Real-time Flight Booking System
              </h3>
              <p className="text-muted-foreground mb-6">
                Our flight booking system will be integrated with live airline APIs to provide real-time 
                availability, pricing, and instant booking confirmation. Contact us to enable this feature.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact for Integration
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Flights;
