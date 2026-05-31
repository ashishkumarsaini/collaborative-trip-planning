import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { Trip } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "../typography";

const tripImages = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
];

const getImage = (id: string) => {
  const total = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tripImages[total % tripImages.length];
};

export const TripCard = ({ trip }: { trip: Trip }) => {
  const travellers = trip.travellers?.length || 1;

  return (
    <Link href={`/trip/${trip._id}`} aria-label={trip.name} className="group block">
      <article className="relative h-[500px] overflow-hidden rounded-[1.5rem]  sm:h-[480px] sm:rounded-[2rem]  border border-primary">
        <img
          src={getImage(trip._id)}
          alt={trip.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="serene-card absolute inset-x-0 bottom-0 m-3 rounded-[1.35rem] p-4 sm:m-4 sm:rounded-[1.75rem] sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {travellers ? "Shared plan" : "Upcoming trip"}
            </span>
            <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm">{trip.numberOfDays || 5} Days</span>
          </div>
          <Heading level={HeadingLevel.h3} size={HeadingSize.lg}>{trip.name}</Heading>
          {trip.description && (
            <Text className="mt-4" size={TextSize.xs}>
              {trip.description.length > 70 ? `${trip.description.slice(0, 70)}...` : trip.description}
            </Text>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-primary" />{formatDate(trip.startDate)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 text-primary" />{travellers} travelers
            </span>
          </div>
        </div>
      </article>

    </Link>
  );
};
