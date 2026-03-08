'use client';

import { useDrawers } from "@/lib/context";
import { CreateTripDrawer } from "./create-trip-drawer";
import { UpdateTripDrawer } from "./update-trip-drawer";
import { AddTripPermissionDrawer } from "./add-trip-permission-drawer";
import { RemoveTripPermissionDrawer } from "./remove-trip-permission-drawer";
import { AddActivityDrawer } from "./add-activity-drawer";

export const AppDrawers = () => {
  const {
    createTripDrawerOpened,
    onCreateTripDrawerToggle,
    updateTripDrawerOpened,
    onUpdateTripDrawerToggle,
    addTripPermisionDrawerOpened,
    onAddTripPermisionDrawerToggle,
    removeTripPermissionDrawerOpened,
    onRemoveTripPermissionDrawerToggle,
    addActivityDrawerOpened,
    onAddActivityDrawerOpenedToggle
  } = useDrawers();

  console.log(addActivityDrawerOpened);


  return (
    <>
      <CreateTripDrawer opened={createTripDrawerOpened} onClose={() => onCreateTripDrawerToggle(false)} />
      {updateTripDrawerOpened.trip && (
        <UpdateTripDrawer
          opened={updateTripDrawerOpened.opened}
          onClose={() => onUpdateTripDrawerToggle(false)}
          trip={updateTripDrawerOpened.trip}
        />
      )}
      {addTripPermisionDrawerOpened.tripId && (
        <AddTripPermissionDrawer
          opened={addTripPermisionDrawerOpened.opened}
          onClose={() => onAddTripPermisionDrawerToggle(false, '')}
          tripId={addTripPermisionDrawerOpened.tripId}
        />
      )}
      {removeTripPermissionDrawerOpened.tripId && (
        <RemoveTripPermissionDrawer
          opened={removeTripPermissionDrawerOpened.opened}
          onClose={() => onRemoveTripPermissionDrawerToggle(false, '')}
          tripId={removeTripPermissionDrawerOpened.tripId}
        />
      )}
      {addActivityDrawerOpened.tripId && (
        <AddActivityDrawer
          opened={addActivityDrawerOpened.opened}
          onClose={() => onAddActivityDrawerOpenedToggle(false, 0, '')}
          order={addActivityDrawerOpened.order}
          tripId={addActivityDrawerOpened.tripId}
        />
      )}
    </>
  )
}
