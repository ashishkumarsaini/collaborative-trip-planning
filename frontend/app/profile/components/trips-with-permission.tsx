'use client';
import { Heading, HeadingSize, Text, TextSize } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDrawers } from "@/lib/context";
import { formatDate } from "@/lib/date";
import { getAllPermissionTrips } from "@/lib/services";
import { TripsData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LucideLoader2, Pen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AllTripsWithPermissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allTrips, setAllTrips] = useState<TripsData | null>(null);
  const { onUpdateTripDrawerToggle } = useDrawers();

  const handleLoadAllTrips = async () => {
    const { data } = await getAllPermissionTrips();
    setAllTrips(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    handleLoadAllTrips();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips with Permissions</Heading>
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

  if (!allTrips) {
    return (
      <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
        <Heading size={HeadingSize.lg}>Trips with Permissions</Heading>
        <div className="h-20 p-4 flex items-center justify-center">
          <Text>No Trips</Text>
        </div>
      </div>
    )
  }

  const { trips } = allTrips;

  return (
    <div className="flex flex-col gap-4 border border-dashed rounded-md p-4">
      <div className="flex items-center gap-4">
        <Heading size={HeadingSize.lg}>Trips with Permissions</Heading>
        <Badge variant="outline" className="p-3"><Text size={TextSize.xxs}>{trips.length}</Text></Badge>
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
                      <Button variant="outline" >View</Button>
                    </Link>
                    <Button onClick={(() => onUpdateTripDrawerToggle(true, trip))}><Pen /></Button>
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
}