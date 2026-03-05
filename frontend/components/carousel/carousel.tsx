import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ReactNode } from "react"

export const CustomCarousel = ({ items, renderSlide }: { items: unknown[], renderSlide: (item: unknown, index: number) => ReactNode }) => {
  return (
    <Carousel>
      <div className="absolute right-[10px] top-0 flex gap-5 max-md:hidden">
        <CarouselPrevious className="bg-primary relative left-0" />
        <CarouselNext className="bg-primary relative right-0" />
      </div>
      <CarouselContent className="pt-10">
        {items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              {renderSlide(item, index)}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}