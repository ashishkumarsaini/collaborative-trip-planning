'use client';

import { Heading, HeadingSize, Text, TextSize } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserCreatedTrips } from "@/lib/services";
import { TripsData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TripsCreated = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tripsCreated, setTripsCreated] = useState<TripsData | null>(null);

  const handleLoadCreatedTrips = async () => {
    const { data } = await getUserCreatedTrips();
    setTripsCreated(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    handleLoadCreatedTrips();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips Created</Heading>
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

  if (!tripsCreated?.total) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips Created</Heading>
        <div className="h-20 p-4 flex items-center justify-center">
          <Text>No trips created!</Text>
        </div>
      </div>
    )
  }

  const { trips, total } = tripsCreated;


  return (
    <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-4">
          <Heading size={HeadingSize.lg}>Trips Created</Heading>
          <Badge variant="outline" className="p-3"><Text size={TextSize.sm}>{total}</Text></Badge>
        </div>
        <Link href='/trip/create'>
          <Button>
            Create New Trip
          </Button>
        </Link>
      </div>
      <div className="pl-4">
        <ul>
          {
            trips.map((trip, index) => (
              <li key={trip._id} className={cn("py-4", { 'border-b border-primary': index })}>
                <Link href={`/trip/${trip._id}`} >
                  <div className="flex justify-between items-center">
                    <Heading size={HeadingSize.md}>{trip.name}</Heading>
                    <div className="flex gap-2">
                      <Link href={`/trip/${trip._id}`}>
                        <Button>View</Button>
                      </Link>
                      <Link href={`/trip/${trip._id}/update`}>
                        <Button variant="outline">Update</Button>
                      </Link>
                    </div>
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
};
