
import { Text, TextSize } from "@/components/typography"
import { formatDate } from "@/lib/date";
import { Activity } from "@/lib/types";

export const ActivityDetails = ({ activity }: { activity: Activity }) => {
  const startDate = formatDate(activity.startDate);
  const endDate = formatDate(activity.endDate);

  return (
    <div key={activity._id} className="relative">
      <div className="h-2 w-2 top-3 left-[-5px] bg-primary rounded-full absolute" />
      <div className="px-5 md:px-10">
        <div className="border border-primary border-solid inline-flex rounded">
          <div className="border-r border-primary border-dashed px-3 py-1">Day {activity.order}</div>
          <div className="px-3 py-1 capitalize">{activity.location.city}</div>
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
  )
}
