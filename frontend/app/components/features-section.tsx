import Image from "next/image"
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography"
import { Stars } from "lucide-react"

export const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-30">
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-4">
        <div className="col-start-1 col-span-6 relative">
          <div className="rounded bg-white p-[10px] absolute top-[-70px] lg:top-[-20px] right-[-10px] lg:right-[-20px] h-[170px] lg:h-[250px] w-[135px] lg:w-[200px] z-10">
            <div className="h-[125px] lg:h-[200px] lg:w-[180px] bg-[url(https://images.unsplash.com/photo-1616013208128-e5193b4c575e?w=500)] bg-center bg-cover" />
            <Text className="text-black p-1.5" size={TextSize.xs}>Beach Vibes!</Text>
          </div>
          <div className="aspect-square">
            <Image alt="features-image" src="https://images.unsplash.com/photo-1616013208128-e5193b4c575e" fill className="rounded-md" />
          </div>
        </div>
        <div className="col-start-1 lg:col-start-8 col-span-6">
          <Heading level={HeadingLevel.h2} size={HeadingSize.xxl} className="capitalize max-w-2xl lg:leading-20">
            Unique Travel Packages for Every Travel Bee.
          </Heading>
          <Text className="pt-5">
            Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for every adventure.
          </Text>
          <div className="pt-5 flex flex-col gap-5">
            <div className="flex items-center gap-4 p-5 border border-dotted rounded-md">
              <Stars className="fill-primary" />
              <Text>Flexible Plans</Text>
            </div>
            <div className="flex items-center gap-4 p-5 border border-dotted rounded-md">
              <Stars className="fill-primary" />
              <Text>Best Choice Destinations</Text>
            </div>
            <div className="flex items-center gap-4 p-5 border border-dotted rounded-md">
              <Stars className="fill-primary" />
              <Text>Expert Local Guide</Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}