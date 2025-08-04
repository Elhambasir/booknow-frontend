import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Users, ArrowRight } from "lucide-react";

const DriversSection = () => {
  const drivers = [
    {
      id: 1,
      name: "James Wilson",
      avatar: "JW",
      experience: "8 years",
      location: "London",
      rating: 4.9,
      languages: ["English", "French"],
      specialties: ["Airport Transfers", "Corporate Travel"],
      rides: "2,500+",
      description: "Professional chauffeur with extensive knowledge of London airports and traffic patterns.",
    },
    {
      id: 2,
      name: "Mohammed Ali",
      avatar: "MA",
      experience: "12 years",
      location: "Birmingham",
      rating: 5.0,
      languages: ["English", "Arabic", "Urdu"],
      specialties: ["Long Distance", "VIP Service"],
      rides: "4,200+",
      description: "Experienced driver specializing in luxury transfers and executive transportation.",
    },
    {
      id: 3,
      name: "Sarah Davis",
      avatar: "SD",
      experience: "6 years",
      location: "Manchester",
      rating: 4.8,
      languages: ["English", "Spanish"],
      specialties: ["Family Travel", "Wedding Transport"],
      rides: "1,800+",
      description: "Friendly and reliable driver with excellent customer service skills and family-friendly approach.",
    },
    {
      id: 4,
      name: "Robert Chen",
      avatar: "RC",
      experience: "10 years",
      location: "Edinburgh",
      rating: 4.9,
      languages: ["English", "Mandarin"],
      specialties: ["Business Travel", "Tourist Tours"],
      rides: "3,100+",
      description: "Knowledgeable local expert providing premium service for business and leisure travelers.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Our Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Meet Our Happy Drivers
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our professional chauffeurs are the heart of our service. Each driver is carefully 
            selected, trained, and committed to providing you with an exceptional travel experience.
          </p>
        </div>

        {/* Drivers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {drivers.map((driver) => (
            <Card
              key={driver.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-20 h-20 mx-auto border-4 border-secondary/20 group-hover:border-secondary/40 transition-colors duration-300">
                    <AvatarImage src="" alt={driver.name} />
                    <AvatarFallback className="bg-secondary/10 text-primary font-bold text-lg">
                      {driver.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Name & Rating */}
                <div>
                  <h3 className="text-lg font-semibold text-primary">{driver.name}</h3>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {renderStars(driver.rating)}
                    <span className="text-sm text-muted-foreground ml-2">{driver.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{driver.experience} experience</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{driver.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{driver.rides} completed rides</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {driver.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>

                {/* Specialties */}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-primary">Specialties:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {driver.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {driver.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Drive With Us?</h3>
              <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Join our team of professional drivers and be part of the UK's premier airport taxi service. 
                We offer competitive rates, flexible schedules, and ongoing support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-primary-foreground/80">
                  <div className="text-sm">Call us:</div>
                  <div className="font-semibold">+44 20 7946 0958</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-primary-foreground/20">
                <div>
                  <div className="text-2xl font-bold text-secondary">£150+</div>
                  <div className="text-sm text-primary-foreground/80">Daily Earnings Potential</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-primary-foreground/80">Driver Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-sm text-primary-foreground/80">Active Drivers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DriversSection;