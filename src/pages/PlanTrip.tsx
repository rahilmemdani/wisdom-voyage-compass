import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const planTripSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  destination: z.string().optional(),
  travelDates: z.string().optional(),
  adults: z.number().min(1).optional(),
  children: z.number().min(0).optional(),
  budget: z.array(z.number()).optional(),
  tripType: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type PlanTripForm = z.infer<typeof planTripSchema>;

const tripTypes = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Luxury",
  "Business",
  "Solo Travel",
  "Group Tour",
  "Pilgrimage",
];

const requirementOptions = [
  "Flights",
  "Hotel",
  "Land Package",
  "Visa",
  "Insurance",
];

const PlanTrip = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PlanTripForm>({
    resolver: zodResolver(planTripSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelDates: "",
      adults: 2,
      children: 0,
      budget: [50000],
      tripType: "",
      requirements: [],
      notes: "",
    },
  });

  const formatWhatsAppMessage = (data: PlanTripForm) => {
    let message = `*New Trip Planning Request*\n\n`;
    message += `*Name:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Phone:* ${data.phone}\n`;
    
    if (data.destination) message += `*Destination:* ${data.destination}\n`;
    if (data.travelDates) message += `*Travel Dates:* ${data.travelDates}\n`;
    if (data.adults || data.children) {
      message += `*Travelers:* ${data.adults || 0} Adults`;
      if (data.children) message += `, ${data.children} Children`;
      message += `\n`;
    }
    if (data.budget) message += `*Budget:* ₹${data.budget[0]?.toLocaleString()}\n`;
    if (data.tripType) message += `*Trip Type:* ${data.tripType}\n`;
    if (data.requirements && data.requirements.length > 0) {
      message += `*Requirements:* ${data.requirements.join(", ")}\n`;
    }
    if (data.notes) message += `*Additional Notes:* ${data.notes}\n`;
    
    return encodeURIComponent(message);
  };

  const sendEmailJS = async (data: PlanTripForm) => {
    try {
      // EmailJS configuration - You'll need to replace these with your actual EmailJS credentials
      const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
      const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
      const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

      const templateParams = {
        to_email: 'rizan@wisdomtravel.co.in',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        destination: data.destination || 'Not specified',
        travel_dates: data.travelDates || 'Not specified',
        adults: data.adults || 0,
        children: data.children || 0,
        budget: data.budget?.[0]?.toLocaleString() || 'Not specified',
        trip_type: data.tripType || 'Not specified',
        requirements: data.requirements?.join(', ') || 'None',
        notes: data.notes || 'None',
        subject: `New Trip Planning Request from ${data.name}`,
        message: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Destination: ${data.destination || 'Not specified'}
Travel Dates: ${data.travelDates || 'Not specified'}
Travelers: ${data.adults || 0} Adults${data.children ? `, ${data.children} Children` : ''}
Budget: ₹${data.budget?.[0]?.toLocaleString() || 'Not specified'}
Trip Type: ${data.tripType || 'Not specified'}
Requirements: ${data.requirements?.join(', ') || 'None'}
Additional Notes: ${data.notes || 'None'}
        `.trim()
      };

      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  const onSubmit = async (data: PlanTripForm) => {
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const emailSent = await sendEmailJS(data);
      
      if (emailSent) {
        // Open WhatsApp
        const whatsappMessage = formatWhatsAppMessage(data);
        const whatsappUrl = `https://wa.me/919856664440?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        
        toast.success("Trip request submitted successfully! We'll get back to you soon.");
        form.reset();
      } else {
        toast.error("Failed to send email. Please check your EmailJS configuration and try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedRequirements = form.watch("requirements") || [];
  const watchedBudget = form.watch("budget") || [50000];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Plan Your Dream Trip</h1>
            <p className="text-lg text-muted-foreground">
              Let us help you create unforgettable memories. Fill out the form below and we'll get back to you soon!
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Trip Planning Form
              </CardTitle>
              <CardDescription>
                Fields marked with * are required. All other information is optional but helps us serve you better.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Contact Details - Mandatory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Optional Trip Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Trip Details (Optional)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Destination</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Paris, Dubai, Goa" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="travelDates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Travel Dates
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 15-25 March 2024" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adults</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                placeholder="Number of adults"
                                value={field.value || ""} 
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="children (below 12 year)"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Children</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                placeholder="Number of children"
                                value={field.value || ""} 
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tripType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Trip Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select trip type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {tripTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Budget Range: ₹{watchedBudget[0]?.toLocaleString()}</FormLabel>
                          <FormControl>
                            <Slider
                              min={10000}
                              max={1000000}
                              step={10000}
                              value={field.value || [50000]}
                              onValueChange={field.onChange}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requirements"
                      render={() => (
                        <FormItem>
                          <FormLabel>Requirements</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {requirementOptions.map((requirement) => (
                              <FormField
                                key={requirement}
                                control={form.control}
                                name="requirements"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={watchedRequirements.includes(requirement)}
                                        onCheckedChange={(checked) => {
                                          const updatedRequirements = checked
                                            ? [...watchedRequirements, requirement]
                                            : watchedRequirements.filter((item) => item !== requirement);
                                          field.onChange(updatedRequirements);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {requirement}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about any special requirements, preferences, or questions..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Trip Request
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlanTrip;