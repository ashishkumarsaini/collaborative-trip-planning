import { Heading, HeadingLevel, HeadingSize, Text } from "@/components/typography"
import { FC } from "react";
import { ActivityDetails } from "./activity";
import { Activity } from "@/lib/types";

interface ActivityTimeline {
  activities: Activity[]
};

export const ActivityTimeline: FC<ActivityTimeline> = ({ activities = [] }) => {
  const isActivitiesAvaiable = activities.length;
  return (
    <div className="border border-solid rounded-md py-5 px-3 md:px-5 mg:px-10 lg:px-20">
      <Heading level={HeadingLevel.h2} size={HeadingSize.lg}>Activities</Heading>
      {isActivitiesAvaiable ? (
        <div className="mt-5 border-l border-primary md:mx-5">
          <div className="flex flex-col gap-10">
            {
              activities.map((activity) => (
                <ActivityDetails key={activity._id} activity={activity} />
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