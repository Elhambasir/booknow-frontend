import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Car, Headphones } from "lucide-react";
// import heathrowAirport from '/images/heathrow-airport.png';
import Image from "next/image";
import Link from "next/link";

const HeathrowSection = () => {
  const features = [
    {
      icon: Star,
      title: "Business & Tourist Friendly",
      description: "Whether you're a business traveler or tourist, we ensure a smooth journey home with personalized service.",
    },
    {
      icon: Car,
      title: "Luxury Fleet",
      description: "Travel in style with our top-of-the-line vehicles equipped with modern amenities and comfort features.",
    },
    {
      icon: Clock,
      title: "24/7 Professional Service",
      description: "Our professional chauffeurs await you with a personalized sign, providing reliable service around the clock.",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={"/images/heathrow-airport-sm.png"}
          alt="Heathrow Airport Terminal"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">Heathrow Specialists</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Welcome to Our Heathrow Airport Pick-Up Service
              </h2>

              <p className="text-lg text-muted-foreground">
                Experience the ultimate in airport transfer luxury. Our dedicated Heathrow service 
                combines years of expertise with premium vehicles to deliver an unmatched travel experience.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="button" asChild variant="hero" size="lg" className="flex-1 sm:flex-none">
                <Link href={'/airports'} >View All Airports</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Statistics & Info */}
          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <Headphones className="h-12 w-12 mx-auto text-secondary" />
                  <h3 className="text-2xl font-bold">24/7 Support Team</h3>
                  <p className="text-primary-foreground/80">
                    Our dedicated support team is available round the clock to assist 
                    with any queries or last-minute changes to your booking.
                  </p>
                  <div className="pt-4">
                    <div className="text-3xl font-bold text-secondary">+44 20 7946 0958</div>
                    <div className="text-sm text-primary-foreground/60">Call us anytime</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 bg-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">On-Time Rate</div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">5 min</div>
                  <div className="text-sm text-muted-foreground">Average Wait</div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Daily Flights</div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Flight Monitored</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeathrowSection;