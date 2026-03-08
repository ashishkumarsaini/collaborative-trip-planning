'use client';
import { CreateActivityForm } from "@/components/form";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { removeTripActivity } from "@/lib/services";
import { Activity } from "@/lib/types";
import { toast } from "sonner";

export const Activities = ({ activities = [], tripId }: { activities: Activity[], tripId: string }) => {
  const handleRemoveActivity = async (activityId: string) => {
    const { message } = await removeTripActivity(tripId, activityId);

    toast.message(message);
  };

  return (
    <div className="mt-5 border border-dashed rounded-md py-5 px-3 md:px-5 mg:px-10 lg:px-20">
      <Heading level={HeadingLevel.h2} size={HeadingSize.lg}>Add New Activities</Heading>
      <div className="mt-5 md:mx-5">
        <Accordion
          type="multiple"
          className="max-w-xl border-none rounded-none m-auto"
        >
          {activities.map((activity) => (
            <AccordionItem key={activity._id} value={activity.name} className="border-b border-primary">
              <AccordionTrigger >
                <Text className="bolder">{activity.name}</Text>
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <Text size={TextSize.sm}>{activity.description}</Text>
                  <div className="flex flex-col gap-1">
                    <Text size={TextSize.xs}>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</Text>
                    <Text size={TextSize.xs}>Number of days: {activity.numberOfDays}</Text>
                  </div>
                  <Button className="mt-4" onClick={() => handleRemoveActivity(activity._id)}>Remove from List</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem key={'create-form'} value={'create-form'}>
            <AccordionTrigger>
              <Text className="text-primary">Add New Activity</Text>
            </AccordionTrigger>
            <AccordionContent>
              <CreateActivityForm order={activities.length + 1} tripId={tripId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}