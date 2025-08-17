import BlogSection from "@/components/BlogSection";
import DriversSection from "@/components/DriversSection";
import FAQSection from "@/components/FAQSection";
import FleetSection from "@/components/FleetSection";
import Footer from "@/components/Footer";
import HeathrowSection from "@/components/HeathrowSection";
import HeroSectionWithMap from "@/components/HeroSectionWithMap";
import NewsletterSection from "@/components/NewsletterSection";
import ServicesSection from "@/components/ServiceSection";
import TestimonialsSection from "@/components/TestimonialSection";
import { getPackages } from "@/services/packageService";
export default async function Home() {
  const vehicles = await getPackages();
  return (
    <div className="min-h-screen bg-background">
      <HeroSectionWithMap />
      <ServicesSection />
      <HeathrowSection />
      <FleetSection vehicles={vehicles?.data} />
      <TestimonialsSection />
      <DriversSection />
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
