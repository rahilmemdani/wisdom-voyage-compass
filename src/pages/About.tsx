
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Award, Globe, Heart, Shield, Clock, Star, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Globe, label: 'Destinations', value: '150+' },
    { icon: Award, label: 'Years Experience', value: '20+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We live and breathe travel, bringing you experiences that create lifelong memories.',
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Your safety and satisfaction are our top priorities. We deliver on our promises.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance ensures your journey is smooth from start to finish.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Every detail is carefully planned to exceed your expectations and deliver excellence.',
    },
  ];

  const team = [
    {
      name: 'Riyaz Vasani',
      role: 'Managing Partner',
      experience: '30+ years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Passionate travel enthusiast with extensive experience in hospitality and tourism industry.',
    },
    {
      name: 'Sohail Rupani',
      role: 'Managing Partner',
      experience: '25+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b376?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Expert in travel operations and ticketing, ensuring seamless travel experiences.',
    },
    {
      name: 'Rizan Vasani',
      role: 'Senior Associate',
      experience: '2+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Specialist in corporate ticketings with deep knowledge of group travel management.',
    },
  ];

  const milestones = [
    { year: '2009', event: 'Founded Wisdom Tours and Travels' },
    { year: '2012', event: 'Expanded to international destinations' },
    { year: '2015', event: 'Launched online booking platform' },
    { year: '2018', event: 'Reached 5,000+ satisfied customers' },
    { year: '2021', event: 'Introduced digital visa services' },
    { year: '2024', event: 'Celebrating 6 years of excellence' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 container mx-auto section-padding text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            About Wisdom Tours & Travels
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            For over 6 years, we've been crafting extraordinary travel experiences that connect people with the world's most beautiful destinations
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white shadow-lg">
                <CardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2009 with a simple vision - to make travel accessible, memorable, and transformative 
                  for everyone. What started as a small travel agency has grown into one of India's most trusted 
                  travel partners.
                </p>
                <p>
                  Our journey began with a passionate team of travel enthusiasts who believed that travel is not 
                  just about visiting places, but about creating connections, understanding cultures, and building 
                  memories that last a lifetime.
                </p>
                <p>
                  Today, we've helped over 10,000 travelers explore 150+ destinations across the globe, from 
                  exotic international locations to hidden gems within India. Our commitment to excellence and 
                  personalized service has earned us the trust and loyalty of countless families and individuals.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Our Story"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-white shadow-lg hover-lift">
                <CardContent className="p-8">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Dedicated professionals committed to making your travels exceptional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center bg-white shadow-lg hover-lift">
                <CardContent className="p-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.experience} experience</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our 6-year journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <Card className="flex-1 bg-white shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied travelers who have trusted us with their dreams. 
                Let us create your perfect travel experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Plan Your Trip
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
