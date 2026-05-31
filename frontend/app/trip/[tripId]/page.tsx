import { Heading, HeadingLevel, HeadingSize } from "@/components/typography";
import { getTrip } from "@/lib/services";
import { notFound } from "next/navigation";
import { TripDetails } from "./components/trip-details";
import { TripPageComponent } from "./components/trip-page";

export const dynamic = "force-dynamic";

export default async function TripPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;

  if (!tripId) {
    return (
      <div className="serene-shell py-12">
        <Heading level={HeadingLevel.h1} size={HeadingSize.xl} className="font-extrabold">No trip id found</Heading>
      </div>
    )
  }

  const tripData = await getTrip(tripId);

  if (!tripData?.data?.trip) {
    return notFound();
  }

  const { data } = tripData

  const trip = data.trip;

  return (
    <div>
      <TripDetails trip={trip} />
      <TripPageComponent trip={trip} />
    </div>
  );
}
