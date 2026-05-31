'use client';

import Link from "next/link";
import { Map, Plus, Search, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth, useDrawers } from "@/lib/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { user, onLogoutUser } = useAuth();
  const { onCreateTripDrawerToggle } = useDrawers();
  const navItems = [
    { href: "/", label: "Explore" },
    { href: "/all", label: "Itineraries" },
    { href: "/profile", label: "Groups" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/84 backdrop-blur-2xl">
      <div className="serene-shell flex h-mobile-header items-center justify-between gap-3 md:h-desktop-header md:gap-5">
        <Link href="/" title="WanderScape" className="flex min-w-0 items-center gap-2 text-primary">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 sm:size-9">
            <Map className="size-4" />
          </span>
          <span className="truncate text-base font-extrabold tracking-tight sm:text-xl">WanderScape</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold text-muted-foreground transition-colors hover:text-primary",
                index === 0 && "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-64 rounded-full border border-transparent bg-input pl-10 pr-4 text-sm outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
              placeholder="Search destinations..."
              type="text"
            />
          </div>

          {!user?._id ? (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden text-foreground md:inline-flex">
                  Log In
                </Button>
              </Link>
              <Button
                onClick={() => onCreateTripDrawerToggle(true)}
                size="sm"
                className="shadow-[0_10px_24px_rgba(144,72,22,0.22)] sm:h-9 sm:px-3"
              >
                <Plus />
                <span className="hidden sm:inline">Plan a Trip</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <Link href="/profile" aria-label="Profile">
                  <UserCircle className="size-8 text-primary" />
                </Link>
              </div>
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <UserCircle />
                      <span>{user?.firstName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 rounded-2xl border-border/80 bg-card" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer" onClick={onLogoutUser}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button
                onClick={() => onCreateTripDrawerToggle(true)}
                size="sm"
                className="shadow-[0_10px_24px_rgba(144,72,22,0.22)] sm:h-9 sm:px-3"
              >
                <Plus />
                <span className="hidden md:inline">Create trip</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
