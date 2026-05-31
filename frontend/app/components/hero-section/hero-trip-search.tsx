import { Calendar, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroTripSearch = () => {
  return (
    <div className="serene-card mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-[1.75rem] p-2 sm:mt-10 sm:flex-row sm:items-center sm:rounded-full">
      <label className="flex h-12 flex-1 items-center gap-3 rounded-full px-4 text-left max-md:border border-primary">
        <MapPin className="size-4 text-primary" />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Where to?" />
      </label>
      <span className="hidden h-8 w-px bg-border sm:block" />
      <label className="flex h-12 flex-1 items-center gap-3 rounded-full px-4 text-left max-md:border border-primary">
        <Calendar className="size-4 text-primary" />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="When?" />
      </label>
      <Button size="lg" className="w-full rounded-full shadow-[0_12px_24px_rgba(144,72,22,0.26)] sm:size-10 sm:w-full sm:px-0 md:size-10">
        <Search />
      </Button>
    </div>
  )
};
