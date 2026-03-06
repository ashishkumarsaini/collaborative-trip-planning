import { AuthProvider } from "./auth-provider";
import { UserTripsProvider } from './user-trips-provider';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserTripsProvider>
        {children}
      </UserTripsProvider>
    </AuthProvider>
  );
}