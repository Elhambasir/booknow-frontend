import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Luggage, Star, ArrowRight } from "lucide-react";

const FleetSection = () => {
  const vehicles = [
    {
      id: 1,
      name: "Executive Sedan",
      brand: "Mercedes-Benz E-Class",
      image: "images/luxury-sedan.jpg",
      passengers: 3,
      luggage: 2,
      features: ["Premium Comfort", "Business Class", "WiFi Available"],
      popular: false,
      priceOptions: {
        perMin: 0.75,
        baseFare: 15,
        commission: 35.55,
        distanceBands: [
          { rate: 2.8, limit: 5 },
          { rate: 2.2, limit: 15 },
          { rate: 1.8, limit: 30 },
          { rate: 1.5, limit: "Infinity" }
        ],
        airportSurcharge: 8
      }
    },
    {
      id: 2,
      name: "Luxury SUV",
      brand: "BMW X5 / Audi Q7",
      image: "images/luxury-suv.jpg",
      passengers: 6,
      luggage: 4,
      features: ["Family Friendly", "Extra Space", "Premium Audio"],
      popular: true,
      priceOptions: {
        perMin: 0.95,
        baseFare: 20,
        commission: 45.55,
        distanceBands: [
          { rate: 3.5, limit: 5 },
          { rate: 2.8, limit: 15 },
          { rate: 2.3, limit: 30 },
          { rate: 1.9, limit: "Infinity" }
        ],
        airportSurcharge: 12
      }
    },
    {
      id: 3,
      name: "Executive Van",
      brand: "Mercedes-Benz V-Class",
      image: "images/luxury-suv.jpg",
      passengers: 8,
      luggage: 6,
      features: ["Group Travel", "Maximum Comfort", "Conference Setup"],
      popular: false,
      priceOptions: {
        perMin: 1.25,
        baseFare: 25,
        commission: 55.55,
        distanceBands: [
          { rate: 4.2, limit: 5 },
          { rate: 3.5, limit: 15 },
          { rate: 2.8, limit: 30 },
          { rate: 2.2, limit: "Infinity" }
        ],
        airportSurcharge: 15
      }
    },
    {
      id: 4,
      name: "Premium Minibus",
      brand: "Mercedes-Benz Sprinter",
      image: "images/executive-van.jpg",
      passengers: 16,
      luggage: 10,
      features: ["Large Groups", "Airport Transfers", "Corporate Events"],
      popular: false,
      priceOptions: {
        perMin: 1.85,
        baseFare: 35,
        commission: 75.55,
        distanceBands: [
          { rate: 5.5, limit: 5 },
          { rate: 4.5, limit: 15 },
          { rate: 3.8, limit: 30 },
          { rate: 3.2, limit: "Infinity" }
        ],
        airportSurcharge: 20
      }
    },
  ];

  return (
    <section id="fleet" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Our Fleet</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Premium Vehicle Collection
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our range of luxury vehicles, each maintained to the highest standards 
            and equipped with modern amenities for your comfort.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background overflow-hidden ${
                vehicle.popular ? 'ring-2 ring-secondary' : ''
              }`}
            >
              {vehicle.popular && (
                <div className="bg-secondary text-primary text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="relative overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 text-primary">
                    £{vehicle.priceOptions.distanceBands[0].rate}/mile
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-primary">{vehicle.name}</CardTitle>
                <p className="text-muted-foreground">{vehicle.brand}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Capacity Info */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Up to {vehicle.passengers} passengers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Luggage className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{vehicle.luggage} large bags</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        £{vehicle.priceOptions.distanceBands[0].rate}
                      </div>
                      <div className="text-sm text-muted-foreground">per mile from</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Base fare</div>
                      <div className="text-lg font-semibold text-secondary">£{vehicle.priceOptions.baseFare}</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  variant={vehicle.popular ? "hero" : "outline"} 
                  className="w-full"
                >
                  Book This Vehicle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-primary text-primary-foreground border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">£0</div>
                  <div className="text-sm text-primary-foreground/80">Hidden Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">60min</div>
                  <div className="text-sm text-primary-foreground/80">Free Waiting</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-sm text-primary-foreground/80">Flight Monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;