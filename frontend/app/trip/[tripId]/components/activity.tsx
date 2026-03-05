
import { Text, TextSize } from "@/components/typography"
import { Activity } from "@/lib/types";

export const ActivityDetails = ({ activity }: { activity: Activity }) => {
  const startDate = new Date(activity.startDate);
  const endDate = new Date(activity.endDate);

  return (
    <div key={activity._id} className="relative">
      <div className="h-2 w-2 top-3 left-[-5px] bg-primary rounded-full absolute" />
      <div className="px-5 md:px-10">
        <div className="border border-solid inline-flex rounded">
          <div className="border-r border-dashed px-3 py-1">Day {activity.order}</div>
          <div className="px-3 py-1 capitalize">{activity.location.city}</div>
        </div>
        <div className="mt-2 flex flex-col gap-5">
          <Text size={TextSize.lg}>{activity.name}</Text>
          <Text size={TextSize.sm}>{activity.description}</Text>
          <div className="flex flex-col gap-1">
            <Text size={TextSize.sm}>Number of days: {activity.numberOfDays}</Text>
            <Text size={TextSize.sm}>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
