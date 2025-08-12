import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/20 to-primary/10 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <nav className="flex justify-center items-center space-x-2 text-sm text-muted-foreground">
              <span>Home</span>
              <span>/</span>
              <span className="text-primary font-medium">Contact Us</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Select value={formData.title} onValueChange={(value) => handleInputChange('title', value)}>
                      <SelectTrigger className="bg-gray-100 border-0">
                        <SelectValue placeholder="Mr" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr</SelectItem>
                        <SelectItem value="ms">Ms</SelectItem>
                        <SelectItem value="mrs">Mrs</SelectItem>
                        <SelectItem value="dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-gray-100 border-0"
                      required
                    />
                    
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-gray-100 border-0"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-100 border-0"
                      required
                    />
                    
                    <div className="flex">
                      <div className="flex items-center bg-gray-100 px-3 rounded-l-md border-r">
                        <img src="https://flagcdn.com/16x12/in.png" alt="India" className="w-4 h-3 mr-2" />
                        <span className="text-sm text-muted-foreground">+91</span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="bg-gray-100 border-0 rounded-l-none"
                        required
                      />
                    </div>
                  </div>

                  <Textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-gray-100 border-0 min-h-[120px]"
                    required
                  />

                  <Button 
                    type="submit" 
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium text-lg"
                  >
                    Submit Form
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Wisdom Travel And Tours
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      G-14, Ground Floor, Dheeraj Heritage,<br />
                      S.V. Road Junction, Santacruz West,<br />
                      Mumbai 400-054
                    </p>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Phone No:
                    </h4>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">+91 9856664440</p>
                      <p className="text-muted-foreground">+91 9820544555</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Id:
                    </h4>
                    <p className="text-muted-foreground">sales@wisdomtravel.co.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;