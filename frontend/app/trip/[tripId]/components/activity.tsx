'use client';
import { UpdateActivityDrawer } from "@/components/app-drawers";
import { Text, TextSize } from "@/components/typography"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { formatDate } from "@/lib/date";
import { removeTripActivity } from "@/lib/services";
import { Activity, TripWithActivity } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ActivityDetails = ({ activity, trip, index }: { activity: Activity, trip: TripWithActivity, index: number }) => {
  const [openUpdateActivity, setOpenUpdateActivity] = useState(false); // TODO: can be move into app drawers
  const startDate = formatDate(activity.startDate);
  const endDate = formatDate(activity.endDate);
  const { user } = useAuth();

  const isTripCreatedByUser = user?._id === trip.createdByUser

  const handleDeleteActitivity = async () => {
    const { message } = await removeTripActivity(trip._id, activity._id);
    toast.message(message);
  }

  return (
    <>
      <div key={activity._id} className="relative">
        <div className="h-2 w-2 top-3 left-[-5px] bg-primary rounded-full absolute" />
        <div className="pl-5 md:pl-10">
          <div className="flex justify-between">
            <div className="border border-primary border-solid inline-flex rounded">
              <div className="border-r border-primary border-dashed px-3 py-1">Activity {index}</div>
              <div className="px-3 py-1 capitalize">{activity.location.city}</div>
            </div>
            {isTripCreatedByUser && (
              <div className="flex gap-2">
                <Button onClick={() => setOpenUpdateActivity(true)}><Edit /></Button>
                <Button onClick={handleDeleteActitivity}><Trash2 /></Button>
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-5">
            <Text className="capitalize" size={TextSize.lg}>{activity.name}</Text>
            <Text size={TextSize.sm}>{activity.description}</Text>
            <div className="flex flex-col gap-1">
              <Text size={TextSize.xs}>{startDate} - {endDate}</Text>
              <Text size={TextSize.xs}>Number of days: {activity.numberOfDays}</Text>
            </div>
          </div>
        </div>
      </div>
      {isTripCreatedByUser && <UpdateActivityDrawer opened={openUpdateActivity} onClose={() => setOpenUpdateActivity(false)} activity={activity} tripId={trip._id} />}
    </>
  )
}
