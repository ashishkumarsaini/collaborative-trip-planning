import { Plus, Search } from "lucide-react";
import { TripCard } from "@/components/trip-card";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { getAllTrips } from "@/lib/services";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data } = await getAllTrips();
  const trips = data?.trips || [];

  return (
    <div className="serene-shell py-8 sm:py-12">
      <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xxl} className="leading-tight sm:text-5xl md:text-7xl">Your Journeys</Heading>
          <Text size={TextSize.xs} className="mt-4 max-w-2xl leading-7 text-muted-foreground sm:text-xl sm:leading-8">
            Curating your past adventures and future explorations with effortless grace.
          </Text>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <label className="relative block">
            <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-12 w-full rounded-full border border-transparent bg-input pl-12 pr-5 text-base outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10 sm:h-16 sm:pl-14 sm:pr-6 sm:text-lg lg:w-80"
              placeholder="Search destinations..."
            />
          </label>
          <Button className="h-12 rounded-full px-6 text-sm shadow-[0_14px_32px_rgba(144,72,22,0.22)] sm:h-16 sm:px-8 sm:text-base">
            <Plus />
            Plan a Trip
          </Button>
        </div>
      </section>

      {trips.length ? (
        <section className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </section>
      ) : (
        <section className="serene-panel mt-10 rounded-[1.5rem] p-6 text-center sm:mt-14 sm:rounded-[2rem] sm:p-12">
          <Heading level={HeadingLevel.h2} size={HeadingSize.lg}>No journeys yet</Heading>
          <Text size={TextSize.xs} className="mx-auto mt-3 max-w-md text-muted-foreground">
            Create your first trip to start collecting ideas, collaborators, and itinerary moments in one place.
          </Text>
        </section>
      )}

      <section className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[2fr_1fr] lg:gap-8">
        <div className="rounded-[1.5rem] bg-[#fbebe3] p-6 sm:rounded-[2rem] sm:p-10">
          <Heading level={HeadingLevel.h2} size={HeadingSize.xl}>Exploration Summary</Heading>
          <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-3">
            <div>
              <Text size={TextSize.xxl} className="font-extrabold text-primary sm:text-5xl">{Math.max(trips.length * 4, 14)}</Text>
              <Text size={TextSize.xxs} className="mt-2 font-bold uppercase tracking-widest text-muted-foreground">Countries visited</Text>
            </div>
            <div>
              <Text size={TextSize.xxl} className="font-extrabold text-primary sm:text-5xl">{Math.max(trips.length * 800, 3200).toLocaleString()}</Text>
              <Text size={TextSize.xxs} className="mt-2 font-bold uppercase tracking-widest text-muted-foreground">Miles traveled</Text>
            </div>
            <div>
              <Text size={TextSize.xxl} className="font-extrabold text-primary sm:text-5xl">{trips.length}</Text>
              <Text size={TextSize.xxs} className="mt-2 font-bold uppercase tracking-widest text-muted-foreground">Active plans</Text>
            </div>
          </div>
        </div>
        <div className="relative min-h-[260px] overflow-hidden rounded-[1.5rem] bg-[#372f2a] p-6 text-white sm:rounded-[2rem] sm:p-8">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80" alt="World map" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="relative">
            <Heading level={HeadingLevel.h2} size={HeadingSize.lg} className="text-white">Explore Map</Heading>
            <Text size={TextSize.xxs} className="mt-3 leading-6 text-white/75">Visualize your entire journey on an interactive global canvas.</Text>
            <Button variant="secondary" className="mt-16 w-full">Open Interactive Map</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
