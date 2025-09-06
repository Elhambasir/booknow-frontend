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

export const footerData = {
  brand: {
    name: "G&M Rides",
    description:
      "The UK's premier airport taxi service, providing luxury transportation with professional chauffeurs. Available 24/7 for all your travel needs.",
  },

  contact: [
    { icon: Phone, text: "(+44) 0208 900 9574" },
    { icon: Mail, text: "info@airporttaxi.co.uk" },
    { icon: MapPin, text: "London, United Kingdom" },
    { icon: Clock, text: "24/7 Service Available" },
  ],

  links: {
    services: [
      { name: "Airport Transfers", href: "airports" },
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
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "FAQs", href: "#faq" },
      { name: "Booking Guide", href: "#" },
      { name: "Cancellation Policy", href: "#" },
      { name: "Track Your Ride", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" },
      { name: "Complaints", href: "#" },
    ],
  },

  social: [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ],

  newsletter: {
    title: "Stay Updated",
    description: "Get exclusive offers and travel tips delivered to your inbox.",
  },

  trustIndicators: [
    { value: "10K+", label: "Happy Customers" },
    { value: "5★", label: "Average Rating" },
    { value: "24/7", label: "Service Available" },
    { value: "100%", label: "Licensed & Insured" },
  ],

  bottomBar: {
    license: "Licensed by Transport for London",
    insured: "Fully Insured",
    checked: "DBS Checked Drivers",
  },
};
