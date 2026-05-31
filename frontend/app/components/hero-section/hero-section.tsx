import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography"
import { HeroTripSearch } from "./hero-trip-search"

// <div className="bg-[url(https://images.unsplash.com/photo-1486046866764-e426b5b93d98)] bg-cover h-screen mask-b-from-50% mask-b-to-90%">

export const HeroSection = () => {
  return (
    <section className="relative -mt-mobile-header flex min-h-[620px] items-center justify-center overflow-hidden sm:min-h-[700px] md:-mt-desktop-header lg:min-h-[760px]">
      <img
        src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85"
        alt="Misty mountain lake with a wooden pier"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/30 to-background" />
      <div className="serene-shell relative z-10 pt-24 text-center md:pt-28">
        <Heading level={HeadingLevel.h1} size={HeadingSize.xxl}>
          Plan your next adventure, <span className="text-primary">effortlessly.</span>
        </Heading>
        <Text className="mx-auto mt-5 max-w-2xl" size={TextSize.md}>
          Beautifully collaborative itineraries for people who love to explore without the stress of spreadsheets.
        </Text>
        <HeroTripSearch />
      </div>
    </section>
  )
}