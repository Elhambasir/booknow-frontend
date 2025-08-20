import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import ContactForm from "./_components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-primary via-primary/80 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">
                24/7 Support Available
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Get In <span className="text-secondary">Touch</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Professional support team ready to assist with bookings,
              inquiries, and any questions about our premium transport services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Send us a message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Get in Touch</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground">
                  Reach out to us through any of these channels. We're always
                  ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Phone Support
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          24/7 booking and support
                        </p>
                        <p className="font-medium text-primary">
                          +44 20 7946 0958
                        </p>
                        <p className="font-medium text-primary">
                          +44 800 123 4567
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Email Support
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Get detailed responses
                        </p>
                        <p className="font-medium text-secondary">
                          bookings@taxiservice.co.uk
                        </p>
                        <p className="font-medium text-secondary">
                          support@taxiservice.co.uk
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Office Address
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Visit us during business hours
                        </p>
                        <p className="font-medium">123 Airport Road</p>
                        <p className="font-medium">London, SW1A 1AA</p>
                        <p className="font-medium">United Kingdom</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Business Hours
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Office and phone support
                        </p>
                        <p className="font-medium">
                          Monday - Friday: 6:00 AM - 11:00 PM
                        </p>
                        <p className="font-medium">
                          Saturday - Sunday: 7:00 AM - 10:00 PM
                        </p>
                        <p className="text-sm text-primary mt-2">
                          *24/7 emergency bookings available
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Emergency Bookings
          </h2>
          <p className="text-muted-foreground mb-6">
            Need immediate assistance or last-minute booking? Our emergency line
            is available 24/7.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8">
            <Phone className="mr-2 h-5 w-5" />
            Call Emergency Line: +44 800 TAXI-NOW
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
