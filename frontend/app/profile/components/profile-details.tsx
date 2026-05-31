'use client';

import { Heart, HelpCircle, ListChecks, Map, Settings, Shield, Users } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth, useDrawers } from "@/lib/context";

const navItems = [
  { label: "All Trips", icon: Map, active: true },
  { label: "Shared with Me", icon: Users },
  { label: "Drafts", icon: ListChecks },
  { label: "Wishlist", icon: Heart },
  { label: "Settings", icon: Settings },
];

export const ProfileDetails = () => {
  const { user } = useAuth();
  const { onCreateTripDrawerToggle } = useDrawers();

  if (!user) {
    return <Text>Please log in.</Text>;
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <div className="serene-panel rounded-[1.5rem] bg-[#fff1ea] p-4 sm:p-5 lg:min-h-[calc(100vh-120px)] lg:rounded-[2rem]">
      <div className="flex items-center gap-4">
        <Avatar className="size-14 border-2 border-white shadow-md">
          <AvatarFallback className="bg-primary text-lg font-bold text-white">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <Heading level={HeadingLevel.h2} size={HeadingSize.lg} className="text-primary">{user.firstName} {user.lastName}</Heading>
          <Text size={TextSize.xxs} className="text-muted-foreground">{user.role === "user" ? "Premium Explorer" : user.role}</Text>
        </div>
      </div>

      <nav className="no-scrollbar -mx-1 mt-6 flex gap-2 overflow-x-auto pb-1 lg:mx-0 lg:mt-12 lg:block lg:space-y-3 lg:overflow-visible lg:pb-0">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex h-11 shrink-0 items-center gap-3 rounded-full px-4 text-left text-sm font-bold transition lg:h-14 lg:w-full lg:gap-4 lg:px-5 ${
              active ? "bg-[#fec9ad] text-secondary-foreground" : "text-foreground hover:bg-white/60"
            }`}
          >
            <Icon className="size-5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-14 hidden border-t border-primary/10 pt-8 lg:block" />
      <Button onClick={() => onCreateTripDrawerToggle(true)} className="mt-6 h-12 w-full shadow-[0_14px_30px_rgba(144,72,22,0.22)] lg:mt-8">
        Invite Friends
      </Button>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-muted-foreground lg:mt-8 lg:block lg:space-y-4">
        <div className="flex items-center gap-3"><HelpCircle className="size-5" />Help Center</div>
        <div className="flex items-center gap-3"><Shield className="size-5" />Privacy</div>
      </div>
    </div>
  );
};
