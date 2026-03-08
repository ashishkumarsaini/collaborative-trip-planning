'use client';

import { Heading, HeadingSize, Text, TextSize } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";

export const ProfileDetails = () => {
  const { user, onLogoutUser } = useAuth();

  if (!user) {
    return <Text>Please logged in!</Text>
  }

  return (
    <div className="flex items-center flex-col gap-4">
      <div className="border border-dashed rounded-md w-full">
        <div className="flex flex-col items-center gap-4 justify-center p-4">
          <Avatar className="p-10 bg-muted">
            <AvatarFallback className="text-2xl text-primary">{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <Heading size={HeadingSize.lg}>{`${user.firstName} ${user.lastName}`}</Heading>
          <Text size={TextSize.sm}>{user.email}</Text>
          <Badge className="uppercase">
            {user.role}
          </Badge>
        </div>
      </div>
      <Button onClick={onLogoutUser}>Logout</Button>
    </div>
  )
}