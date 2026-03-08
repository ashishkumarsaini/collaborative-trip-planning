'use client';
import { useAuth } from "@/lib/context"
import { ROLE } from "@/lib/types/user";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize, TextType } from "../typography";
import { Button } from "../ui/button";
import { TripWithActivity } from "@/lib/types";
import { deleteTrip } from "@/lib/services";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const TripDetails = ({ trip }: { trip: TripWithActivity }) => {
  const { user } = useAuth();

  const isAdmin = user && user.role === ROLE.admin;

  const handleDeleteTrip = async () => {
    const { message, success } = await deleteTrip(trip._id);

    await toast.message(message);

    if (success) {
      redirect('/profile')
    }
  }

  return (
    <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
      <div>
        <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>{trip.name}</Heading>
        <Text type={TextType.paragraph} size={TextSize.sm} className="mt-5">{trip.description}</Text>
      </div>
      {isAdmin && <Button onClick={handleDeleteTrip}>Delete Trip</Button>}
    </div>
  )
}