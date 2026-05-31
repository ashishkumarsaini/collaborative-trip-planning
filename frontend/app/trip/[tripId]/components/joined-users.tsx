import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { User } from "@/lib/types";

export const JoinedUsers = ({ users }: { users: User[] }) => {
  const isUserAvailable = Boolean(users.length);

  return (
    <section className="serene-panel rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="font-extrabold">Member List</Heading>
        <span className="text-sm font-bold text-primary">{users.length} / 10 Joined</span>
      </div>
      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
        {isUserAvailable ? (
          users.map((user) => (
            <div key={user._id} className="flex items-center gap-3">
              <Avatar className="size-11">
                <AvatarFallback className="bg-[#d9f1ec] text-primary">{user.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <Text size={TextSize.xxs} className="truncate font-bold">{user.firstName}</Text>
                <Text size={TextSize.xxs} className="text-muted-foreground">Confirmed</Text>
              </div>
            </div>
          ))
        ) : (
          <Text size={TextSize.xxs} className="col-span-2 text-muted-foreground">No one joined the trip yet.</Text>
        )}
        <button className="flex items-center gap-3 rounded-full text-sm font-bold text-primary">
          <span className="grid size-11 place-items-center rounded-full bg-[#fbebe3]">+</span>
          Invite
        </button>
      </div>
    </section>
  );
};
