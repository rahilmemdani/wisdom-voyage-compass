import { Star } from 'lucide-react';
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
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "Thank you so much to the team at Wisdom Travel and Tours and shoutout to Mayur and Sohail for organizing our trip across Europe..."
  },
  {
    id: 2,
    name: "Rishaya Palkhiwala",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "This year, I have been booking flights through Rizan, international and domestic. Previously I used to spend a lot of time..."
  },
  {
    id: 3,
    name: "Zeyd Ladha",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "A vacation is not just a change of location. It is an important time spent with loved ones as you make memories and recharge and..."
  },
  {
    id: 4,
    name: "Sarah Ahmed",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "Excellent service and amazing destinations. The team made our honeymoon trip absolutely perfect with attention to every detail."
  },
  {
    id: 5,
    name: "John Smith",
    image: "/lovable-uploads/f56ce2f7-71cf-4ba2-a4b6-5c6f98826e6f.png",
    rating: 5,
    review: "Professional, reliable, and always helpful. They've been our go-to travel agency for the past 3 years. Highly recommended!"
  }
];

const CustomerReviews = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say About Us
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => {
                const isActive = index === current;
                return (
                  <CarouselItem key={review.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className={`rounded-2xl p-6 transition-all duration-500 h-full ${
                      isActive 
                        ? 'bg-white shadow-2xl scale-110 z-10 border-2 border-red-200 transform' 
                        : 'bg-gray-50 shadow-md scale-95 opacity-70 border border-gray-200'
                    }`}>
                      {/* Client Photo */}
                      <div className="flex justify-center mb-6">
                        <div className={`rounded-full overflow-hidden shadow-md transition-all duration-300 ${
                          isActive ? 'w-24 h-24 border-4 border-red-200' : 'w-20 h-20 border-4 border-gray-200'
                        }`}>
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Client Name */}
                      <h4 className={`font-bold text-center mb-2 transition-all duration-300 ${
                        isActive ? 'text-xl text-gray-800' : 'text-lg text-gray-600'
                      }`}>
                        {review.name}
                      </h4>

                      {/* Star Rating */}
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`transition-all duration-300 ${
                              isActive ? 'w-5 h-5' : 'w-4 h-4'
                            } ${
                              starIndex < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className={`leading-relaxed text-center transition-all duration-300 ${
                        isActive ? 'text-gray-700 text-sm' : 'text-gray-500 text-xs'
                      }`}>
                        "{review.review}"
                      </p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-red border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-600" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-red border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-600" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;