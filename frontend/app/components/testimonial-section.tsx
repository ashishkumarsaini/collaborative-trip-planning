import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import testimonialsData from '@/mocks/testimonials.json'
import { Quote } from "lucide-react";

export const TestimonialSection = () => {
  return (
    <section className="py-20 lg:py-30">
      <div className="flex flex-col items-center justify-center gap-5">
        <Badge className="bg-primary">Testimonials</Badge>
        <Heading level={HeadingLevel.h2} size={HeadingSize.xxl} className="capitalize text-center max-w-3xl lg:leading-20">
          Joined hundreds of satisfied customers
        </Heading>
        <Text>
          Start planning your next adventure!
        </Text>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {testimonialsData.testimonials.map((testimonial) => (
            <Card className="p-5 rounded justify-between" key={testimonial.id}>
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between">
                    <Quote className="fill-primary" />
                    <Text size={TextSize.xxs}>{testimonial.rating}/5</Text>
                  </div>
                </CardTitle>
                <CardDescription>
                  <Text size={TextSize.xs}>
                    {testimonial.message}
                  </Text>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex gap-3 items-center">
                  <div>
                    <Avatar>
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <Text size={TextSize.xxs}>{testimonial.name}</Text>
                    <Text size={TextSize.xxs}>{testimonial.location}</Text>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}