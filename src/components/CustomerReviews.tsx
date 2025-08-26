import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
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
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-200/50 border border-red-100 h-full">
                    {/* Client Photo */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-red-100 shadow-md">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Client Name */}
                    <h4 className="text-xl font-bold text-gray-800 text-center mb-2">
                      {review.name}
                    </h4>

                    {/* Star Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-5 h-5 ${
                            index < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm leading-relaxed text-center">
                      "{review.review}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;