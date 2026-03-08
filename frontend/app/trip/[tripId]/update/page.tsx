import { getTrip } from "@/lib/services";
import { notFound } from "next/navigation";
import { Activities } from "./components/activities";
import { TripDetails } from "@/components/trip-details";

export default async function Page({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;

  const response = await getTrip(tripId);

  const trip = response?.data?.trip;

  if (!trip) {
    return notFound();
  }

  return (
    <div className="md:py-5 lg:py-10">
      <TripDetails trip={trip} />
      <Activities activities={trip.activities} tripId={tripId} />
    </div>
  )
}