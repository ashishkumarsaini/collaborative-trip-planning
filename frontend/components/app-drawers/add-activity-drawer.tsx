import { ActivitySchemaType } from '@/lib/validators';
import { ActivityForm } from '../form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { toast } from 'sonner';
import { addTripActivity } from '@/lib/services';

export const AddActivityDrawer = ({
  opened,
  onClose,
  tripId,
  order,
}: {
  opened: boolean;
  onClose: () => void;
  tripId: string;
  order: number;
}) => {

  const onSubmit = async (activityData: ActivitySchemaType) => {
    const { startDate } = activityData;
    const dateString = startDate.toISOString();


    const { message } = await addTripActivity(tripId, { ...activityData, order, startDate: dateString.split('T')[0] });
    await toast.message(message);
    onClose();
  };

  return (
    <Sheet open={opened}>
      <SheetContent showCloseButton onClose={onClose}>
        <SheetHeader>
          <SheetTitle>Add Activity</SheetTitle>
          <SheetDescription>
            Fill the form below to add an activity to your trip.
            <ActivityForm onSubmit={onSubmit} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
