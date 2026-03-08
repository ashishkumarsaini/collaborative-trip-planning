'use client';
import { Heading, HeadingLevel, HeadingSize, Text } from "@/components/typography"
import { FC } from "react";
import { ActivityDetails } from "./activity";
import { Activity } from "@/lib/types";
import { useDrawers } from "@/lib/context";
import { Button } from "@/components/ui/button";

interface ActivityTimeline {
  activities: Activity[];
  tripId: string
};

export const ActivityTimeline: FC<ActivityTimeline> = ({ tripId, activities = [] }) => {
  const { onAddActivityDrawerOpenedToggle } = useDrawers();

  const isActivitiesAvaiable = activities.length;
  return (
    <div className="border border-solid rounded-md py-5 px-3 md:px-5 mg:px-10">
      <div className="flex justify-between">
        <Heading level={HeadingLevel.h2} size={HeadingSize.lg}>Activities</Heading>
        <Button onClick={() => onAddActivityDrawerOpenedToggle(true, activities.length + 1, tripId)}>Add Activity</Button>
      </div>
      {isActivitiesAvaiable ? (
        <div className="mt-5 border-l border-primary md:mx-5">
          <div className="flex flex-col gap-10">
            {
              activities.map((activity, index) => (
                <ActivityDetails key={activity._id} activity={activity} tripId={tripId} index={index} />
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