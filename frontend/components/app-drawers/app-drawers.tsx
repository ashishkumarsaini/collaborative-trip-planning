'use client';

import { useDrawers } from "@/lib/context";
import { CreateTripDrawer } from "./create-trip-drawer";
import { UpdateTripDrawer } from "./update-trip-drawer";

export const AppDrawers = () => {
  const {
    createTripDrawerOpened,
    onCreateTripDrawerToggle,
    updateTripDrawerOpened,
    onUpdateTripDrawerToggle,
  } = useDrawers();

  return (
    <>
      <CreateTripDrawer opened={createTripDrawerOpened} onClose={() => onCreateTripDrawerToggle(false)} />
      <UpdateTripDrawer
        opened={updateTripDrawerOpened.opened}
        onClose={() => onUpdateTripDrawerToggle(false)}
        trip={updateTripDrawerOpened.trip}
      />
    </>
  )

}
