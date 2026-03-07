'use client';
import { Heading, HeadingSize, Text, TextSize } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserBookedTrips } from "@/lib/services";
import { TripsData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TripsBooked = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tripsBooked, setTripsBooked] = useState<TripsData | null>(null);

  const handleLoadBookedTrips = async () => {
    const { data } = await getUserBookedTrips();
    setTripsBooked(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    handleLoadBookedTrips();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips Booked</Heading>
        <div className="h-20 p-4 flex items-center justify-center">
          <LucideLoader2 />
        </div>
        <div className="h-20 p-4 flex items-center justify-center">
          <LucideLoader2 />
        </div>
        <div className="h-20 p-4 flex items-center justify-center">
          <LucideLoader2 />
        </div>
      </div>
    )
  }

  if (!tripsBooked?.total) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips Booked</Heading>
        <div className="h-20 p-4 flex items-center justify-center">
          <Text>No trips booked!</Text>
        </div>
      </div>
    )
  }

  const { trips, total } = tripsBooked;

  return (
    <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
      <div className="flex items-center gap-4">
        <Heading size={HeadingSize.lg}>Trips Booked</Heading>
        <Badge variant="outline" className="p-3"><Text size={TextSize.sm}>{total}</Text></Badge>
      </div>
      <div className="pl-4">
        <ul>
          {
            trips.map((trip, index) => (
              <li key={trip._id} className={cn("py-4", { 'border-b border-primary': index })}>
                <Link href={`/trip/${trip._id}`} >
                  <div className="flex justify-between items-center">
                    <Heading size={HeadingSize.md}>{trip.name}</Heading>
                    <Link href={`/trip/${trip._id}`}>
                      <Button>View</Button>
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Text size={TextSize.xxs}>{trip.description}</Text>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}