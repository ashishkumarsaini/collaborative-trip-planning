'use client';

import { UpdateActivityDrawer } from "@/components/app-drawers";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { formatDate } from "@/lib/date";
import { removeTripActivity } from "@/lib/services";
import { Activity, TripWithActivity } from "@/lib/types";
import { CalendarClock, Edit, Plane, Trash2, Utensils } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const activityImages = [
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
];

export const ActivityDetails = ({ activity, trip, index }: { activity: Activity, trip: TripWithActivity, index: number }) => {
  const [openUpdateActivity, setOpenUpdateActivity] = useState(false);
  const startDate = formatDate(activity.startDate);
  const endDate = formatDate(activity.endDate);
  const { user } = useAuth();

  const isTripCreatedByUser = user?._id === trip.createdByUser;

  const handleDeleteActitivity = async () => {
    const { message } = await removeTripActivity(trip._id, activity._id);
    toast.message(message);
  };

  const Icon = index % 3 === 0 ? Plane : index % 3 === 1 ? Utensils : CalendarClock;
  const showImage = index % 2 === 1;

  return (
    <>
      <article className="relative">
        <div className="absolute -left-[44px] top-5 grid size-9 place-items-center rounded-full border border-[#fec9ad] bg-background text-primary sm:-left-[47px] sm:top-6 sm:size-10 md:-left-[61px]">
          <Icon className="size-4 sm:size-5" />
        </div>
        <div className="serene-panel overflow-hidden rounded-[1.5rem] bg-card sm:rounded-[2rem]">
          {showImage && (
            <div className="relative h-44 sm:h-56">
              <img src={activityImages[index % activityImages.length]} alt={activity.name} className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm">Highlight Activity</span>
            </div>
          )}
          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <Text size={TextSize.xxs} className="font-extrabold uppercase tracking-widest text-primary sm:text-sm">
                  Day {Math.max(index + 1, 1)} - {index % 2 ? "Evening" : "Arrival"}
                </Text>
                <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mt-2 font-extrabold">{activity.name}</Heading>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="rounded-full bg-[#fec9ad] px-4 py-1 text-sm font-bold text-secondary-foreground">
                  {index % 2 ? "07:30 PM" : "09:00 AM"}
                </span>
                {isTripCreatedByUser && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setOpenUpdateActivity(true)}><Edit /></Button>
                    <Button variant="outline" size="icon" onClick={handleDeleteActitivity} className="text-destructive"><Trash2 /></Button>
                  </div>
                )}
              </div>
            </div>
            <Text size={TextSize.xxs} className="mt-4 leading-6 text-muted-foreground sm:text-base sm:leading-7">{activity.description}</Text>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted-foreground sm:gap-4">
              <span>{activity.location.city}</span>
              <span>{startDate} - {endDate}</span>
              <span>{activity.numberOfDays} days</span>
            </div>
          </div>
        </div>
      </article>
      {isTripCreatedByUser && <UpdateActivityDrawer opened={openUpdateActivity} onClose={() => setOpenUpdateActivity(false)} activity={activity} tripId={trip._id} />}
    </>
  );
};
