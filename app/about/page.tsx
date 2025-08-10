import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Users, Clock, Shield, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-secondary via-secondary/80 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">Premium Service Since 2010</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Over a decade of excellence in premium airport transfers, serving thousands of satisfied customers with luxury, reliability, and professional service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                Founded in 2010, our company started with a simple mission: to provide the most reliable 
                and comfortable airport transfer service in the UK. What began as a small family business 
                has grown into a trusted name in premium transportation.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we serve all major UK airports with a fleet of luxury vehicles and professional 
                chauffeurs who understand the importance of punctuality and comfort for every journey.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Users className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do and define who we are as a company.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every aspect of our service, from vehicle maintenance to customer care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Reliability</h3>
                <p className="text-muted-foreground">
                  Punctuality is our promise. We understand the importance of being on time for your flights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Safety</h3>
                <p className="text-muted-foreground">
                  Your safety is paramount. All our drivers are professionally trained and vehicles regularly inspected.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Care</h3>
                <p className="text-muted-foreground">
                  We treat every customer like family, providing personalized service with a warm, friendly approach.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quality</h3>
                <p className="text-muted-foreground">
                  From luxury vehicles to professional chauffeurs, we maintain the highest standards in everything.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  We're proud to be part of the communities we serve and support local initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals who guide our company's vision and operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20"></div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">James Mitchell</h3>
                <p className="text-secondary font-medium mb-2">CEO & Founder</p>
                <p className="text-sm text-muted-foreground">
                  15+ years in transportation industry, passionate about customer service excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20"></div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Sarah Thompson</h3>
                <p className="text-secondary font-medium mb-2">Operations Director</p>
                <p className="text-sm text-muted-foreground">
                  Expert in logistics and fleet management, ensuring smooth daily operations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20"></div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">David Wilson</h3>
                <p className="text-secondary font-medium mb-2">Head of Customer Service</p>
                <p className="text-sm text-muted-foreground">
                  Dedicated to maintaining our 5-star customer satisfaction rating through exceptional service.
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

export default About;