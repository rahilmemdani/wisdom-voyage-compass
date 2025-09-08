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
  Minus,
  Sparkles,
  Heart,
  Plane,
  Camera,
  Mountain
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
  { value: "Honeymoon", icon: Heart, color: "text-pink-500" },
  { value: "Family", icon: Users, color: "text-blue-500" },
  { value: "Adventure", icon: Mountain, color: "text-green-500" },
  { value: "Luxury", icon: Sparkles, color: "text-yellow-500" },
  { value: "Business", icon: Plane, color: "text-gray-500" },
  { value: "Solo Travel", icon: Camera, color: "text-purple-500" },
  { value: "Group Tour", icon: Users, color: "text-orange-500" },
  { value: "Cruise Vacation", icon: Plane, color: "text-cyan-500" },
  { value: "Wildlife Safari", icon: Camera, color: "text-amber-500" },
  { value: "Cultural Tour", icon: Camera, color: "text-indigo-500" },
  { value: "Beach Holiday", icon: Sparkles, color: "text-teal-500" },
  { value: "Mountain Trek", icon: Mountain, color: "text-emerald-500" }
];

const requirementOptions = [
  { value: "Flights", icon: "✈️" },
  { value: "Hotel", icon: "🏨" },
  { value: "Land Package", icon: "🚗" },
  { value: "Visa", icon: "📄" },
  { value: "Insurance", icon: "🛡️" },
  { value: "Car Rental", icon: "🚙" },
  { value: "Tour Guide", icon: "🗺️" },
  { value: "Activities", icon: "🎯" }
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

  const watchAllFields = form.watch();

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

  const sendEmailJS = async (data: PlanTripForm) => {
    try {
      emailjs.init('IyzAcrjwMY4P_StOx');
      const serviceID = 'service_7jd4cv7';
      const teamTemplateID = 'template_66u4wg8';
      const customerTemplateID = 'template_98kngzo';

      const formatDate = (date: Date | undefined) => {
        return date ? format(date, 'PPP') : 'Not specified';
      };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/3 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <main className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full mb-6 shadow-lg relative">
              <MapPin className="h-10 w-10 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-yellow-800" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 leading-tight">
              Plan Your Dream Trip
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Share your details with us and we'll craft the perfect itinerary for your next adventure. 
              <br className="hidden sm:block" />
              <span className="inline-flex items-center gap-2 mt-2 font-medium text-primary">
                <CheckCircle className="h-4 w-4" />
                Get personalized recommendations within 24 hours!
              </span>
            </p>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Form Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{formProgress}%</span>
                <span className="text-sm text-muted-foreground">Complete</span>
              </div>
            </div>
            <div className="relative w-full bg-secondary/30 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${formProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Form Card */}
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-xl relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
            
            <CardHeader className="text-center pb-8 pt-8 relative">
              <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Trip Planning Form
              </CardTitle>
              <CardDescription className="text-lg mt-4 font-medium">
                Just fill in your basic details to get started. Everything else is optional!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-10 relative pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                  
                  {/* Enhanced Essential Information Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Essential Information</h3>
                      <div className="text-sm bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                        Required
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-3 text-lg font-semibold">
                              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                className="h-14 text-lg border-2 border-gray-200 focus:border-primary transition-colors rounded-xl"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-3 text-lg font-semibold">
                              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Mail className="h-4 w-4 text-primary" />
                              </div>
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                {...field} 
                                className="h-14 text-lg border-2 border-gray-200 focus:border-primary transition-colors rounded-xl"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="flex items-center gap-3 text-lg font-semibold">
                            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Phone className="h-4 w-4 text-primary" />
                            </div>
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 98765 43210" 
                              {...field} 
                              className="h-14 text-lg border-2 border-gray-200 focus:border-primary transition-colors rounded-xl max-w-md"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Enhanced Optional Trip Details Section */}
                  <Collapsible open={showOptionalFields} onOpenChange={setShowOptionalFields}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full h-16 text-lg font-semibold hover:bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl group"
                      >
                        <div className="w-8 h-8 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mr-3 transition-colors">
                          <Info className="h-4 w-4 text-primary" />
                        </div>
                        {showOptionalFields ? 'Hide' : 'Add'} Trip Details (Optional)
                        <ChevronDown className={`ml-3 h-5 w-5 transition-transform duration-300 ${showOptionalFields ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="space-y-8 pt-8">
                      <div className="flex items-center gap-3 pb-4 border-b-2 border-secondary/20">
                        <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Trip Details</h3>
                        <div className="text-sm bg-secondary/20 text-muted-foreground px-4 py-2 rounded-full font-semibold">
                          Optional
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-lg font-semibold">Dream Destination</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Paris, Dubai, Goa, Maldives" 
                                {...field} 
                                className="h-14 text-lg border-2 border-gray-200 focus:border-primary transition-colors rounded-xl"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Enhanced Date Pickers */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-3">
                              <FormLabel className="text-lg font-semibold">Departure Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "h-14 text-lg pl-4 text-left font-normal border-2 border-gray-200 hover:border-primary transition-colors rounded-xl",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick departure date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
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
                            <FormItem className="flex flex-col space-y-3">
                              <FormLabel className="text-lg font-semibold">Return Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "h-14 text-lg pl-4 text-left font-normal border-2 border-gray-200 hover:border-primary transition-colors rounded-xl",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick return date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
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

                      {/* Enhanced Travelers with +/- buttons */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-lg font-semibold">Adults</FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-4">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-14 w-14 rounded-xl border-2 hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => field.onChange(Math.max(1, (field.value || 2) - 1))}
                                    disabled={(field.value || 2) <= 1}
                                  >
                                    <Minus className="h-5 w-5" />
                                  </Button>
                                  <Input 
                                    type="number" 
                                    min="1" 
                                    max="20"
                                    value={field.value || 2} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 2)}
                                    className="h-14 text-lg text-center border-2 border-gray-200 focus:border-primary rounded-xl flex-1"
                                    readOnly
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-14 w-14 rounded-xl border-2 hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => field.onChange(Math.min(20, (field.value || 2) + 1))}
                                    disabled={(field.value || 2) >= 20}
                                  >
                                    <Plus className="h-5 w-5" />
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
                            <FormItem className="space-y-3">
                              <FormLabel className="text-lg font-semibold">Children (Under 12)</FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-4">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-14 w-14 rounded-xl border-2 hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                                    disabled={(field.value || 0) <= 0}
                                  >
                                    <Minus className="h-5 w-5" />
                                  </Button>
                                  <Input 
                                    type="number" 
                                    min="0" 
                                    max="10"
                                    value={field.value || 0} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    className="h-14 text-lg text-center border-2 border-gray-200 focus:border-primary rounded-xl flex-1"
                                    readOnly
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-14 w-14 rounded-xl border-2 hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => field.onChange(Math.min(10, (field.value || 0) + 1))}
                                    disabled={(field.value || 0) >= 10}
                                  >
                                    <Plus className="h-5 w-5" />
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
                          <FormItem className="space-y-3">
                            <FormLabel className="text-lg font-semibold">Trip Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-primary rounded-xl">
                                  <SelectValue placeholder="Select your trip type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {tripTypes.map((type) => {
                                  const IconComponent = type.icon;
                                  return (
                                    <SelectItem key={type.value} value={type.value} className="text-lg py-3">
                                      <div className="flex items-center gap-3">
                                        <IconComponent className={`h-4 w-4 ${type.color}`} />
                                        {type.value}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormLabel className="text-lg font-semibold">
                              Budget Per Person: <span className="text-primary font-bold">₹{watchedBudget[0]?.toLocaleString()}</span>
                            </FormLabel>
                            <FormControl>
                              <div className="px-6 py-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border-2 border-primary/10">
                                <Slider
                                  min={10000}
                                  max={1000000}
                                  step={10000}
                                  value={field.value || [50000]}
                                  onValueChange={field.onChange}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-4 px-2">
                                  <span className="font-medium">₹10K</span>
                                  <span className="font-medium">₹5L</span>
                                  <span className="font-medium">₹10L+</span>
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
                          <FormItem className="space-y-4">
                            <FormLabel className="text-lg font-semibold">What do you need help with?</FormLabel>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-muted/30 to-muted/20 rounded-2xl border-2 border-muted/20">
                              {requirementOptions.map((requirement) => (
                                <FormField
                                  key={requirement.value}
                                  control={form.control}
                                  name="requirements"
                                  render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-xl hover:bg-white/50 transition-colors">
                                      <FormControl>
                                        <Checkbox
                                          checked={watchedRequirements.includes(requirement.value)}
                                          onCheckedChange={(checked) => {
                                            const updatedRequirements = checked
                                              ? [...watchedRequirements, requirement.value]
                                              : watchedRequirements.filter((item) => item !== requirement.value);
                                            field.onChange(updatedRequirements);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-medium cursor-pointer flex items-center gap-2">
                                        <span className="text-lg">{requirement.icon}</span>
                                        {requirement.value}
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
                          <FormItem className="space-y-3">
                            <FormLabel className="text-lg font-semibold">Special Requests or Preferences</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about dietary restrictions, accessibility needs, special occasions, or any other preferences..."
                                className="min-h-[140px] text-lg resize-none border-2 border-gray-200 focus:border-primary rounded-xl"
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Enhanced Submit Button */}
                  <div className="pt-8 border-t-2 border-primary/10">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Submitting Your Request...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          Submit Trip Request
                        </>
                      )}
                    </Button>
                    <div className="text-center mt-4 p-4 bg-primary/5 rounded-xl">
                      <p className="text-sm text-muted-foreground font-medium">
                        🚀 We'll get back to you within 24 hours with a personalized quote
                      </p>
                    </div>
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
