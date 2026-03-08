'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { getTrip, removeTripPermission } from "@/lib/services";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Trip } from "@/lib/types";
import { LucideLoader2 } from "lucide-react";

interface RemoveTripPermissionDrawerProps {
  opened: boolean;
  onClose: () => void;
  tripId: string;
}

export const RemoveTripPermissionDrawer = ({ opened, onClose, tripId }: RemoveTripPermissionDrawerProps) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!opened || !tripId) return;
    let cancelled = false;
    setLoading(true);
    getTrip(tripId)
      .then((res) => {
        if (!cancelled) setTrip(res.data.trip as Trip);
      })
      .catch(() => {
        if (!cancelled) toast.error("Failed to load trip");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [opened, tripId]);

  const handleRemove = async (permissionId: string) => {
    setRemovingId(permissionId);
    try {
      const response = await removeTripPermission(tripId, permissionId);
      toast.success(response.message);
      setTrip((prev) =>
        prev
          ? {
            ...prev,
            addedUsersEmail: prev.addedUsersEmail?.filter((p) => p._id !== permissionId) ?? [],
          }
          : null
      );
    } catch {
      toast.error("Failed to remove permission");
    } finally {
      setRemovingId(null);
    }
  };

  const permissions = trip?.addedUsersEmail ?? [];

  return (
    <Sheet open={opened}>
      <SheetContent showCloseButton onClose={onClose}>
        <SheetHeader>
          <SheetTitle>Remove permissions</SheetTitle>
          <SheetDescription>
            Remove a user&apos;s access to this trip.
            <div className="mt-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <LucideLoader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : permissions.length === 0 ? (
                <p className="text-muted-foreground text-sm">No permissions added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {permissions.map((p) => (
                    <li
                      key={p._id}
                      className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2"
                    >
                      <span className="text-sm">
                        <span className="font-medium">{p.email}</span>
                        <span className="text-muted-foreground"> — {p.permission}</span>
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemove(p._id)}
                        disabled={removingId === p._id}
                      >
                        {removingId === p._id ? "Removing…" : "Remove"}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
