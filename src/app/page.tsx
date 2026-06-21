import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedDishes } from "@/components/sections/FeaturedDishes";
import { GallerySection } from "@/components/sections/GallerySection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedDishes />
      <GallerySection />
      <ReviewsSection />
      <ReservationSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
