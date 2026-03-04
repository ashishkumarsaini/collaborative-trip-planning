import { Heading, HeadingLevel, HeadingSize } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const JoinSection = () => {
  return (
    <section className="pt-30 pb-5">
      <div className="h-[800px] bg-[url(https://images.unsplash.com/photo-1495785870240-c8456d5aeda2)] bg-cover bg-center rounded-lg flex flex-col justify-center items-center gap-7">
        <Badge className="bg-black capitalize">Book Your Trip Now!</Badge>
        <Heading level={HeadingLevel.h2} size={HeadingSize.xxl} className="font-bold capitalize max-w-2xl lg:leading-20 text-center text-black">
          Dive into the beauty of the world
        </Heading>
        <Button size="lg" className="uppercase">
          Book Now
        </Button>
      </div>
    </section>
  )
}