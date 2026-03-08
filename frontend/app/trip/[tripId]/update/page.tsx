import { Heading, HeadingLevel, HeadingSize, Text, TextSize, TextType } from "@/components/typography";
import { getTrip } from "@/lib/services";
import { notFound } from "next/navigation";
import { Activities } from "./components/activities";

export default async function Page({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;

  const response = await getTrip(tripId);

  const trip = response?.data?.trip;

  if (!trip) {
    return notFound();
  }

  return (
    <div className="md:py-5 lg:py-10">
      <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
        <div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>{trip.name}</Heading>
          <Text type={TextType.paragraph} size={TextSize.sm} className="mt-5">{trip.description}</Text>
        </div>
      </div>
      <Activities activities={trip.activities} tripId={tripId} />
    </div>
  )
}