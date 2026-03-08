import { Text, TextSize } from "@/components/typography"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/lib/types"

export const JoinedUsers = ({ users }: { users: User[] }) => {
  const isUserAvailable = Boolean(users.length);

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
              </div>
            ))}
          </>
        ) : (
          <div>No one joined the trip yet</div>
        )}
      </div>
    </div>
  )
}