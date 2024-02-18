"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import LogOutButton from "../auth/logout.button";
import { CommandSearch } from "../command-search";
import { ToggleTheme } from "../toggleTheme";

export default function NavigationChildrenHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-end gap-4">
      <article className="command w-56">
        <CommandSearch />
      </article>
      <Separator orientation="vertical" className="h-8" />
      <ToggleTheme />
      <Separator orientation="vertical" className="h-8" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {session?.user?.image && (
              <AvatarImage className="w-10 h-10" src={session!.user!.image} />
            )}
            <AvatarFallback className="bg-primary-foreground w-10 h-10 flex items-center justify-center rounded-full border">
              {session?.user?.firstName || session?.user?.lastName ? (
                (session?.user?.firstName ?? "").charAt(0).toUpperCase() +
                (session?.user?.lastName ?? "").charAt(0).toUpperCase()
              ) : (
                <UserIcon />
              )}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2">
            <LogOutButton className="px-0 py-0 h-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
