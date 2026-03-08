'use client';

import { useDrawers } from "@/lib/context";
import { CreateTripDrawer } from "./create-trip-drawer";

export const AppDrawers = () => {
  const { createTripDrawerOpened, onCreateTripDrawerToggle } = useDrawers();

  return (
    <>
      <CreateTripDrawer opened={createTripDrawerOpened} onClose={() => onCreateTripDrawerToggle(false)} />
    </>
  )

}
