import { TripSchemaType } from "@/lib/validators";
import { TripForm } from "../form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createTrip } from "@/lib/services";

export const CreateTripDrawer = ({ opened, onClose }: { opened: boolean, onClose: () => void }) => {
  const onSubmit = async (tripInputData: TripSchemaType) => {
    const { startDate } = tripInputData;
    const dateString = startDate.toISOString();
    const response = await createTrip({ ...tripInputData, startDate: dateString.split('T')[0] });

    const { message, data } = response

    await toast.message(message);

    const tripId = data.trip._id;
    onClose();
    redirect(`/trip/${tripId}`);
  };

  return (
    <Sheet open={opened}>
      <SheetContent showCloseButton onClose={onClose}>
        <SheetHeader>
          <SheetTitle>Create a trip</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Fill the form below to create trip.
          <TripForm onSubmit={onSubmit} />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}