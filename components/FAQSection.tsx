import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book an airport taxi?",
      answer: "You can book through our website, mobile app, or by calling our 24/7 hotline at +44 20 7946 0958. Simply provide your pickup location, destination, date, and time. We'll send you instant confirmation with driver details."
    },
    {
      question: "Do you monitor flight delays?",
      answer: "Yes, we automatically monitor all flight arrivals and departures. If your flight is delayed or arrives early, our drivers will adjust accordingly. You won't be charged extra for waiting time due to flight delays."
    },
    {
      question: "What are your cancellation policies?",
      answer: "You can cancel your booking up to 4 hours before the scheduled pickup time without any charges. Cancellations within 4 hours may incur a 50% charge, and cancellations within 1 hour incur the full fare."
    },
    {
      question: "Are your drivers licensed and insured?",
      answer: "Absolutely. All our drivers are fully licensed with valid PCO (Private Hire) licenses, DBS checked, and our vehicles are comprehensively insured. We also carry public liability insurance for your peace of mind."
    },
    {
      question: "Do you provide child seats?",
      answer: "Yes, we provide complimentary child seats upon request. Please specify the type and number of child seats needed when booking. We have infant seats, toddler seats, and booster seats available."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and cash. Payment can be made in advance during booking or to the driver upon completion of the journey."
    },
    {
      question: "How much luggage can I bring?",
      answer: "Our standard sedans accommodate 2 large suitcases and 2 carry-on bags. SUVs can handle 4-6 large suitcases, and our vans can carry up to 8 large suitcases. Please inform us if you have oversized luggage."
    },
    {
      question: "Do you operate 24/7?",
      answer: "Yes, we provide 24/7 service, 365 days a year. Whether you have an early morning flight or a late-night arrival, our professional drivers are always available to serve you."
    },
    {
      question: "How will I find my driver at the airport?",
      answer: "For airport pickups, your driver will be waiting in the arrivals hall with a name board. We'll send you the driver's name, photo, contact number, and vehicle details 30 minutes before your scheduled pickup time."
    },
    {
      question: "Do you provide services outside London?",
      answer: "Yes, we provide services throughout the UK. We cover all major cities including Birmingham, Manchester, Edinburgh, and Glasgow. Long-distance journeys are available with advance booking."
    },
    {
      question: "What if I need to make changes to my booking?",
      answer: "You can modify your booking up to 2 hours before the scheduled pickup time through our website, app, or by calling our customer service. Changes may affect the fare depending on the new requirements."
    },
    {
      question: "Are your vehicles clean and sanitized?",
      answer: "Yes, all our vehicles undergo thorough cleaning and sanitization between trips. We maintain the highest hygiene standards and provide hand sanitizer in all vehicles for your safety and comfort."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Help Center</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our airport taxi service. 
            If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-4 hover:border-secondary/50 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left hover:text-secondary font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-primary-foreground/90 mb-6">
                Our friendly customer service team is available 24/7 to help you with any queries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="secondary" size="lg">
                  Contact Support
                </Button>
                <div className="text-primary-foreground/80">
                  <div className="text-sm">Call us directly:</div>
                  <div className="font-semibold text-secondary">+44 20 7946 0958</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;