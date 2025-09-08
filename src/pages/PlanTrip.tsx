import { useState, useEffect } from "react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Calendar as CalendarIcon, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ChevronDown, 
  CheckCircle,
  Info,
  Loader2,
  Plus,
  Minus
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const planTripSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  destination: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  adults: z.number().min(1).max(20).optional(),
  children: z.number().min(0).max(10).optional(),
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
  "Cruise Vacation",
  "Wildlife Safari",
  "Cultural Tour",
  "Beach Holiday",
  "Mountain Trek"
];

const requirementOptions = [
  "Flights",
  "Hotel",
  "Land Package", 
  "Visa",
  "Insurance",
  "Car Rental",
  "Tour Guide",
  "Activities"
];

const PlanTrip = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const form = useForm<PlanTripForm>({
    resolver: zodResolver(planTripSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      startDate: undefined,
      endDate: undefined,
      adults: 2,
      children: 0,
      budget: [50000],
      tripType: "",
      requirements: [],
      notes: "",
    },
  });

  // Watch all form fields for progress calculation
  const watchAllFields = form.watch();

  // Calculate form progress with useEffect
  useEffect(() => {
    const calculateProgress = () => {
      const requiredFields = ['name', 'email', 'phone'];
      const optionalFields = ['destination', 'startDate', 'tripType'];
      
      const requiredComplete = requiredFields.filter(field => {
        const value = watchAllFields[field];
        return value && (typeof value === 'string' ? value.length > 0 : true);
      }).length;
      
      const optionalComplete = optionalFields.filter(field => {
        const value = watchAllFields[field];
        return value && (typeof value === 'string' ? value.length > 0 : true);
      }).length;
      
      const progress = ((requiredComplete / requiredFields.length) * 60) + 
                      ((optionalComplete / optionalFields.length) * 40);
      
      setFormProgress(Math.round(progress));
    };

    calculateProgress();
  }, [watchAllFields]);

  // const sendEmailJS = async (data: PlanTripForm) => {
  //   try {
  //     emailjs.init('IyzAcrjwMY4P_StOx');
      
  //     const serviceID = 'service_7jd4cv7';
  //     const templateID = 'template_66u4wg8';
      
  //     const formatDate = (date: Date | undefined) => {
  //       return date ? format(date, 'PPP') : 'Not specified';
  //     };
      
  //     const templateParams = {
  //       to_name: 'Wisdom Travel Team',
  //       from_name: data.name,
  //       from_email: data.email,
  //       phone: data.phone,
  //       destination: data.destination || 'Not specified',
  //       start_date: formatDate(data.startDate),
  //       end_date: formatDate(data.endDate),
  //       adults: data.adults || 0,
  //       children: data.children || 0,
  //       budget: data.budget?.[0]?.toLocaleString() || 'Not specified',
  //       trip_type: data.tripType || 'Not specified',
  //       requirements: data.requirements?.join(', ') || 'None',
  //       notes: data.notes || 'None',
  //       reply_to: data.email,
  //     };

  //     console.log('Sending email with params:', templateParams);
      
  //     const result = await emailjs.send(serviceID, templateID, templateParams);
  //     console.log('Email sent successfully:', result);
  //     return result.status === 200;
  //   } catch (error) {
  //     console.error('Email sending failed:', error);
  //     throw error;
  //   }
  // };

  const sendEmailJS = async (data: PlanTripForm) => {
    try {
      emailjs.init('IyzAcrjwMY4P_StOx');
      const serviceID = 'service_7jd4cv7';
      // For team
      const teamTemplateID = 'template_66u4wg8'; 
       // For customer confirmation
      const customerTemplateID = 'template_98kngzo';
  
      const formatDate = (date: Date | undefined) => {
        return date ? format(date, 'PPP') : 'Not specified';
      };
  
      // Email 1 → Team
      const teamParams = {
        to_name: 'Wisdom Travel Team',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        destination: data.destination || 'Not specified',
        start_date: formatDate(data.startDate),
        end_date: formatDate(data.endDate),
        adults: data.adults || 0,
        children: data.children || 0,
        budget: data.budget?.[0]?.toLocaleString() || 'Not specified',
        trip_type: data.tripType || 'Not specified',
        requirements: data.requirements?.join(', ') || 'None',
        notes: data.notes || 'None',
        reply_to: data.email,
      };
  
      console.log('Sending email to team:', teamParams);
      const teamResult = await emailjs.send(serviceID, teamTemplateID, teamParams);
      console.log('Team email sent successfully:', teamResult);
  
      // Email 2 → Customer
      const customerParams = {
        name: data.name,
        title: data.destination || 'your trip request',
        to_email: data.email
      };
  
      console.log('Sending confirmation to customer:', customerParams);
      const customerResult = await emailjs.send(serviceID, customerTemplateID, customerParams);
      console.log('Customer email sent successfully:', customerResult);
  
      return teamResult.status === 200 && customerResult.status === 200;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  };
  
  const onSubmit = async (data: PlanTripForm) => {
    setIsSubmitting(true);
    
    try {
      await sendEmailJS(data);
      toast.success("🎉 Trip request submitted successfully! We'll contact you within 24 hours.", {
        duration: 5000,
      });
      form.reset();
      setShowOptionalFields(false);
      setFormProgress(0);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("❌ Failed to submit your request. Please try again or contact us directly.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedRequirements = form.watch("requirements") || [];
  const watchedBudget = form.watch("budget") || [50000];
  const watchedAdults = form.watch("adults") || 2;
  const watchedChildren = form.watch("children") || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Plan Your Dream Trip</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your details with us and we'll craft the perfect itinerary for your next adventure. 
              Get personalized recommendations within 24 hours!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Form Progress</span>
              <span className="text-sm font-medium text-primary">{formProgress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${formProgress}%` }}
              />
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Trip Planning Form
              </CardTitle>
              <CardDescription className="text-base">
                Just fill in your basic details to get started. Everything else is optional!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Essential Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">Essential Information</h3>
                      <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Required
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base font-medium">
                              <Users className="h-4 w-4 text-primary" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                className="h-12 text-base"
                              />
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
                            <FormLabel className="flex items-center gap-2 text-base font-medium">
                              <Mail className="h-4 w-4 text-primary" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                {...field} 
                                className="h-12 text-base"
                              />
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
                          <FormLabel className="flex items-center gap-2 text-base font-medium">
                            <Phone className="h-4 w-4 text-primary" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 98765 43210" 
                              {...field} 
                              className="h-12 text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Optional Trip Details Section */}
                  <Collapsible open={showOptionalFields} onOpenChange={setShowOptionalFields}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full h-12 text-base font-medium hover:bg-primary/5"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        {showOptionalFields ? 'Hide' : 'Add'} Trip Details (Optional)
                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showOptionalFields ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="space-y-6 pt-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-xl font-semibold text-foreground">Trip Details</h3>
                        <div className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          Optional
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Dream Destination</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Paris, Dubai, Goa, Maldives" 
                                {...field} 
                                className="h-12 text-base"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Date Pickers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-base font-medium">Departure Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "h-12 text-base pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick departure date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-base font-medium">Return Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "h-12 text-base pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick return date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Travelers with +/- buttons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Adults</FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12"
                                    onClick={() => field.onChange(Math.max(1, (field.value || 2) - 1))}
                                    disabled={(field.value || 2) <= 1}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <Input 
                                    type="number" 
                                    min="1" 
                                    max="20"
                                    value={field.value || 2} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 2)}
                                    className="h-12 text-base text-center"
                                    readOnly
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12"
                                    onClick={() => field.onChange(Math.min(20, (field.value || 2) + 1))}
                                    disabled={(field.value || 2) >= 20}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="children"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Children (Under 12)</FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12"
                                    onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                                    disabled={(field.value || 0) <= 0}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <Input 
                                    type="number" 
                                    min="0" 
                                    max="10"
                                    value={field.value || 0} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    className="h-12 text-base text-center"
                                    readOnly
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12"
                                    onClick={() => field.onChange(Math.min(10, (field.value || 0) + 1))}
                                    disabled={(field.value || 0) >= 10}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="tripType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Trip Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 text-base">
                                  <SelectValue placeholder="Select your trip type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {tripTypes.map((type) => (
                                  <SelectItem key={type} value={type} className="text-base">
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Budget Per Person: ₹{watchedBudget[0]?.toLocaleString()}
                            </FormLabel>
                            <FormControl>
                              <div className="px-4 py-4 bg-muted/30 rounded-lg">
                                <Slider
                                  min={10000}
                                  max={1000000}
                                  step={10000}
                                  value={field.value || [50000]}
                                  onValueChange={field.onChange}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                  <span>₹10K</span>
                                  <span>₹5L</span>
                                  <span>₹10L+</span>
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="requirements"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">What do you need help with?</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                              {requirementOptions.map((requirement) => (
                                <FormField
                                  key={requirement}
                                  control={form.control}
                                  name="requirements"
                                  render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0">
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
                                      <FormLabel className="text-sm font-normal cursor-pointer">
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
                            <FormLabel className="text-base font-medium">Special Requests or Preferences</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about dietary restrictions, accessibility needs, special occasions, or any other preferences..."
                                className="min-h-[120px] text-base resize-none"
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-semibold"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Your Request...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Trip Request
                        </>
                      )}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      We'll get back to you within 24 hours with a personalized quote
                    </p>
                  </div>
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
