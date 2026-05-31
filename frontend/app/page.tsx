import { TestimonialSection } from "./components/testimonial-section";
import { JoinSection } from "./components/join-section";
import { HeroSection } from "./components/hero-section";
import { ExploreSection } from "./components/explore-section";
import { FeaturesSection } from "./components/features-section";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <ExploreSection />
      <FeaturesSection />
      <TestimonialSection />
      <JoinSection />
    </div>
  );
}
