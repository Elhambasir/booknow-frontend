import React, { useEffect, useRef, useState } from "react";
import { Location } from "@/types";
import { loadGoogleMaps } from "@/lib/googleMapsLoader";

interface GoogleMapProps {
  pickup: Location | null;
  dropoff: Location | null;
}

declare global {
  interface Window {
    google: any;
  }
}

export const DirectionMap: React.FC<GoogleMapProps> = ({ pickup, dropoff }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs to keep track of markers
  const pickupMarkerRef = useRef<any>(null);
  const dropoffMarkerRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        await loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAP_DIRECTION_API_KEY!);

        if (!isMounted || !mapRef.current || !window.google) return;

        const mapInstance = new window.google.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: 51.47, lng: -0.4543 },
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        const directionsServiceInstance = new window.google.maps.DirectionsService();
        const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
          draggable: false,
          map: mapInstance,
          suppressMarkers: true, // We'll handle our own markers
        });

        if (isMounted) {
          setMap(mapInstance);
          setDirectionsService(directionsServiceInstance);
          setDirectionsRenderer(directionsRendererInstance);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load Google Maps:", err);
        if (isMounted) {
          setError("Failed to load map. Please try again later.");
          setIsLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!pickup || !dropoff || !directionsService || !directionsRenderer || !map) {
      return;
    }

    if (pickup.latitude === 0 || dropoff.latitude === 0) {
      return;
    }

    // Clear previous markers
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null);
    }
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.setMap(null);
    }

    const origin = new window.google.maps.LatLng(pickup.latitude, pickup.longitude);
    const destination = new window.google.maps.LatLng(dropoff.latitude, dropoff.longitude);

    // Create bounds to fit both locations
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(origin);
    bounds.extend(destination);
    map.fitBounds(bounds);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        // Create new pickup marker
        pickupMarkerRef.current = new window.google.maps.Marker({
          position: origin,
          map: map,
          title: "Pickup: " + pickup.address,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#22c55e" stroke="#fff" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" fill="#fff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });

        // Create new dropoff marker
        dropoffMarkerRef.current = new window.google.maps.Marker({
          position: destination,
          map: map,
          title: "Dropoff: " + dropoff.address,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" fill="#fff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });
      } else {
        console.error("Directions request failed due to " + status);
        setError("Could not calculate route. Please try again.");
      }
    });
  }, [pickup, dropoff, directionsService, directionsRenderer, map]);

  // Cleanup markers when component unmounts
  useEffect(() => {
    return () => {
      if (pickupMarkerRef.current) {
        pickupMarkerRef.current.setMap(null);
      }
      if (dropoffMarkerRef.current) {
        dropoffMarkerRef.current.setMap(null);
      }
    };
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 overflow-hidden">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-gray-600">Loading map...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100/90 z-10">
            <div className="text-center text-red-600">
              <p className="font-medium">Error loading map</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-96"
          style={{ minHeight: "400px" }}
        />
        {!pickup || !dropoff || pickup.latitude === 0 || dropoff.latitude === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 z-10">
            <div className="text-center text-gray-600">
              <p className="font-medium">Select pickup and dropoff locations</p>
              <p className="text-sm">
                Map will show directions once both locations are chosen
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};