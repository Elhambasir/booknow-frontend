import React, { useEffect, useRef, useState } from 'react';
import { Location } from '@/types';

interface GoogleMapProps {
  pickup: Location | null;
  dropoff: Location | null;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const DirectionMap: React.FC<GoogleMapProps> = ({ pickup, dropoff }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      window.initMap = initializeMap;
      
      const script = document.createElement('script');
      const apiKey = 'AIzaSyBIWiUg019MJ1r_WNoTzTEVcFbHSeVO208';
      // Use the API key from environment variables
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: 51.4700, lng: -0.4543 }, // Default to London area
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        draggable: false,
        map: mapInstance,
      });

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
      setIsLoading(false);
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
      delete (window as any).initMap;
    };
  }, []);

  useEffect(() => {
    if (!pickup || !dropoff || !directionsService || !directionsRenderer || !map) {
      return;
    }

    if (pickup.latitude === 0 || dropoff.latitude === 0) {
      return;
    }

    const origin = new window.google.maps.LatLng(pickup.latitude, pickup.longitude);
    const destination = new window.google.maps.LatLng(dropoff.latitude, dropoff.longitude);

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
        
        // Add custom markers for pickup and dropoff
        new window.google.maps.Marker({
          position: origin,
          map: map,
          title: 'Pickup: ' + pickup.address,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#22c55e" stroke="#fff" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" fill="#fff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });

        new window.google.maps.Marker({
          position: destination,
          map: map,
          title: 'Dropoff: ' + dropoff.address,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" fill="#fff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }, [pickup, dropoff, directionsService, directionsRenderer, map]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 overflow-hidden">
      {/* <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Route Map</h3>
        {pickup && dropoff && (
          <div className="text-sm text-gray-600 mt-1">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="truncate">{pickup.address}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="truncate">{dropoff.address}</span>
            </div>
          </div>
        )}
      </div> */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-gray-600">Loading map...</div>
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-96"
          style={{ minHeight: '400px' }}
        />
        {!pickup || !dropoff || pickup.latitude === 0 || dropoff.latitude === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 z-10">
            <div className="text-center text-gray-600">
              <p className="font-medium">Select pickup and dropoff locations</p>
              <p className="text-sm">Map will show directions once both locations are chosen</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
