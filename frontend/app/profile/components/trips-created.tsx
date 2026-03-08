'use client';

import { Heading, HeadingSize, Text, TextSize } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDrawers } from "@/lib/context";
import { formatDate } from "@/lib/date";
import { deleteTrip, getUserCreatedTrips } from "@/lib/services";
import { TripsData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LucideLoader2, Pen, Trash, UserMinus2Icon, UserPlus2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const TripsCreated = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tripsCreated, setTripsCreated] = useState<TripsData | null>(null);
  const { onUpdateTripDrawerToggle, onAddTripPermisionDrawerToggle, onRemoveTripPermissionDrawerToggle } = useDrawers();

  const handleLoadCreatedTrips = async () => {
    const { data } = await getUserCreatedTrips();
    setTripsCreated(data);
    setIsLoading(false);
  }

  const handleDeleteTrip = async (tripId: string) => {
    const { message } = await deleteTrip(tripId);

    toast.message(message);
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
        <div className="h-20 p-4 flex items-center justify-center rounded bg-muted">
          <LucideLoader2 />
        </div>
        <div className="h-20 p-4 flex items-center justify-center rounded bg-muted">
          <LucideLoader2 />
        </div>
        <div className="h-20 p-4 flex items-center justify-center rounded bg-muted">
          <LucideLoader2 />
        </div>
      </div>
    )
  }

  if (!tripsCreated) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips Created</Heading>
        <div className="h-20 p-4 flex items-center justify-center">
          <Text>No trips created!</Text>
        </div>
      </div>
    )
  }

  const { trips } = tripsCreated;


  return (
    <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-4">
          <Heading size={HeadingSize.lg}>Trips Created</Heading>
          <Badge variant="outline" className="p-3"><Text size={TextSize.xxs}>{trips.length}</Text></Badge>
        </div>
      </div>
      <div className="pl-4">
        <ul>
          {
            trips.map((trip) => (
              <li key={trip._id} className={cn("py-4 border border-solid p-4 mb-4 rounded")}>
                <div className="flex justify-between items-center">
                  <Heading size={HeadingSize.md}>{trip.name}</Heading>
                  <div className="flex gap-2">
                    <Link href={`/trip/${trip._id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                    <Button onClick={(() => onUpdateTripDrawerToggle(true, trip))}><Pen /></Button>
                    <Button onClick={(() => onAddTripPermisionDrawerToggle(true, trip._id))}><UserPlus2 /></Button>
                    <Button variant="outline" onClick={() => onRemoveTripPermissionDrawerToggle(true, trip._id)}><UserMinus2Icon /></Button>
                    <Button variant="outline" onClick={() => handleDeleteTrip(trip._id)}><Trash /></Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Text size={TextSize.xxs} className="capitalize">{trip.description}</Text>
                  <Text size={TextSize.xxs} className="mt-2">{formatDate(trip.startDate)}</Text>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};
