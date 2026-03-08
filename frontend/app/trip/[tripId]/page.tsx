import { Heading, HeadingLevel, HeadingSize } from "@/components/typography"
import { ActivityTimeline } from "./components/timeline";
import { getTrip } from "@/lib/services";
import { notFound } from "next/navigation";
import { TripDetails } from "./components/trip-details";
import { RequestedUsers } from "./components/requested-users";
import { JoinedUsers } from "./components/joined-users";

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
      <TripDetails trip={trip} />
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-8">
          <ActivityTimeline activities={trip.activities} />
        </div>
        <div className="col-span-4">
          <div>
            <RequestedUsers tripId={tripId} users={trip.requestedTraveller} />
          </div>
          <div className="mt-4">
            <JoinedUsers users={trip.travellers} />
          </div>
        </div>
      </div>
    </div>
  );
}