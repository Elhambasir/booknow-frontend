"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Gift, Star } from "lucide-react";
import { toast } from "sonner";
import { getStrapiURL } from "@/lib/get-strapi-url";
import { fetchAPI, FetchAPIOptions } from "@/lib/api-wrapper";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const strapiUrl = getStrapiURL();
        const options: FetchAPIOptions = {
          method: "POST",
          body: {
            data: {
              email
            },
          },
        };
        const response = await fetchAPI(`${strapiUrl}/api/subscribers`, options);
        if ("status" in response && "statusText" in response) {
          if(response?.message==='This attribute must be unique') {
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

  const benefits = [
    "Exclusive discounts and promotional offers",
    "Early access to new services and features",
    "Travel tips and airport updates",
    "Priority booking notifications",
  ];

  // if (isSubscribed) {
  //   return (
  //     <section className="py-20 bg-background">
  //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
  //           <CardContent className="p-12 text-center">
  //             <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
  //             <h2 className="text-3xl font-bold text-green-800 mb-4">
  //               Welcome to Our Community!
  //             </h2>
  //             <p className="text-green-700 text-lg mb-6">
  //               Thank you for subscribing to our newsletter. You'll receive
  //               exclusive offers, travel tips, and updates about our premium
  //               airport taxi service.
  //             </p>
  //             <div className="bg-white/50 rounded-lg p-4 inline-block">
  //               <p className="text-green-600 font-medium">
  //                 Check your inbox for a welcome email with a special discount!
  //               </p>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">Exclusive Access</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Connected & Save More
              </h2>

              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join our newsletter for exclusive discounts, travel tips, and
                the latest updates from the UK's premier airport taxi service.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background/90 border-0 text-foreground"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={isPending}
                  size="lg"
                  className="h-12 px-8 whitespace-nowrap"
                >
                  {isPending?"Subscribing...":"Subscribe Now"}
                </Button>
              </div>
            </form>

            <p className="text-xs text-primary-foreground/60 text-center mt-4">
              We respect your privacy. Unsubscribe at any time. No spam, just
              valuable content.
            </p>
          </div>

          {/* Additional Incentive */}
          <CardContent className="p-8 bg-secondary/5">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                <Gift className="h-4 w-4" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>

              <h3 className="text-xl font-bold text-primary mb-2">
                Subscribe Today & Get 15% Off Your First Ride
              </h3>

              <p className="text-muted-foreground">
                New subscribers receive an exclusive discount code via email.
                Plus, enjoy priority booking and member-only promotions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;
