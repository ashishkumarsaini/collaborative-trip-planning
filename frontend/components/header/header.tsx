'use client';
import { Mountain, Plus, UserCircle } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useAuth, useDrawers } from "@/lib/context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const Header = () => {
  const { user, onLogoutUser } = useAuth();
  const { onCreateTripDrawerToggle } = useDrawers();

  return (
    <header>
      <div className="fixed top-0 right-0 left-0 w-full backdrop-blur-2xl border-b border-dashed z-50">
        <div className="h-mobile-header md:h-desktop-header flex items-center justify-between max-w-[1250px] border-r border-l m-auto px-5">
          <div className="flex flex-col">
            <Link href="/" title="Wanderscape">
              <div className="flex gap-1">
                <Mountain className="fill-primary" />
                <p className="font-bold">
                  <span className="text-primary">Wander</span>
                  <span>Scape</span>
                </p>
              </div>
            </Link>
          </div>
          <div>
            <div className="">
              {!user?._id ? (
                <Link href='/login'>
                  <Button variant="link" className="flex gap-2">
                    <UserCircle />
                    <p className="text-white">Login</p>
                  </Button>
                </Link>
              ) : (
                <div className="flex gap-4 items-center">
                  <div>
                    <div className="hidden max-md:block">
                      <Link href="/profile">
                        <UserCircle className="fill-primary" />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="link" className="flex gap-2">
                            <UserCircle />
                            <p>{user?.firstName}</p>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Link href='/profile'>
                                Profile
                              </Link>
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
                  </div>
                  <Button onClick={() => onCreateTripDrawerToggle(true)}>
                    <span className="max-md:block inline-flex items-center">
                      <Plus />
                      <span className="hidden md:block ml-2">Create trip</span>
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}