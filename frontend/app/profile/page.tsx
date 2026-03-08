'use client';
import { useAuth } from "@/lib/context";
import { ProfileDetails } from "./components/profile-details";
import { TripsCreated } from "./components/trips-created";
import { redirect } from "next/navigation";
import { AllTripsWithPermissions } from "./components/trips-with-permission";
import { TripsBooked } from "./components/trips-booked";

export const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="py-10">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-span-12 md:col-span-4">
          <div className="md:sticky top-desktop-sticky-top">
            <ProfileDetails />
          </div>
        </div>
        <div className="col-start-1 col-span-12 md:col-span-8 flex flex-col gap-4">
          <TripsBooked />
          <TripsCreated />
          <AllTripsWithPermissions />
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;