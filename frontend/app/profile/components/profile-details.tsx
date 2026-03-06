'use client';

import { Text, TextSize } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context";

export const ProfileDetails = () => {
  const { user } = useAuth();

  if (!user) {
    return <Text>Please logged in!</Text>
  }

  return (
    <div className="border border-dashed rounded">
      <div className="flex flex-col items-center justify-center p-4">
        <Avatar className="p-10 bg-muted">
          <AvatarFallback className="text-2xl text-primary">{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <Text className="capitalize mt-2">{`${user.firstName} ${user.lastName}`}</Text>
        <Text className="capitalize" size={TextSize.sm}>{user.role}</Text>
        <div className="bg-muted">
        </div>
      </div>
    </div>
  )
}