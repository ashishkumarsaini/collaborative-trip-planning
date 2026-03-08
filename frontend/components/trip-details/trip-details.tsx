'use client';
import { useAuth } from "@/lib/context"
import { ROLE } from "@/lib/types/user";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize, TextType } from "../typography";
import { Button } from "../ui/button";
import { TripWithActivity } from "@/lib/types";
import { deleteTrip } from "@/lib/services";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useState } from "react";
import { TripForm } from "../form";

export const TripDetails = ({ trip }: { trip: TripWithActivity }) => {
  const { user } = useAuth();
  const [isUpdateFormOpened, setIsUpdateFormOpened] = useState(false);

  const isAdmin = user && user.role === ROLE.admin;
  const isUser = user && user.role === ROLE.user;

  const handleDeleteTrip = async () => {
    const { message, success } = await deleteTrip(trip._id);

    await toast.message(message);

    if (success) {
      redirect('/profile')
    }
  };

  const handleUpdateFormOpened = () => {
    setIsUpdateFormOpened(true);
  }

  return (
    <div>
      <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
        <div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>{trip.name}</Heading>
          <Text type={TextType.paragraph} size={TextSize.sm} className="mt-5">{trip.description}</Text>
        </div>
        <div className="flex gap-2">
          {isAdmin && <Button onClick={handleDeleteTrip} variant="outline">Delete Trip</Button>}
          {!isUser && (<Button onClick={handleUpdateFormOpened}>Update Trip</Button>)}
        </div>
      </div>
      {isUpdateFormOpened && (
        <div className="mt-5 max-w-lg m-auto">
          <TripForm shouldUpdate initialFormValues={{ name: trip.name, description: trip.description, startDate: trip.startDate, tripId: trip._id }} />
        </div>
      )}
    </div>
  )
}