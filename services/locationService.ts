import { loadGoogleMaps } from "@/lib/googleMapsLoader";

// Conversion constants
const METERS_TO_MILES = 1609.34; // 1 mile = 1609.34 meters
const SECONDS_TO_MINUTES = 60;

export class LocationService {
  async calculateDistance(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<{ distance: number; duration: number }> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_DIRECTION_API_KEY!;
    if(origin.lat===0&&origin.lng==0){
      return {
        distance: 0,
        duration: 0,
      }
    }
    if(destination.lat===0&&destination.lng==0){
      return {
        distance: 0,
        duration: 0,
      }
    }
    await loadGoogleMaps({
      apiKey: apiKey,
      libraries: ["geometry", "places"],
      language: "en",
      region: "UK",
    });

    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error("Google Maps not loaded"));
        return;
      }

      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [{ lat: origin.lat, lng: origin.lng }],
          destinations: [{ lat: destination.lat, lng: destination.lng }],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL, // Request imperial units
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response) {
            const result = response.rows[0]?.elements[0];

            if (result?.status === "OK") {
              // Google already returns distance in miles when using IMPERIAL unitSystem
              const distanceInMiles = result.distance?.value
                ? result.distance.value / METERS_TO_MILES
                : 0;

              const durationInMin = result.duration?.value
                ? result.duration.value / SECONDS_TO_MINUTES
                : 0;

              resolve({
                distance: this.roundToDecimal(distanceInMiles, 1), // Round to 1 decimal place for miles
                duration: Math.round(durationInMin),
              });
            } else {
              reject(
                new Error(
                  result?.status === "ZERO_RESULTS"
                    ? "No route could be found between the origin and destination"
                    : "Could not calculate route"
                )
              );
            }
          } else {
            reject(new Error(status || "Distance Matrix request failed"));
          }
        }
      );
    });
  }

  private roundToDecimal(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
}
