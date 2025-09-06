"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchAPI, FetchAPIOptions } from "@/lib/api-wrapper";
import { clientConfig } from "@/lib/config/client";
import { toast } from "sonner";
import { footerData } from "@/constants/footerData"; // ⬅️ import constants

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const strapiUrl = clientConfig.NEXT_PUBLIC_API_URL;
        const options: FetchAPIOptions = {
          method: "POST",
          body: { data: { email } },
        };
        const response = await fetchAPI(`${strapiUrl}/api/subscribers`, options);

        if ("status" in response && "statusText" in response) {
          if (response?.message === "This attribute must be unique") {
            toast.error("You already subscribed. Thank you");
            return;
          }
          throw new Error(response.message || "Subscribtion failed");
        }

        toast.success("Sucessfull:", {
          description: "You subscribed sucessfully",
        });
      } catch (error: any) {
        toast.error(error.message || "An unexpected error occurred");
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
                <span className="text-primary-foreground">G&M</span>
                <span className="text-secondary">Rides</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed max-w-md">
                {footerData.brand.description}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {footerData.contact.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.text} className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-secondary" />
                    <span>{c.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {footerData.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors duration-300"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
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
              {footerData.links.services.map((link) => (
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
              {footerData.links.company.map((link) => (
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
              {footerData.links.support.map((link) => (
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
              {footerData.links.legal.slice(0, 3).map((link) => (
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
              <h4 className="font-semibold mb-2">{footerData.newsletter.title}</h4>
              <p className="text-primary-foreground/80">
                {footerData.newsletter.description}
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
                {isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {footerData.trustIndicators.map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-bold text-secondary">
                  {item.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            © {currentYear} G&MRides. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
            <span>{footerData.bottomBar.license}</span>
            <span>•</span>
            <span>{footerData.bottomBar.insured}</span>
            <span>•</span>
            <span>{footerData.bottomBar.checked}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
