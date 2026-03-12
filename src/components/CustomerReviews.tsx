import { Star, Quote, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const reviews = [
  {
    id: 1,
    name: "Farid Pirani",
    role: "Global Traveler",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "The team at Wisdom Travel organized our trip across Europe. Mayur and Sohail's attention to detail was exceptional. Truly a premium experience from start to finish."
  },
  {
    id: 2,
    name: "Rishaya Palkhiwala",
    role: "Corporate Executive",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "I've been booking flights through Rizan for years. The speed and reliability are unmatched. They've saved me so much time and hassle on my international travels."
  },
  {
    id: 3,
    name: "Zeyd Ladha",
    role: "Family Traveler",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "A vacation is about memories. Wisdom Travel understands that. Every detail was handled with care, allowing my family to focus on recharging and connecting."
  },
  {
    id: 4,
    name: "Sarah Ahmed",
    role: "Honeymooner",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "Our honeymoon was absolutely perfect. The team went above and beyond to ensure everything was special. I couldn't have asked for a better travel partner."
  }
];

const CustomerReviews = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="min-h-[100dvh] lg:h-[100dvh] snap-start relative flex flex-col justify-center bg-[#F1F5F9] py-16 lg:py-0 overflow-x-hidden lg:overflow-hidden no-scrollbar">
      <div className="container-custom w-full px-6 sm:px-8 lg:px-0">
        
        {/* Layout Wrapper: Grid for Desktop, Block for Mobile */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Header Entity - Matched to Services/Destinations Layout */}
          <div className="lg:col-span-4 text-left space-y-3 lg:space-y-6 animate-fade-in lg:pr-8 mb-10 lg:mb-0">
            <div className="space-y-2 lg:space-y-3">
              <div className="inline-flex items-center px-2 py-0.5 bg-primary/10 rounded-full text-primary font-bold text-[8px] lg:text-[10px] tracking-widest uppercase">
                Testimonials
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
                What Our <br className="hidden lg:block" /> <span className="gradient-text">Guests Say</span>
              </h2>
            </div>
            <p className="max-w-[280px] lg:max-w-md text-[13px] lg:text-lg text-slate-600 leading-relaxed font-medium">
              Real stories from travelers who experienced the world with Wisdom Voyage.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-1 bg-primary/30 rounded-full" />
              <span className="text-slate-400 text-sm font-medium italic">Scroll through the love</span>
            </div>
          </div>

          {/* Carousel Entity - Premium Cards */}
          <div className="lg:col-span-8 relative px-0">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 flex no-scrollbar touch-pan-y items-center py-10">
                {reviews.map((review, index) => {
                  const isActive = index === current;
                  return (
                    <CarouselItem key={review.id} className="basis-[280px] sm:basis-[340px] lg:basis-[400px] pl-4 lg:pl-6">
                      <div 
                        className={`relative group transition-all duration-700 animate-slide-up ${
                          isActive ? 'scale-105 z-10' : 'scale-95 opacity-60 grayscale-[0.5]'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col h-[380px] sm:h-[440px] border border-white">
                          {/* Quote Icon Background */}
                          <Quote className="absolute -top-6 -right-6 w-32 h-32 text-slate-50 opacity-[0.03] rotate-12" />
                          
                          <div className="relative z-10 flex flex-col h-full">
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                              ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-700 text-sm sm:text-lg leading-relaxed font-medium mb-auto italic">
                              "{review.review}"
                            </p>

                            {/* Divider */}
                            <div className="w-12 h-1 bg-primary/20 rounded-full my-8 transition-all duration-500 group-hover:w-full" />

                            {/* Footer Info */}
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg shadow-slate-200 flex-shrink-0">
                                <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-serif font-bold text-slate-900 text-lg leading-tight">{review.name}</span>
                                <span className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">{review.role}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Navigation */}
              <div className="hidden lg:flex absolute -bottom-14 left-0 gap-3">
                <CarouselPrevious className="static translate-y-0 h-11 w-11 rounded-xl border-2 border-slate-200 hover:border-primary hover:text-primary transition-all shadow-none" />
                <CarouselNext className="static translate-y-0 h-11 w-11 rounded-xl border-2 border-slate-200 hover:border-primary hover:text-primary transition-all shadow-none" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;