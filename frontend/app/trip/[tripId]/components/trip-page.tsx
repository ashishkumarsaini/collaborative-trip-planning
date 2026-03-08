'use client';
import { useAuth } from "@/lib/context"
import { ActivityTimeline } from "./timeline";
import { RequestedUsers } from "./requested-users";
import { JoinedUsers } from "./joined-users";
import { TripWithActivity } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TripPageComponent = ({ trip }: { trip: TripWithActivity }) => {
  const { user } = useAuth();

  const isTripCreatedByUser = user?._id === trip.createdByUser

  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className={cn("col-span-12", { 'col-span-12 lg:col-span-8': isTripCreatedByUser })}>
        <ActivityTimeline activities={trip.activities} tripId={trip._id} usersHavePermission={trip.addedUsersEmail} />
      </div>
      {isTripCreatedByUser && (
        <div className="col-span-12 lg:col-span-4">
          <div>
            <RequestedUsers tripId={trip._id} users={trip.requestedTraveller} />
          </div>
          <div className="mt-4">
            <JoinedUsers users={trip.travellers} />
          </div>
        </div>
      )}
    </div>
  )
}