import { TripCard } from '@/components/trip-card';
import { Carousel } from '@/components/carousel';
import { Heading, HeadingLevel, HeadingSize } from "@/components/typography";
import { Trip } from '@/lib/types';
import { ReactNode } from 'react';

const data: Trip[] = [{
  _id: "69a673cdd94a9921a196c305",
  description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
  name: "Grand Horizon Luxury Goa",
  "createdByUser": "69a4ab33a8652c90b3df0469",
  "numberOfDays": 20,
  "startDate": "2026-05-10T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  activities: []

}, {
  _id: "69a673cdd94a9921a196c305",
  description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
  name: "Grand Horizon Luxury Goa",
  "createdByUser": "69a4ab33a8652c90b3df0469",
  "numberOfDays": 20,
  "startDate": "2026-05-10T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  activities: []

}, {
  _id: "69a673cdd94a9921a196c305",
  description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
  name: "Grand Horizon Luxury Goa",
  "createdByUser": "69a4ab33a8652c90b3df0469",
  "numberOfDays": 20,
  "startDate": "2026-05-10T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  activities: []

}, {
  _id: "69a673cdd94a9921a196c305",
  description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
  name: "Grand Horizon Luxury Goa",
  "createdByUser": "69a4ab33a8652c90b3df0469",
  "numberOfDays": 20,
  "startDate": "2026-05-10T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  activities: []

}, {
  _id: "69a673cdd94a9921a196c305",
  description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
  name: "Grand Horizon Luxury Goa",
  "createdByUser": "69a4ab33a8652c90b3df0469",
  "numberOfDays": 20,
  "startDate": "2026-05-10T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  activities: []

}, {
  _id: "69a673cdd94a9921a196c305",
  description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
  name: "Grand Horizon Luxury Goa",
  "createdByUser": "69a4ab33a8652c90b3df0469",
  "numberOfDays": 20,
  "startDate": "2026-05-10T00:00:00.000Z",
  "endDate": "2026-05-20T00:00:00.000Z",
  activities: []
},
]

export const ExploreSection = () => {
  const renderSlide = (item: unknown): ReactNode => {
    return (
      <TripCard trip={item as Trip} />
    )
  };

  return (
    <section className="py-20 lg:py-30">
      <Heading level={HeadingLevel.h2} size={HeadingSize.xxl} className="capitalize max-w-2xl lg:leading-20">
        Dive into the beauty of the world
      </Heading>
      <Carousel items={data} renderSlide={renderSlide} />
    </section>
  )
}