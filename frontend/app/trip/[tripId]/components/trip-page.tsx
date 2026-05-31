'use client';
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
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
    <div className="serene-shell grid grid-cols-12 gap-6 pb-10 sm:gap-8">
      <div className={cn("col-span-12", { 'col-span-12 lg:col-span-8': isTripCreatedByUser })}>
        <ActivityTimeline trip={trip} />
      </div>
      {isTripCreatedByUser && (
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-desktop-sticky-top">
            <RequestedUsers tripId={trip._id} users={trip.requestedTraveller} />
            <div className="mt-6 sm:mt-8">
              <JoinedUsers users={trip.travellers} />
            </div>
            <div className="relative mt-6 min-h-[240px] overflow-hidden rounded-[1.5rem] p-5 text-white sm:mt-8 sm:rounded-[2rem] sm:p-7">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" alt="Trip map preview" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative">
                <Text size={TextSize.xxs} className="font-bold uppercase tracking-widest text-white">Map Preview</Text>
                <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mt-20 font-extrabold text-white">{trip.name}</Heading>
                <Text size={TextSize.xxs} className="mt-2 text-white/85">View full interactive map</Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
