"use client";

import { X, Loader, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Location } from "@/types";
import {
  findAirportTerminals,
  isAirportQuery,
  AirportTerminal,
} from "@/lib/airportDatabase";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const API_KEY = "88c9f7fe-708d-47dd-bc24-8bc83dca0908";

interface SearchResult {
  Line: string;
  ID: string;
  priority: number;
  isAirportTerminal: boolean;
  terminalData?: AirportTerminal;
}

type AddressSearchFieldProps = {
  name: string; // e.g. "from_location"
  label: string;
  placeholder: string;
  isRequired?: boolean;
};

export function AddressSearchField({
  name,
  label,
  placeholder,
  isRequired = false,
}: AddressSearchFieldProps) {
  const form = useFormContext();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  /** Prefill from existing value (edit mode) */
  useEffect(() => {
    const existingValue: Location | null = form.getValues(name);
    if (existingValue?.address) {
      setSearchTerm(existingValue.address);
    }
  }, [form, name]);

  /** Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Search logic */
  const searchAddresses = useCallback(async (term: string) => {
    if (term.trim().length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    setIsSearching(true);
    try {
      // 1. Airport DB first
      if (isAirportQuery(term)) {
        const airportTerminals = findAirportTerminals(term);
        if (airportTerminals.length > 0) {
          setSearchResults(
            airportTerminals.map((terminal) => ({
              Line: terminal.displayName,
              ID: terminal.name,
              priority: terminal.priority,
              isAirportTerminal: true,
              terminalData: terminal,
            }))
          );
          setShowDropdown(true);
          setIsSearching(false);
          return;
        }
      }

      // 2. Fallback to API
      const response = await fetch(
        `https://api.simplylookupadmin.co.uk/full_v3/getaddresslist?data_api_key=${API_KEY}&query=${encodeURIComponent(
          term
        )}&queryid=1&inputid=2`
      );
      const data = await response.json();
      if (data.errormessage) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }
      setSearchResults(
        (data.results || []).map((result: any) => ({
          Line: result.Line,
          ID: result.ID,
          priority: 999,
          isAirportTerminal: false,
        }))
      );
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    (term: string) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        searchAddresses(term);
      }, 500);
    },
    [searchAddresses]
  );

  /** Get full address from API */
  const getFullAddress = async (id: string): Promise<Location | null> => {
    try {
      const res = await fetch(
        `https://api.simplylookupadmin.co.uk/full_v3/getselectedaddress?data_api_key=${API_KEY}&id=${encodeURIComponent(
          id
        )}&inputid=0`
      );
      const data = await res.json();
      if (!data.found || data.error) return null;
      const parts = [
        data.organisation,
        data.line1,
        data.line2,
        data.line3,
        data.town,
        data.county,
      ].filter(Boolean);
      return {
        address: parts.join(", "),
        city: data.town,
        state: data.county,
        country: data.country,
        postcode: data.postcode,
        latitude: data.geolatitude,
        longitude: data.geolongitude,
      };
    } catch {
      return null;
    }
  };

  /** Handle selection */
  const handleResultSelect = async (result: SearchResult) => {
    setShowDropdown(false);
    setSearchTerm(result.Line);

    let location: Location | null = null;
    if (result.isAirportTerminal && result.terminalData) {
      location = {
        address: result.terminalData.displayName,
        city: result.terminalData.city,
        state: result.terminalData.state,
        country: result.terminalData.country,
        postcode: result.terminalData.postcode,
        latitude: result.terminalData.latitude,
        longitude: result.terminalData.longitude,
        isAirport: true,
      };
    } else {
      location = await getFullAddress(result.ID);
    }

    if (location) {
      form.setValue(name, location, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  /** Clear */
  const clearSelection = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowDropdown(false);
    form.setValue(name, null, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem ref={searchRef}>
          <FormLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  if (val.trim().length >= 3) {
                    debouncedSearch(val);
                  } else {
                    setSearchResults([]);
                    setShowDropdown(false);
                  }
                }}
                placeholder={placeholder}
                className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              {form.getValues(name)?.latitude && !isSearching && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {isSearching && (
                <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
              )}
            </div>
          </FormControl>
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((result, idx) => (
                <button
                  key={`${result.ID}-${idx}`}
                  type="button"
                  onClick={() => handleResultSelect(result)}
                  className="w-full px-4 py-3 text-left hover:bg-accent border-b border-border last:border-b-0"
                >
                  {result.Line}
                </button>
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
