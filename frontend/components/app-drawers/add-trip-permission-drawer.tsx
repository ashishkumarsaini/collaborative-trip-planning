'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PERMISSIONS } from "@/lib/types";
import { addTripPermission } from "@/lib/services";
import { toast } from "sonner";
import { useState } from "react";

interface AddTripPermissionDrawerProps {
  opened: boolean;
  onClose: () => void;
  tripId: string;
}

export const AddTripPermissionDrawer = ({ opened, onClose, tripId }: AddTripPermissionDrawerProps) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    const response = await addTripPermission(tripId, { email: email.trim(), permission });
    toast.success(response.message);

    setEmail("");
    setPermission(PERMISSIONS.editor);
    onClose();
  };

  return (
    <Sheet open={opened}>
      <SheetContent showCloseButton onClose={onClose}>
        <SheetHeader>
          <SheetTitle>Add permission</SheetTitle>
          <SheetDescription>
            Grant a user access to this trip by email and role.
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Permission</Label>
                <Select
                  value={permission}
                  onValueChange={(v) => setPermission(v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PERMISSIONS.editor}>Editor</SelectItem>
                    <SelectItem value={PERMISSIONS.creator}>Creator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding…" : "Add permission"}
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
