import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Plane, 
  Car, 
  Users, 
  Clock, 
  Shield, 
  Star,
  MapPin,
  Calendar,
  Phone,
  Briefcase,
  Heart,
  Zap
} from "lucide-react";
import Link from "next/link";

const Services = () => {
  const airportServices = [
    {
      title: "Heathrow Airport Transfers",
      description: "Premium transfers to and from London Heathrow with meet & greet service",
      features: ["Meet & Greet", "Flight Monitoring", "Free Waiting Time", "All Terminals"],
      price: "From £45",
      icon: Plane
    },
    {
      title: "Gatwick Airport Transfers",
      description: "Reliable transfers to Gatwick with professional chauffeurs",
      features: ["Professional Drivers", "Vehicle Tracking", "24/7 Service", "South & North Terminal"],
      price: "From £55",
      icon: Plane
    },
    {
      title: "Stansted Airport Transfers",
      description: "Comfortable transfers to London Stansted Airport",
      features: ["Luxury Vehicles", "Fixed Pricing", "No Hidden Costs", "Flight Tracking"],
      price: "From £60",
      icon: Plane
    },
    {
      title: "Luton Airport Transfers",
      description: "Efficient transfers to London Luton Airport",
      features: ["Express Service", "Real-time Updates", "Safe & Secure", "Competitive Rates"],
      price: "From £50",
      icon: Plane
    }
  ];

  const vehicleTypes = [
    {
      title: "Luxury Sedan",
      description: "Perfect for business travelers and couples",
      capacity: "Up to 3 passengers",
      luggage: "2 large suitcases",
      features: ["Premium comfort", "Wi-Fi available", "Phone chargers", "Bottled water"],
      image: "/src/assets/luxury-sedan.jpg"
    },
    {
      title: "Premium SUV",
      description: "Ideal for families and groups",
      capacity: "Up to 6 passengers", 
      luggage: "4 large suitcases",
      features: ["Spacious interior", "Climate control", "Entertainment system", "Extra luggage space"],
      image: "/src/assets/luxury-suv.jpg"
    },
    {
      title: "Executive Van",
      description: "Best for large groups and events",
      capacity: "Up to 8 passengers",
      luggage: "6 large suitcases",
      features: ["Maximum space", "Group friendly", "Professional service", "Event transfers"],
      image: "/src/assets/executive-van.jpg"
    }
  ];

  const additionalServices = [
    {
      title: "Corporate Travel",
      description: "Tailored business transport solutions",
      icon: Briefcase,
      features: ["Account management", "Invoice billing", "Priority booking", "Corporate rates"]
    },
    {
      title: "Special Events",
      description: "Luxury transport for special occasions",
      icon: Heart,
      features: ["Wedding transfers", "Party transport", "Theatre trips", "Anniversary rides"]
    },
    {
      title: "Emergency Transfers",
      description: "24/7 emergency transport service",
      icon: Zap,
      features: ["Immediate dispatch", "Hospital transfers", "Last-minute bookings", "Priority response"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Our</span> <span className="text-secondary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive airport transfer and luxury transport services across the UK. 
              Professional, reliable, and always on time.
            </p>
            <Link href="/booking">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Book Your Transfer
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Airport Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Airport Transfer Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Serving all major UK airports with luxury vehicles and professional chauffeurs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {airportServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-secondary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="text-2xl font-bold text-primary text-center">{service.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Luxury Fleet</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of premium vehicles, each maintained to the highest standards
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index} className="border-0 shadow-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{vehicle.title}</CardTitle>
                  <p className="text-muted-foreground">{vehicle.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-secondary mr-2" />
                      {vehicle.capacity}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-secondary mr-2" />
                      {vehicle.luggage}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Shield className="h-4 w-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Additional Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond airport transfers, we offer specialized transport solutions for all your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-secondary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Service Guarantees</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We stand behind our service with these comprehensive guarantees
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">On-Time Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  We guarantee on-time arrival or your ride is free
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Safety First</h3>
                <p className="text-sm text-muted-foreground">
                  Fully licensed drivers and comprehensive insurance
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quality Service</h3>
                <p className="text-sm text-muted-foreground">
                  5-star service guaranteed or we'll make it right
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer support when you need it
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Ready to Experience Premium Transport?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Book your luxury transfer today and enjoy our world-class service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Book Now
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Get Quote
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;