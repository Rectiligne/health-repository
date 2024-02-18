"use client";

import { Route } from "@/types/routes.type";
import { FileIcon, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { routes } from "../../app/routing";
import { Button } from "./button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="bg-primary-foreground w-full justify-start border border-input"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" /> Recherche
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher une page ou un lien..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {routes.map((route: Route, index: number) => (
              <Link
                key={index}
                href={route.path}
                onClick={() => setOpen(false)}
                passHref
              >
                <CommandItem>
                  <FileIcon className="mr-2 h-4 w-4" />
                  {route.title}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
