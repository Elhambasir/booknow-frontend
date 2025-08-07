"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader, X, MapPin } from "lucide-react";
import {
  findAirportTerminals,
  isAirportQuery,
  AirportTerminal,
} from "@/lib/airportDatabase";
import { Location } from "@/types";
import { useLocationStore } from "@/store/useLocationStore";
import { useBookingStore } from "@/store/bookingStore";
import { Label } from "./ui/label";
interface AddressSearchProps {
  onLocationSelect: (location: Location) => void;
  placeholder: string;
  selectedLocation: Location | null;
  type: "pickup" | "dropoff";
  label: string;
  isRequired?: boolean;
}

interface AddressListResult {
  Line: string;
  ID: string;
}

interface AddressListResponse {
  results: AddressListResult[];
  inputid: number;
  queryid: number;
  processResult: boolean;
  instructionsHtml: string;
  instructionsTxt: string;
  finishword: string;
  errormessage: string;
}

interface FullAddressResponse {
  found: boolean;
  error: boolean;
  inputid: number;
  licenseStatus: string;
  addressID: string;
  organisation: string;
  line1: string;
  line2: string;
  line3: string;
  town: string;
  county: string;
  postcode: string;
  rawpostcode: string;
  country: string;
  deliverypointsuffix: string;
  nohouseholds: string;
  smallorg: string;
  pobox: string;
  mailsortcode: string;
  unique1: string;
  unique2: string;
  propertyNo: string;
  propertyName: string;
  streetName: string;
  udprn: string;
  userid: string;
  geoposition: string;
  geolongitude: number;
  geolatitude: number;
  geodistanceinkm: number;
  geodistanceinmiles: number;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

interface SearchResult {
  Line: string;
  ID: string;
  priority: number;
  isAirportTerminal: boolean;
  terminalData?: AirportTerminal;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  onLocationSelect,
  placeholder,
  selectedLocation,
  type,
  label,
  isRequired=false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { updateBooking, booking } = useBookingStore();
  const { updateLocation } = useLocationStore();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const searchAddresses = useCallback(async (term: string) => {
    if (term.trim().length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);

    try {
      // First check if it's an airport query
      if (isAirportQuery(term)) {
        const airportTerminals = findAirportTerminals(term);

        if (airportTerminals.length > 0) {
          // Use airport database directly - no API call needed
          const airportResults: SearchResult[] = airportTerminals.map(
            (terminal) => ({
              Line: terminal.displayName,
              ID: terminal.name, // Use terminal name as ID
              priority: terminal.priority,
              isAirportTerminal: true,
              terminalData: terminal,
            })
          );

          setSearchResults(airportResults);
          setShowDropdown(true);
          setIsSearching(false);
          return;
        }
      }

      // Fallback to API search for non-airport queries

      const response = await fetch(
        `https://api.simplylookupadmin.co.uk/full_v3/getaddresslist?data_api_key=${API_KEY}&query=${encodeURIComponent(
          term
        )}&queryid=1&inputid=2`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AddressListResponse = await response.json();

      if (data.errormessage) {
        console.error("Search Error:", data.errormessage);
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      const apiResults: SearchResult[] = (data.results || []).map((result) => ({
        Line: result.Line,
        ID: result.ID,
        priority: 999,
        isAirportTerminal: false,
      }));

      setSearchResults(apiResults);
      setShowDropdown(apiResults.length > 0);
    } catch (error) {
      console.error("Address search error:", error);
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    (term: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        searchAddresses(term);
      }, 500);
    },
    [searchAddresses]
  );

  const getFullAddress = async (id: string): Promise<Location | null> => {
    try {
      const response = await fetch(
        `https://api.simplylookupadmin.co.uk/full_v3/getselectedaddress?data_api_key=${API_KEY}&id=${encodeURIComponent(
          id
        )}&inputid=0`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FullAddressResponse = await response.json();
      if (!data.found || data.error) {
        console.error(
          "Address Error: Could not retrieve full address details."
        );
        return null;
      }

      const addressParts = [
        data.organisation,
        data.line1,
        data.line2,
        data.line3,
        data.town,
        data.county,
      ].filter((part) => part && part.trim());

      return {
        address: addressParts.join(", "),
        city: data.town,
        state: data.county,
        country: data.country,
        postcode: data.postcode,
        latitude: data.geolatitude,
        longitude: data.geolongitude,
      };
    } catch (error) {
      console.error("Full address error:", error);
      return null;
    }
  };

  const handleResultSelect = async (result: SearchResult) => {
    setShowDropdown(false);
    setSearchTerm(result.Line);
    if (result.isAirportTerminal && result.terminalData) {
      // Use airport database data directly
      const location: Location = {
        address: result.terminalData.displayName,
        city: result.terminalData.city,
        state: result.terminalData.state,
        country: result.terminalData.country,
        postcode: result.terminalData.postcode,
        latitude: result.terminalData.latitude,
        longitude: result.terminalData.longitude,
        isAirport: true,
      };

      console.log("Selected airport terminal:", location);
      onLocationSelect(location);
    } else {
      // Get full address from API
      const fullAddress = await getFullAddress(result.ID);

      if (fullAddress) {
        console.log("Selected address:", fullAddress);
        onLocationSelect(fullAddress);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedLocation && selectedLocation.address !== value) {
      // Clear selected location when user starts typing again
      onLocationSelect({
        address: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
        latitude: 0,
        longitude: 0,
        isAirport: false,
      });
    }

    // Only trigger search if we have enough characters
    if (value.trim().length >= 3) {
      debouncedSearch(value);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const clearSelection = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowDropdown(false);
    onLocationSelect({
      address: "",
      city: "",
      state: "",
      country: "",
      postcode: "",
      latitude: 0,
      longitude: 0,
    });
    if (type === "pickup") {
      updateLocation(type, {
        address: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
        latitude: 0,
        longitude: 0,
      });
      updateBooking({
        ...booking,
        from_location: undefined,
      });
    } else {
      updateLocation(type, {
        address: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
        latitude: 0,
        longitude: 0,
      });
      updateBooking({
        ...booking,
        to_location: undefined,
      });
    }
  };

  const displayValue = selectedLocation?.address || searchTerm;

  return (
    <div className="relative" ref={searchRef}>
      <Label className="mb-2">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />

        {selectedLocation &&
          selectedLocation.latitude !== 0 &&
          !isSearching && (
            <button
              type="button"
              onClick={clearSelection}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}

        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader className="w-4 h-4 animate-spin text-primary" />
          </div>
        )}
      </div>

      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={`${result.ID}-${index}`}
              onClick={() => handleResultSelect(result)}
              className={`w-full px-4 py-3 text-left hover:bg-accent border-b border-border last:border-b-0 transition-colors focus:outline-none focus:bg-accent ${
                result.isAirportTerminal
                  ? "bg-accent/50 border-l-4 border-l-primary"
                  : ""
              }`}
            >
              <div className="flex items-center">
                {result.isAirportTerminal && (
                  <span className="text-primary mr-2">✈️</span>
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {result.Line}
                  </div>
                  {result.isAirportTerminal ? (
                    <div className="text-xs text-primary font-medium">
                      Airport Terminal • {result.terminalData?.postcode}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Address</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showDropdown &&
        searchResults.length === 0 &&
        !isSearching &&
        searchTerm.trim().length >= 3 && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg p-4 text-sm text-muted-foreground text-center">
            <p>No addresses found for "{searchTerm}"</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try searching with a postcode or full address
            </p>
          </div>
        )}
    </div>
  );
};
