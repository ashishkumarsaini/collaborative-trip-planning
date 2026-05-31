'use client';

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Globe2, Medal, Plane } from "lucide-react";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { useAuth } from "@/lib/context";
import { ProfileDetails } from "./components/profile-details";
import { TripsBooked } from "./components/trips-booked";
import { TripsCreated } from "./components/trips-created";
import { AllTripsWithPermissions } from "./components/trips-with-permission";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="serene-shell py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        <aside className="lg:sticky lg:top-desktop-sticky-top lg:self-start">
          <ProfileDetails />
        </aside>
        <section>
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <Heading level={HeadingLevel.h1} size={HeadingSize.xxl} className="leading-tight text-primary sm:text-5xl md:text-7xl">Effortless Exploration</Heading>
              <Text size={TextSize.xs} className="mt-4 max-w-3xl leading-7 text-muted-foreground sm:text-xl sm:leading-8">
                Welcome back, {user.firstName}. Your journey across thoughtful plans continues today. Where will your curiosity lead you next?
              </Text>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 xl:grid-cols-3">
            <StatCard label="Total Reach" value="24 Countries" icon={<Globe2 />} />
            <StatCard label="Distance Traveled" value="42,850 Miles" icon={<Plane />} />
            <StatCard label="Achievement Level" value="12 Badges" icon={<Medal />} />
          </div>

          <div className="mt-10 sm:mt-12">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Heading level={HeadingLevel.h2} size={HeadingSize.xl}>Managed Trips</Heading>
              <span className="text-sm font-semibold uppercase text-muted-foreground">Active plans</span>
            </div>
            <TripsCreated featured />
          </div>

          <div className="mt-10 grid gap-8 sm:mt-12 xl:grid-cols-2">
            <TripsBooked />
            <AllTripsWithPermissions />
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: ReactNode }) => {
  return (
    <div className="serene-panel relative overflow-hidden rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-7">
      <div className="absolute -right-5 -top-3 text-primary/5 [&_svg]:size-28">{icon}</div>
      <Text size={TextSize.xxs} className="relative font-bold tracking-widest text-primary">{label}</Text>
      <Text size={TextSize.xl} className="relative mt-3 font-extrabold sm:text-3xl">{value}</Text>
    </div>
  );
};

export default ProfilePage;
