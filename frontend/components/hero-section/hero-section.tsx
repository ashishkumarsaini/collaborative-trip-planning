import { Heading, HeadingSize, Text } from "../typography"
import { Badge } from "../ui/badge"
import { HeroTripSearch } from "./hero-trip-search"

// <div className="bg-[url(https://images.unsplash.com/photo-1486046866764-e426b5b93d98)] bg-cover h-screen mask-b-from-50% mask-b-to-90%">

export const HeroSection = () => {
  return (
    <div className="py-30">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-5">
          <Badge variant="default">Get 20% discount today!</Badge>
          <Heading size={HeadingSize.xxl} className="text-center capitalize max-w-3xl lg:leading-20">
            Discover the magic in every destination with us!
          </Heading>
        </div>
        <Text>Enjoy exclusive offers and best prices for satisfying travel packages.</Text>
        <HeroTripSearch />
      </div>
    </div>
  )
}