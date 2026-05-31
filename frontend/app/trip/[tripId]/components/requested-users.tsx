"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { acceptTripRequest } from "@/lib/services";
import { User } from "@/lib/types";
import { toast } from "sonner";

export const RequestedUsers = ({ users, tripId }: { users: User[], tripId: string }) => {
  const isUserAvailable = Boolean(users.length);
  const [isloading, setLoading] = useState(false);

  const handleAccept = async (userId: string) => {
    if (!tripId) return;

    setLoading(true);
    const { message } = await acceptTripRequest(tripId, userId);
    toast.message(message);
    setLoading(false);
  };

  return (
    <section className="serene-panel rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-7">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ffdbc9] text-primary sm:size-12">
          <Inbox className="size-5" />
        </span>
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="font-extrabold">Organizer Inbox</Heading>
      </div>
      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
        {isUserAvailable ? (
          users.slice(0, 2).map((user) => (
            <div key={user._id} className="flex flex-col gap-3 rounded-[1.25rem] bg-[#fbebe3] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-full">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-10 sm:size-12">
                  <AvatarFallback className="bg-[#d9f1ec] text-primary">{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <Text size={TextSize.xxs} className="truncate font-bold">{user.firstName} {user.lastName}</Text>
                  <Text size={TextSize.xxs} className="text-muted-foreground">{user.email}</Text>
                </div>
              </div>
              <Button size="sm" onClick={() => handleAccept(user._id)} disabled={isloading} className="w-full sm:w-auto">Accept</Button>
            </div>
          ))
        ) : (
          <Text size={TextSize.xxs} className="text-muted-foreground">No pending requests.</Text>
        )}
      </div>
      {users.length > 2 && <Text size={TextSize.xxs} className="mt-6 text-muted-foreground">{users.length - 2} other pending requests</Text>}
    </section>
  );
};
