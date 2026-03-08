import { ActivitySchemaType } from '@/lib/validators';
import { ActivityForm } from '../form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { updateTripActivity } from '@/lib/services';
import { toast } from 'sonner';
import { Activity } from '@/lib/types';

export const UpdateActivityDrawer = ({
  opened,
  onClose,
  tripId,
  activity
}: {
  opened: boolean;
  onClose: () => void;
  tripId: string;
  activity: Activity
}) => {

  const onSubmit = async (activityData: ActivitySchemaType) => {
    const { startDate } = activityData;
    const dateString = startDate.toISOString();

    const { message } = await updateTripActivity(tripId, activity._id, { ...activityData, order: activity.order, startDate: dateString.split('T')[0] });
    await toast.message(message);
    onClose();
  };

  return (
    <Sheet open={opened}>
      <SheetContent showCloseButton onClose={onClose}>
        <SheetHeader>
          <SheetTitle>Update Activity</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Fill the form below to update an activity to your trip.
          <ActivityForm initialValues={activity} onSubmit={onSubmit} />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
