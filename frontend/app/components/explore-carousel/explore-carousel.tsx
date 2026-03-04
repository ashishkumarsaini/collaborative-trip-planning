import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export const ExploreCarousel = () => {
  return (
    <Carousel>
      <div className="absolute right-[10px] top-0 flex gap-5">
        <CarouselPrevious className="bg-primary relative left-0" />
        <CarouselNext className="bg-primary relative right-0" />
      </div>
      <CarouselContent className="pt-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}