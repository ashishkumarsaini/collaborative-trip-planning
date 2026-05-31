'use client';

import type { ReactNode } from "react";
import { Calendar, Euro, Share2, Users } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { requestTrip } from "@/lib/services";
import { Trip } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

export const TripDetails = ({ trip }: { trip: Trip }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinTrip = async () => {
    setIsLoading(true);
    const { message } = await requestTrip(trip._id);
    toast.message(message);
    setIsLoading(false);
  };

  return (
    <section className="serene-shell py-8 sm:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="min-w-0">
          <div className="mb-4 flex max-w-full flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span>Explore</span>
            <span>/</span>
            <span>Trips</span>
            <span>/</span>
            <span className="text-primary">{trip.name}</span>
          </div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xxl} className="max-w-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">{trip.name}</Heading>
          <Text size={TextSize.xs} className="mt-5 max-w-3xl leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {trip.description || "A shared itinerary built for meaningful group travel."}
          </Text>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <Metric icon={<Euro />} label="Budget" value="2450" suffix="/ person" />
            <Metric icon={<Calendar />} label="Duration" value={`${trip.numberOfDays || 8} Days`} suffix="/ 7 Nights" />
            <Metric icon={<Users />} label="Participants" value={`${trip.travellers?.length || 1} / 10`} suffix="Joined" />
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Button variant="secondary" size="lg" className="h-12 rounded-full px-7 sm:h-14">
            <Share2 />
            Share Trip
          </Button>
          <Button onClick={handleJoinTrip} disabled={isLoading} size="lg" className="h-12 rounded-full px-8 shadow-[0_14px_32px_rgba(144,72,22,0.22)] sm:h-14">
            Request to Join
          </Button>
        </div>
      </div>
    </section>
  );
};

const Metric = ({ icon, label, value, suffix }: { icon: ReactNode; label: string; value: string; suffix: string }) => (
  <div className="flex min-w-0 items-center gap-3">
    <span className="text-primary [&_svg]:size-6">{icon}</span>
    <div className="min-w-0">
      <Text size={TextSize.xxs} className="font-bold uppercase tracking-widest text-muted-foreground">{label}</Text>
      <Text size={TextSize.lg} className="font-extrabold">
        {value} <span className="text-base font-medium text-muted-foreground">{suffix}</span>
      </Text>
    </div>
  </div>
);
