'use client';
import { Heading, HeadingLevel, HeadingSize, Text } from "@/components/typography"
import { FC } from "react";
import { ActivityDetails } from "./activity";
import { TripWithActivity } from "@/lib/types";
import { useAuth, useDrawers } from "@/lib/context";
import { Button } from "@/components/ui/button";

interface ActivityTimeline {
  trip: TripWithActivity
};

export const ActivityTimeline: FC<ActivityTimeline> = ({ trip }) => {
  const { onAddActivityDrawerOpenedToggle } = useDrawers();
  const { user } = useAuth();

  const isUserAllowedToEdit = trip?.addedUsersEmail?.some(({ email }) => email === user?.email)
  const tripActivities = trip.activities;
  const isActivitiesAvaiable = Boolean(tripActivities.length);
  return (
    <div className="border border-solid rounded-md py-5 px-3 md:px-5 mg:px-10">
      <div className="flex justify-between">
        <Heading level={HeadingLevel.h2} size={HeadingSize.lg}>Activities</Heading>
        {isUserAllowedToEdit && <Button onClick={() => onAddActivityDrawerOpenedToggle(true, tripActivities.length + 1, trip._id)}>Add Activity</Button>}
      </div>
      {isActivitiesAvaiable ? (
        <div className="mt-5 border-l border-primary md:mx-5">
          <div className="flex flex-col gap-10">
            {
              tripActivities.map((activity, index) => (
                <ActivityDetails key={activity._id} activity={activity} trip={trip} index={index} />
              ))
            }
          </div>
        </div>
      ) : (
        <Text className="mt-5">No Activities Found!</Text>
      )}
    </div>
  )
}