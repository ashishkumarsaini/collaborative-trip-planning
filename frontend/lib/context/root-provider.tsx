import { AuthProvider } from "./auth-provider";
import { UserTripsProvider } from './user-trips-provider';
import { AppDrawerProvider } from './app-drawers';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserTripsProvider>
        <AppDrawerProvider>
          {children}
        </AppDrawerProvider>
      </UserTripsProvider>
    </AuthProvider >
  );
}