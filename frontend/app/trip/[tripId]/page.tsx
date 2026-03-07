import { Heading, HeadingLevel, HeadingSize, Text, TextSize, TextType } from "@/components/typography"
import { Button } from "@/components/ui/button";
import { ActivityTimeline } from "./components/timeline";
import { getTrip } from "@/lib/services";
import { notFound } from "next/navigation";

export default async function TripPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;

  if (!tripId) {
    return (
      <div className="md:py-5 lg:py-10">
        <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
          <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>No trip id found</Heading>
        </div>
      </div>
    )
  }

  const tripData = await getTrip(tripId);

  if (!tripData) {
    return notFound();
  }

  const { data } = tripData

  const trip = data.trip;

  return (
    <div className="md:py-5 lg:py-10">
      <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
        <div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>{trip.name}</Heading>
          <Text type={TextType.paragraph} size={TextSize.sm} className="mt-5">{trip.description}</Text>
        </div>
        <div>
          <Button size="lg">Book Now</Button>
        </div>
      </div>
      <ActivityTimeline activities={trip.activities} />
    </div>
  );
}