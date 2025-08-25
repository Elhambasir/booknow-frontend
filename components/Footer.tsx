"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchAPI, FetchAPIOptions } from "@/lib/api-wrapper";
import { getStrapiURL } from "@/lib/get-strapi-url";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const footerLinks = {
    services: [
      { name: "Airport Transfers", href: "#" },
      { name: "Corporate Travel", href: "#" },
      { name: "Long Distance", href: "#" },
      { name: "Wedding Transport", href: "#" },
      { name: "Event Transportation", href: "#" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Fleet", href: "#fleet" },
      { name: "Our Drivers", href: "#drivers" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "FAQs", href: "#faq" },
      { name: "Booking Guide", href: "#" },
      { name: "Cancellation Policy", href: "#" },
      { name: "Track Your Ride", href: "#" },
    ],
    legal: [
      // { name: "Terms of Service", href: "/privacy" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" },
      { name: "Complaints", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const strapiUrl = getStrapiURL();
        const options: FetchAPIOptions = {
          method: "POST",
          body: {
            data: {
              email,
            },
          },
        };
        const response = await fetchAPI(
          `${strapiUrl}/api/subscribers`,
          options
        );
        if ("status" in response && "statusText" in response) {
          if (response?.message === "This attribute must be unique") {
            toast.error("You already subscribed. Thank you");
            return;
          }
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Subscribtion failed");
        }

        toast.success("Sucessfull:", {
          description: "You subscribed sucessfully",
        });

        return;
      } catch (error: any) {
        if (error instanceof Error) {
          // Handle errors thrown by fetchAPI
          toast.error(error.message || "An unexpected error occurred");
        } else if (typeof error === "object" && error !== null) {
          // Handle the case where the API returned an error object
          if ("message" in error) {
            // Try to extract a more specific error message if available
            const apiMessage = error.message;
            if (
              Array.isArray(apiMessage) &&
              apiMessage[0]?.messages?.[0]?.message
            ) {
              toast.error(apiMessage[0].messages[0].message);
            } else if (typeof apiMessage === "string") {
              toast.error(apiMessage);
            } else {
              toast.error("Something went wrong.");
            }
          } else {
            toast.error("An unexpected error occurred.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    });
  };
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary-foreground">Airport</span>
                <span className="text-secondary">Taxi</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed max-w-md">
                The UK's premier airport taxi service, providing luxury
                transportation with professional chauffeurs. Available 24/7 for
                all your travel needs.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span>+44 20 7946 0958</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span>info@airporttaxi.co.uk</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>London, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-secondary" />
                <span>24/7 Service Available</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors duration-300"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-primary-foreground/80">
                Get exclusive offers and travel tips delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button disabled={isPending} variant="secondary" type="submit">
                {isPending?"Subscribing...":"Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-secondary">10K+</div>
              <div className="text-sm text-primary-foreground/80">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">5★</div>
              <div className="text-sm text-primary-foreground/80">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-primary-foreground/80">
                Service Available
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">100%</div>
              <div className="text-sm text-primary-foreground/80">
                Licensed & Insured
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            © {currentYear} AirportTaxi. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
            <span>Licensed by Transport for London</span>
            <span>•</span>
            <span>Fully Insured</span>
            <span>•</span>
            <span>DBS Checked Drivers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
