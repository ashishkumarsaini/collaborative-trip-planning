import { TripCard } from "@/components/trip-card";
import { Heading, HeadingSize } from "@/components/typography";
import { getAllTrips } from "@/lib/services";

export default async function Page() {
  const { data } = await getAllTrips();
  console.log({ data });

  if (!data.trips.length) {
    return <div>No</div>
  }

  return (
    <div className="py-15">
      <Heading size={HeadingSize.xl}>All Trips</Heading>
      <div className="mt-5 grid grid-cols-12 gap-4">
        {data.trips.map((trip) => (
          <div key={trip._id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <TripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  )
}