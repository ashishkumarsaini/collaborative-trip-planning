'use client';

import { Button } from "@/components/ui/button";
import { Heading, HeadingLevel, HeadingSize } from "@/components/typography";
import { useAuth, useDrawers } from "@/lib/context";
import { TripWithActivity } from "@/lib/types";
import { PenLine, Plus } from "lucide-react";
import { FC } from "react";
import { ActivityDetails } from "./activity";

interface ActivityTimeline {
  trip: TripWithActivity
};

export const ActivityTimeline: FC<ActivityTimeline> = ({ trip }) => {
  const { onAddActivityDrawerOpenedToggle } = useDrawers();
  const { user } = useAuth();

  const isUserAllowedToEdit = trip?.addedUsersEmail?.some(({ email }) => email === user?.email);
  const tripActivities = trip.activities;
  const isActivitiesAvaiable = Boolean(tripActivities.length);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 sm:gap-5">
          <Heading level={HeadingLevel.h2} size={HeadingSize.xl} className="font-extrabold">Itinerary Timeline</Heading>
          <PenLine className="size-5 text-primary" />
        </div>
        {isUserAllowedToEdit && (
          <Button
            variant="secondary"
            className="h-11 rounded-full px-5 sm:h-12 sm:px-6"
            onClick={() => onAddActivityDrawerOpenedToggle(true, tripActivities.length + 1, trip._id)}
          >
            <Plus />
            Add Activity
          </Button>
        )}
      </div>
      {isActivitiesAvaiable ? (
        <div className="relative border-l border-dashed border-primary/40 pl-6 sm:pl-7 md:ml-6 md:pl-10">
          <div className="flex flex-col gap-6 sm:gap-8">
            {tripActivities.map((activity, index) => (
              <ActivityDetails key={activity._id} activity={activity} trip={trip} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="serene-panel rounded-[2rem] p-8 text-muted-foreground">No activities found yet.</div>
      )}
    </section>
  );
};
