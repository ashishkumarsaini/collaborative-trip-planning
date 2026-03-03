import { ExploreCarousel } from "../explore-carousel"
import { Heading, HeadingLevel, HeadingSize } from "../typography"

export const ExploreSection = () => {
  return (
    <div className="py-30">
      <Heading level={HeadingLevel.h2} size={HeadingSize.xxl} className="capitalize max-w-2xl lg:leading-20">
        Dive into the beauty of the world
      </Heading>
      <ExploreCarousel />
    </div>
  )
}