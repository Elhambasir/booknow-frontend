'use client';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, MapPin, Clock, Plane, Car, Star, Users, Luggage } from "lucide-react";

const Airports = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const airports = [
    {
      code: "LHR",
      name: "Heathrow Airport",
      location: "West London",
      distance: "15 miles from Central London",
      terminals: 5,
      passengers: "80+ million annually",
      transferTime: "45-90 minutes",
      basePrice: "From £45",
      popular: true,
      image: "/placeholder.svg",
      description: "The UK's largest and busiest airport, serving as a major international hub.",
      features: ["24/7 Service", "Meet & Greet", "Flight Monitoring", "Terminal Pickup"],
      airlines: ["British Airways", "Virgin Atlantic", "Emirates", "Lufthansa"]
    },
    {
      code: "LGW",
      name: "Gatwick Airport",
      location: "South London",
      distance: "30 miles from Central London",
      terminals: 2,
      passengers: "46+ million annually",
      transferTime: "60-120 minutes",
      basePrice: "From £55",
      popular: true,
      image: "/placeholder.svg",
      description: "The world's busiest single-runway airport with excellent connectivity.",
      features: ["Express Service", "Meet & Greet", "Flight Monitoring", "Terminal Pickup"],
      airlines: ["British Airways", "easyJet", "Norwegian", "TUI Airways"]
    },
    {
      code: "STN",
      name: "Stansted Airport",
      location: "North East London",
      distance: "35 miles from Central London",
      terminals: 1,
      passengers: "28+ million annually",
      transferTime: "60-90 minutes",
      basePrice: "From £60",
      popular: false,
      image: "/placeholder.svg",
      description: "Major hub for low-cost carriers with modern facilities.",
      features: ["24/7 Service", "Meet & Greet", "Flight Monitoring", "Terminal Pickup"],
      airlines: ["Ryanair", "easyJet", "Jet2", "TUI Airways"]
    },
    {
      code: "LTN",
      name: "Luton Airport",
      location: "North London",
      distance: "32 miles from Central London",
      terminals: 1,
      passengers: "18+ million annually",
      transferTime: "60-90 minutes",
      basePrice: "From £58",
      popular: false,
      image: "/placeholder.svg",
      description: "Compact airport serving many European destinations.",
      features: ["24/7 Service", "Meet & Greet", "Flight Monitoring", "Terminal Pickup"],
      airlines: ["easyJet", "Wizz Air", "Ryanair", "TUI Airways"]
    },
    {
      code: "LCY",
      name: "London City Airport",
      location: "East London",
      distance: "10 miles from Central London",
      terminals: 1,
      passengers: "5+ million annually",
      transferTime: "30-60 minutes",
      basePrice: "From £35",
      popular: false,
      image: "/placeholder.svg",
      description: "Convenient city airport focusing on business travel.",
      features: ["Business Focus", "Quick Transit", "Flight Monitoring", "Premium Service"],
      airlines: ["British Airways", "KLM", "Lufthansa", "Swiss International"]
    },
    {
      code: "SEN",
      name: "Southend Airport",
      location: "Essex",
      distance: "42 miles from Central London",
      terminals: 1,
      passengers: "2+ million annually",
      transferTime: "75-120 minutes",
      basePrice: "From £65",
      popular: false,
      image: "/placeholder.svg",
      description: "London's newest airport with modern facilities and efficient service.",
      features: ["Fast Check-in", "Meet & Greet", "Flight Monitoring", "Terminal Pickup"],
      airlines: ["easyJet", "Ryanair", "Blue Islands"]
    }
  ];

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularAirports = filteredAirports.filter(airport => airport.popular);
  const otherAirports = filteredAirports.filter(airport => !airport.popular);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
              <Plane className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">London Airports</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Airport</span>{" "}
              <span className="text-secondary">Transfers</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional transfer services to and from all major London airports. 
              Fixed prices, flight monitoring, and meet & greet services available.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search airports by name, code, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Airports */}
      {popularAirports.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-8">
              <Star className="h-5 w-5 text-primary fill-current" />
              <h2 className="text-2xl font-bold text-primary">Popular Airports</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {popularAirports.map((airport) => (
                <Card key={airport.code} className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto">
                      <img 
                        src={airport.image} 
                        alt={airport.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-lg font-bold">
                            {airport.code}
                          </Badge>
                          <Badge variant="outline">Popular</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-primary">{airport.name}</h3>
                        <p className="text-sm text-muted-foreground">{airport.description}</p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{airport.distance}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{airport.transferTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{airport.passengers}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <div className="text-lg font-bold text-secondary">{airport.basePrice}</div>
                          <div className="text-xs text-muted-foreground">Base transfer rate</div>
                        </div>
                        <Link href={`/booking?airport=${airport.code}`}>
                          <Button variant="hero">
                            Book Transfer
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Airports */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">
              {searchTerm ? `Search Results (${filteredAirports.length})` : 'All London Airports'}
            </h2>
            <p className="text-muted-foreground">
              {filteredAirports.length} airport{filteredAirports.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          {filteredAirports.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center space-y-4">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold text-primary">No airports found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms.
                </p>
                <Button onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchTerm ? filteredAirports : otherAirports).map((airport) => (
                <Card key={airport.code} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={airport.image} 
                      alt={airport.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-sm font-bold">
                        {airport.code}
                      </Badge>
                      {airport.popular && <Badge variant="outline">Popular</Badge>}
                    </div>
                    <CardTitle className="text-lg">{airport.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{airport.location}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{airport.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span>{airport.distance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Transfer Time:</span>
                        <span>{airport.transferTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Terminals:</span>
                        <span>{airport.terminals}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {airport.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="font-semibold text-secondary">{airport.basePrice}</div>
                        <div className="text-xs text-muted-foreground">Base rate</div>
                      </div>
                      <Link href={`/booking?airport=${airport.code}`}>
                        <Button variant="outline" size="sm">
                          Book Transfer
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-primary">Why Choose Our Airport Transfers?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional, reliable, and comfortable transfers to all London airports with premium service guarantees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Flight Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time flight tracking ensures we're always on time for your pickup.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold">Meet & Greet</h3>
                <p className="text-sm text-muted-foreground">
                  Personal meet and greet service at airport arrivals for stress-free transfers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Premium Vehicles</h3>
                <p className="text-sm text-muted-foreground">
                  Luxury vehicles maintained to the highest standards for your comfort.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Luggage className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold">Luggage Assistance</h3>
                <p className="text-sm text-muted-foreground">
                  Professional assistance with luggage handling and terminal navigation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Airports;