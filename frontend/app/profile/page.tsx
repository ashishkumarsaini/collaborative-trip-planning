import { ProfileDetails } from "./components/profile-details";

export const ProfilePage = () => {
  return (
    <div className="py-10 md:py-20">
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-span-12 md:col-span-4">
          <ProfileDetails />
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;