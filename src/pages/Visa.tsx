
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Clock, FileText, Users, Phone, MessageCircle } from 'lucide-react';

const Visa = () => {
  const visaServices = [
    {
      country: 'United States',
      flag: '🇺🇸',
      types: ['Tourist', 'Business', 'Student'],
      processingTime: '15-20 days',
      price: 'From ₹15,000',
      requirements: ['Valid Passport', 'DS-160 Form', 'Interview', 'Financial Documents'],
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      types: ['Tourist', 'Business', 'Student'],
      processingTime: '10-15 days',
      price: 'From ₹12,000',
      requirements: ['Valid Passport', 'Application Form', 'Biometrics', 'Financial Proof'],
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      types: ['Tourist', 'Business', 'Study'],
      processingTime: '12-18 days',
      price: 'From ₹10,000',
      requirements: ['Valid Passport', 'Online Application', 'Biometrics', 'Medical Exam'],
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      types: ['Tourist', 'Business', 'Student'],
      processingTime: '8-12 days',
      price: 'From ₹8,000',
      requirements: ['Valid Passport', 'ImmiAccount', 'Health Insurance', 'Financial Evidence'],
    },
    {
      country: 'Schengen',
      flag: '🇪🇺',
      types: ['Tourist', 'Business', 'Transit'],
      processingTime: '10-15 days',
      price: 'From ₹7,000',
      requirements: ['Valid Passport', 'Application Form', 'Travel Insurance', 'Itinerary'],
    },
    {
      country: 'Singapore',
      flag: '🇸🇬',
      types: ['Tourist', 'Business', 'Transit'],
      processingTime: '3-5 days',
      price: 'From ₹3,000',
      requirements: ['Valid Passport', 'Online Form', 'Photo', 'Travel Plans'],
    },
  ];

  const visaProcess = [
    {
      step: 1,
      title: 'Consultation',
      description: 'Free consultation to understand your travel requirements and visa type',
      icon: Users,
    },
    {
      step: 2,
      title: 'Documentation',
      description: 'Guidance on required documents and assistance with form filling',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Application',
      description: 'Submit your application with proper documentation and fees',
      icon: CheckCircle,
    },
    {
      step: 4,
      title: 'Processing',
      description: 'Track your application status and provide updates throughout',
      icon: Clock,
    },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=Hello, I would like to inquire about visa services.', '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 container mx-auto section-padding text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Visa Services Made Simple
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional visa assistance and documentation support for hassle-free international travel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Start Application
            </Button>
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary">
              Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Visa Services */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Visa Services by Country
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert assistance for visa applications to popular destinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visaServices.map((service, index) => (
              <Card key={index} className="group hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4">{service.flag}</div>
                  <CardTitle className="text-xl font-serif text-primary">{service.country}</CardTitle>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {service.types.map((type, typeIndex) => (
                      <Badge key={typeIndex} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-primary">Processing Time</div>
                      <div className="text-muted-foreground">{service.processingTime}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Service Fee</div>
                      <div className="text-muted-foreground">{service.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Key Requirements:</h4>
                    <ul className="space-y-1">
                      {service.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 group-hover:bg-accent group-hover:text-white transition-colors">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Our Visa Application Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, transparent, and efficient visa processing in 4 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visaProcess.map((process, index) => (
              <Card key={index} className="text-center bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <process.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-accent mb-2">Step {process.step}</div>
                  <h3 className="text-lg font-semibold text-primary mb-3">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto section-padding">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    Need Help with Your Visa Application?
                  </h3>
                  <p className="text-muted-foreground">
                    Our visa experts are here to guide you through every step of the process
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold text-primary mb-2">Call Us</h4>
                      <p className="text-muted-foreground mb-4">Speak with our visa experts</p>
                      <Button variant="outline" className="w-full">
                        +91 98765 43210
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold text-primary mb-2">WhatsApp</h4>
                      <p className="text-muted-foreground mb-4">Quick assistance via WhatsApp</p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleWhatsAppClick}
                      >
                        Chat Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mt-8">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Schedule Free Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visa;
