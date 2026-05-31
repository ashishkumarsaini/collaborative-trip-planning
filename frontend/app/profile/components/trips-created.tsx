'use client';

import Link from "next/link";
import { Calendar, ChevronRight, Loader2, Pen, Trash, UserMinus2Icon, UserPlus2 } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDrawers } from "@/lib/context";
import { formatDate } from "@/lib/date";
import { deleteTrip, getUserCreatedTrips } from "@/lib/services";
import { Trip, TripsData } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const images = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
];

export const TripsCreated = ({ featured = false }: { featured?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tripsCreated, setTripsCreated] = useState<TripsData | null>(null);
  const { onUpdateTripDrawerToggle, onAddTripPermisionDrawerToggle, onRemoveTripPermissionDrawerToggle } = useDrawers();

  const handleDeleteTrip = async (tripId: string) => {
    const { message } = await deleteTrip(tripId);
    toast.message(message);
  };

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const { data } = await getUserCreatedTrips();
      if (!mounted) return;
      setTripsCreated(data);
      setIsLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingSection title="Managed Trips" />;
  }

  const trips = tripsCreated?.trips || [];

  if (!trips.length) {
    return (
      <section className="serene-panel rounded-[1.5rem] p-6 text-center sm:rounded-[2rem] sm:p-8">
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg}>No managed trips yet</Heading>
        <Text size={TextSize.xs} className="mt-3 text-muted-foreground">Create a trip and invite your group to begin planning together.</Text>
      </section>
    );
  }

  if (featured) {
    return (
      <div className="grid gap-5 sm:gap-7 xl:grid-cols-2">
        {trips.slice(0, 2).map((trip, index) => (
          <ManagedTripCard
            key={trip._id}
            trip={trip}
            image={images[index % images.length]}
            onEdit={() => onUpdateTripDrawerToggle(true, trip)}
            onAddUser={() => onAddTripPermisionDrawerToggle(true, trip._id)}
            onRemoveUser={() => onRemoveTripPermissionDrawerToggle(true, trip._id)}
            onDelete={() => handleDeleteTrip(trip._id)}
          />
        ))}
      </div>
    );
  }

  return (
    <TripList
      title="Trips Created"
      trips={trips}
      onEdit={(trip) => onUpdateTripDrawerToggle(true, trip)}
    />
  );
};

const ManagedTripCard = ({
  trip,
  image,
  onEdit,
  onAddUser,
  onRemoveUser,
  onDelete,
}: {
  trip: Trip;
  image: string;
  onEdit: () => void;
  onAddUser: () => void;
  onRemoveUser: () => void;
  onDelete: () => void;
}) => (
  <article className="serene-panel overflow-hidden rounded-[1.5rem] bg-card sm:rounded-[2rem]">
    <div className="relative h-52 sm:h-64">
      <img src={image} alt={trip.name} className="h-full w-full object-cover" />
      <div className="absolute right-4 top-4 flex gap-2 sm:right-5 sm:top-5 sm:gap-3">
        <Button variant="secondary" size="icon" onClick={onEdit} aria-label="Edit trip" className="sm:size-10"><Pen /></Button>
        <Button variant="secondary" size="icon" onClick={onDelete} aria-label="Delete trip" className="text-destructive sm:size-10"><Trash /></Button>
      </div>
    </div>
    <div className="p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        <div className="min-w-0">
          <Heading level={HeadingLevel.h3} size={HeadingSize.lg}>{trip.name}</Heading>
          <Text size={TextSize.xxs} className="mt-3 flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-4 text-primary" />
            {formatDate(trip.startDate)}
          </Text>
        </div>
        <div className="flex -space-x-2">
          <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-[#d9f1ec] text-xs font-bold">A</span>
          <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-[#ffdbc9] text-xs font-bold">R</span>
          <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-[#fec9ad] text-xs font-bold">+{trip.travellers?.length || 1}</span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
        <Button variant="outline" size="sm" asChild><Link href={`/trip/${trip._id}`}>View</Link></Button>
        <Button variant="outline" size="sm" onClick={onAddUser}><UserPlus2 />Invite</Button>
        <Button variant="outline" size="sm" onClick={onRemoveUser}><UserMinus2Icon />Access</Button>
      </div>
    </div>
  </article>
);

export const TripList = ({
  title,
  trips,
  onEdit,
}: {
  title: string;
  trips: Trip[];
  onEdit?: (trip: Trip) => void;
}) => (
  <section>
    <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-4">
      <Heading level={HeadingLevel.h3} size={HeadingSize.lg}>{title}</Heading>
      <Badge variant="outline" className="rounded-full px-3 py-1">{trips.length}</Badge>
    </div>
    <div className="space-y-4">
      {trips.map((trip) => (
        <article key={trip._id} className="serene-panel flex items-center gap-3 rounded-[1.25rem] p-3 sm:gap-5 sm:rounded-[1.5rem] sm:p-4">
          <img src={images[trip.name.length % images.length]} alt={trip.name} className="size-16 rounded-[1rem] object-cover sm:size-20 sm:rounded-[1.25rem]" />
          <div className="min-w-0 flex-1">
            <Heading level={HeadingLevel.h4} size={HeadingSize.sm} className="truncate font-extrabold">{trip.name}</Heading>
            <Text size={TextSize.xxs} className="mt-1 truncate text-muted-foreground">{trip.description || `${trip.numberOfDays || 2} activities - Shared adventure`}</Text>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild><Link href={`/trip/${trip._id}`} aria-label={`Open ${trip.name}`}><ChevronRight /></Link></Button>
            {onEdit && <Button variant="ghost" size="icon" onClick={() => onEdit(trip)}><Pen /></Button>}
          </div>
        </article>
      ))}
    </div>
  </section>
);

const LoadingSection = ({ title }: { title: string }) => (
  <section className="serene-panel rounded-[1.5rem] p-6 sm:rounded-[2rem] sm:p-8">
    <Heading level={HeadingLevel.h3} size={HeadingSize.lg}>{title}</Heading>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {[1, 2].map((item) => (
        <div key={item} className="grid h-64 place-items-center rounded-[1.5rem] bg-muted">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ))}
    </div>
  </section>
);
