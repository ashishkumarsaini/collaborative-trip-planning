'use client';
import { CreateTripForm } from "@/components/form";
import { useAuth } from "@/lib/context";
import { redirect } from "next/navigation";

export default function CreateTrip() {
  const { user } = useAuth();

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="pt-10 pb-30">
      <div className="max-w-[500px] m-auto">
        <CreateTripForm />
      </div>
    </div>
  )
}