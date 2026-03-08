import { TripSchemaType } from "@/lib/validators";
import { TripForm } from "../form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import { toast } from "sonner";
import { updateTrip } from "@/lib/services";
import { Trip } from "@/lib/types";
import { redirect } from "next/navigation";

interface UpdateTripDrawerProps {
  opened: boolean;
  onClose: () => void;
  trip: Trip | null;
}

export const UpdateTripDrawer = ({ opened, onClose, trip }: UpdateTripDrawerProps) => {
  const onSubmit = async (tripInputData: TripSchemaType) => {
    if (!trip) return;

    const { startDate } = tripInputData;
    const dateString = startDate.toISOString();
    const response = await updateTrip(trip._id, { ...tripInputData, startDate: dateString.split('T')[0] });

    const { message } = response;

    await toast.message(message);
    onClose();
    redirect(`/trip/${trip._id}`)
  };

  return (
    <Sheet open={opened}>
      <SheetContent showCloseButton onClose={onClose}>
        <SheetHeader>
          <SheetTitle>Update trip</SheetTitle>
          <SheetDescription>
            Update the trip details below.
            {trip && (
              <TripForm
                key={trip._id}
                shouldUpdate
                initialFormValues={{
                  name: trip.name,
                  description: trip.description || '',
                  startDate: trip.startDate,
                  tripId: trip._id
                }}
                onSubmit={onSubmit}
              />
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
