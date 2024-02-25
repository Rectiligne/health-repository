"use client";

import { cn, firstLetterUppercase } from "@/lib/utils";
import { useProviderStore } from "@/store/provider.store";
import { providerIcon } from "@/types/provider.type";
import clsx from "clsx";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { useStore } from "zustand";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface NavigationHeaderProps {
  wideView: boolean;
}

export default function NavigationHeader({ wideView }: NavigationHeaderProps) {
  const currentProvider = useStore(useProviderStore, (state) => state.current);
  const allProviders = useProviderStore((state) => state.providers);
  const updateProvider = useProviderStore((state) => state.updateProvider);
  const fetchAllProviders = useProviderStore(
    (state) => state.fetchAllProviders
  );

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchAllProviders();
  }, [fetchAllProviders]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={clsx(
              "gap-4 h-10 items-center pr-3",
              {
                "w-full py-0": wideView,
              },
              {
                "w-10 p-0": !wideView,
              }
            )}
          >
            <article
              className={clsx(
                "bg-primary-foreground w-12 h-10 flex items-center justify-center rounded border"
              )}
            >
              {providerIcon[currentProvider?.provider ?? "unknown"]}
            </article>
            {wideView && (
              <span className={clsx("w-full flex gap-2 items-center")}>
                {firstLetterUppercase(
                  currentProvider?.provider ?? "Select provider..."
                )}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full px-3.5 py-0">
          <Command className="w-full">
            <CommandInput className="w-full" placeholder="Search project..." />
            <CommandEmpty>No provider found.</CommandEmpty>
            <CommandGroup>
              {allProviders.map((provider) => (
                <CommandItem
                  className=""
                  key={provider.provider}
                  value={firstLetterUppercase(provider.provider)}
                  onSelect={() => {
                    updateProvider(provider);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentProvider === provider ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {firstLetterUppercase(provider.provider)}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
