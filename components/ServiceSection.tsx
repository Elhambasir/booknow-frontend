import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, UserCheck, Shield, Star, Headphones } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: UserCheck,
      title: "Meet & Greet",
      description: "Professional chauffeurs waiting for you with personalized signage at arrivals.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "Reliable & On-Time",
      description: "Flight monitoring ensures we're always there when you land, day or night.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Heart,
      title: "Customer Oriented",
      description: "Your comfort and satisfaction are our top priorities. Luxury in every detail.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Shield,
      title: "Fully Licensed & Insured",
      description: "All vehicles and drivers are fully licensed, insured, and regularly inspected.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Star,
      title: "Premium Fleet",
      description: "Modern, luxury vehicles equipped with latest amenities for your comfort.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support for any queries or last-minute changes.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Our Airport Taxi Service?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with our premium airport transfer service. 
            We combine reliability, luxury, and professional service to make your journey exceptional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Daily Rides</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Service Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;