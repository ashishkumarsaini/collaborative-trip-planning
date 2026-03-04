import { ExploreCarousel } from "./explore-carousel"
import { Heading, HeadingLevel, HeadingSize } from "@/components/typography"

export const ExploreSection = () => {
  return (
    <section className="py-20 lg:py-30">
      <Heading level={HeadingLevel.h2} size={HeadingSize.xxl} className="capitalize max-w-2xl lg:leading-20">
        Dive into the beauty of the world
      </Heading>
      <ExploreCarousel />
    </section>
  )
}