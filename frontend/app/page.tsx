import { ExploreSection } from "./components/explore-section";
import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { JoinSection } from "./components/join-section";
import { TestimonialSection } from "./components/testimonial-section";

export default function Page() {
  return (
    <div className="min-h-[1000px]">
      <HeroSection />
      <ExploreSection />
      <FeaturesSection />
      <TestimonialSection />
      <JoinSection />
    </div>
  );
}