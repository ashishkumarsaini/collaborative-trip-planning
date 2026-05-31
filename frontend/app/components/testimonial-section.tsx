import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import testimonialsData from '@/mocks/testimonials.json'
import { Star } from "lucide-react";

export const TestimonialSection = () => {
  return (
    <section className="serene-shell py-12 sm:py-16">
      <Heading level={HeadingLevel.h3} size={HeadingSize.md} className="text-center">Trusted by 50,000+ Explorers</Heading>
      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {testimonialsData.testimonials.map((testimonial) => (
          <article key={testimonial.name} className="rounded-[1.25rem] bg-[#fbebe3] p-5 sm:rounded-[1.5rem] sm:p-7">
            <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4" />)}</div>
            <Text size={TextSize.xs} className="mt-5">&quot;{testimonial.message}&quot;</Text>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-primary text-white">{testimonial.name.charAt(0)}</div>
              <div>
                <Text size={TextSize.xxs} className="font-bold">{testimonial.name}</Text>
                <Text size={TextSize.xxs} className="uppercase text-muted-foreground">{testimonial.location}</Text>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
