'use client';

import { Heading, HeadingLevel, HeadingSize, Text, TextSize, TextType } from "@/components/typography";
import { Trip } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { requestTrip } from "@/lib/services";
import { useState } from "react";
import { toast } from "sonner";

export const TripDetails = ({ trip }: { trip: Trip }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinTrip = async () => {
    setIsLoading(true);
    const { message } = await requestTrip(trip._id);
    toast.message(message);
    setIsLoading(false)
  };

  return (
    <div>
      <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
        <div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>{trip.name}</Heading>
          <Text type={TextType.paragraph} size={TextSize.sm} className="mt-5">{trip.description}</Text>
        </div>
        <div className="flex items-center">
          <Button onClick={handleJoinTrip} disabled={isLoading}>
            Request to Join
          </Button>
        </div>
      </div>
    </div>
  )
}