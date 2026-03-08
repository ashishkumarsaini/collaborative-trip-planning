"use client";

import { useState } from "react";
import { Text, TextSize } from "@/components/typography"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types"
import { acceptTripRequest } from "@/lib/services";
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
    <div className="border border-solid rounded p-4">
      <Text size={TextSize.md}>Requested Users</Text>
      <div className="mt-4">
        {isUserAvailable ? (
          <>
            {users.map((user) => (
              <div key={user._id} className="flex justify-between items-center mt-4">
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Text size={TextSize.xs}>{user.firstName}</Text>
                </div>
                <Button
                  onClick={() => handleAccept(user._id)}
                  disabled={isloading}
                >
                  Accept
                </Button>
              </div>
            ))}
          </>
        ) : (
          <div>No requests from User</div>
        )}
      </div>
    </div>
  )
}