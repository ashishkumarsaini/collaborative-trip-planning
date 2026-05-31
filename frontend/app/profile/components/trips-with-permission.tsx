'use client';

import { Loader2 } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize } from "@/components/typography";
import { getAllPermissionTrips } from "@/lib/services";
import { Trip, TripsData } from "@/lib/types";
import { useDrawers } from "@/lib/context";
import { useEffect, useState } from "react";
import { TripList } from "./trips-created";

export const AllTripsWithPermissions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTrips, setAllTrips] = useState<TripsData | null>(null);
  const { onUpdateTripDrawerToggle } = useDrawers();

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const { data } = await getAllPermissionTrips();
      if (!mounted) return;
      setAllTrips(data);
      setIsLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section>
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mb-4">Shared with Me</Heading>
        <div className="serene-panel grid h-32 place-items-center rounded-[1.5rem]">
          <Loader2 className="animate-spin text-primary" />
        </div>
      </section>
    );
  }

  const trips = allTrips?.trips || [];

  if (!trips.length) {
    return (
      <section>
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mb-4">Shared with Me</Heading>
        <div className="serene-panel rounded-[1.5rem] p-8 text-muted-foreground">No shared trips yet.</div>
      </section>
    );
  }

  return <TripList title="Shared with Me" trips={trips} onEdit={(trip: Trip) => onUpdateTripDrawerToggle(true, trip)} />;
};
