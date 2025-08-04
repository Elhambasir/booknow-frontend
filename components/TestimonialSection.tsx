import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Executive",
      avatar: "SJ",
      rating: 5,
      text: "Exceptional service! The chauffeur was waiting with my name sign and helped with my luggage. The Mercedes was immaculate and the journey was smooth. Will definitely use again.",
      location: "London to Heathrow",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tourist",
      avatar: "MC",
      rating: 5,
      text: "Perfect start to our UK holiday! Despite our flight being delayed, the driver was still there waiting. Professional, friendly, and the car was luxurious. Highly recommended!",
      location: "Heathrow to Central London",
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Frequent Traveler",
      avatar: "EW",
      rating: 5,
      text: "I travel frequently for work and this is by far the best airport taxi service I've used. Always on time, clean vehicles, and courteous drivers. Worth every penny!",
      location: "Gatwick to Birmingham",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Family Traveler",
      avatar: "DT",
      rating: 5,
      text: "Booked the SUV for our family of 5 with luggage. Plenty of space, child seats provided, and the driver was amazing with our kids. Made our airport transfer stress-free!",
      location: "Manchester to Airport",
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      role: "Corporate Client",
      avatar: "LR",
      rating: 5,
      text: "Our company uses them for all VIP client transfers. Reliable, professional, and always impressive. The booking system is easy and the service is consistently excellent.",
      location: "Stansted to City",
    },
    {
      id: 6,
      name: "James Mitchell",
      role: "Wedding Party",
      avatar: "JM",
      rating: 5,
      text: "Booked multiple vehicles for our wedding party. All drivers arrived on time, cars were decorated beautifully, and the coordination was flawless. Made our special day perfect!",
      location: "Hotel to Venue",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Customer Reviews</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what thousands of satisfied customers 
            have to say about their experience with our premium airport taxi service.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-background/80 backdrop-blur-sm relative overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-12 w-12 text-secondary" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="border-2 border-secondary/20">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-secondary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-secondary font-medium mt-1">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">4.9/5</div>
                  <div className="text-sm text-primary-foreground/80">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">12,500+</div>
                  <div className="text-sm text-primary-foreground/80">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                  <div className="text-sm text-primary-foreground/80">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-sm text-primary-foreground/80">Customer Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;