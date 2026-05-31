'use client';

import { Loader2 } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize } from "@/components/typography";
import { getUserBookedTrips } from "@/lib/services";
import { TripsData } from "@/lib/types";
import { useEffect, useState } from "react";
import { TripList } from "./trips-created";

export const TripsBooked = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tripsBooked, setTripsBooked] = useState<TripsData | null>(null);

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const { data } = await getUserBookedTrips();
      if (!mounted) return;
      setTripsBooked(data);
      setIsLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section>
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mb-4">Joined Trips</Heading>
        <div className="serene-panel grid h-32 place-items-center rounded-[1.5rem]">
          <Loader2 className="animate-spin text-primary" />
        </div>
      </section>
    );
  }

  const trips = tripsBooked?.trips || [];

  if (!trips.length) {
    return (
      <section>
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mb-4">Joined Trips</Heading>
        <div className="serene-panel rounded-[1.5rem] p-8 text-muted-foreground">No trips joined yet.</div>
      </section>
    );
  }

  return <TripList title="Joined Trips" trips={trips} />;
};
