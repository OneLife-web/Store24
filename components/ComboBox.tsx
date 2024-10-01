"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countries } from "@/lib/constants";

interface SelectCountryProps {
  selectedCountry: string | undefined; // Change to string | undefined
  setSelectedCountry: (country: string | undefined) => void;
}

export function ComboboxDemo({
  selectedCountry,
  setSelectedCountry,
}: SelectCountryProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-[48px] rounded-lg justify-between"
        >
          {selectedCountry
            ? countries.find((country) => country?.title === selectedCountry)
                ?.title
            : "Select country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] bg-white p-0">
        <Command>
          <CommandInput placeholder="Search a country" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.title}
                  value={country?.title}
                  onSelect={(currentValue) => {
                    setSelectedCountry(
                      currentValue === selectedCountry
                        ? undefined
                        : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCountry === country?.title
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {country?.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
