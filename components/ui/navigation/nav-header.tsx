"use client";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export default function NavigationHeader() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("project") || "";
    setValue(value);
  }, []);

  const frameworks = [
    { label: "Analytics", value: "EA" },
    { label: "Ophtai", value: "ophtai" },
  ];

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start gap-4 h-12 items-center pr-3"
          >
            <article className="bg-primary-foreground w-12 h-10 flex items-center justify-center rounded border">
              {value
                ? frameworks
                    .find((framework) => framework.value === value)
                    ?.label.slice(0, 2)
                : "??"}
            </article>
            <span className="w-full flex gap-2 items-center">
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Select project..."}
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full px-3.5 py-0">
          <Command className="w-full">
            <CommandInput className="w-full" placeholder="Search project..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  className=""
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
