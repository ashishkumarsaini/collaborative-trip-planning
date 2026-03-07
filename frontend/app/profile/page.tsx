import { ProfileDetails } from "./components/profile-details";
import { TripsBooked } from "./components/trips-booked";
import { TripsCreated } from "./components/trips-created";

export const ProfilePage = () => {
  return (
    <div className="py-10 md:py-20">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-span-12 md:col-span-4">
          <ProfileDetails />
        </div>
        <div className="col-start-1 col-span-12 md:col-span-8 flex flex-col gap-4">
          <TripsBooked />
          <TripsCreated />
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;