'use client';
import { TripCard } from '@/components/trip-card';
import { Carousel } from '@/components/carousel';
import { Heading, HeadingLevel, HeadingSize, Text } from "@/components/typography";
import { Trip } from '@/lib/types';
import { ReactNode } from 'react';
import { useUserTrips } from '@/lib/context/user-trips-provider';
import { Loader2Icon } from 'lucide-react';

export const ExploreSection = () => {
  const { recommendations } = useUserTrips();

  const { isLoading, data } = recommendations;

  if (!isLoading && !data?.trips.length) {
    return null;
  }

  const renderSlide = (item: unknown): ReactNode => {
    if (isLoading) {
      return (
        <div className='h-[600px] w-[383px] flex items-center justify-center bg-muted rounded-md'>
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      );
    }

    return (
      <TripCard trip={item as Trip} />
    )
  };

  return (
    <section className="serene-shell py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <Heading level={HeadingLevel.h2} size={HeadingSize.xl}>
            Dive into the beauty of the world
          </Heading>
          <Text className="mt-2 text-sm text-muted-foreground">Curated by our community of expert explorers.</Text>
        </div>
      </div>
      <Carousel items={data?.trips || [1, 2, 3, 4, 5, 6]} renderSlide={renderSlide} />
    </section>
  )
}