"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin, ArrowRight } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";
// import { useBookingStore } from "@/store/bookingStore";
import { format } from "date-fns";
import { AddressSearch } from "./form/LocationSearch";
import { useLocationStore } from "@/store/useLocationStore";
import { useBookingStore } from "@/store/bookingStore";
import DatePickerField from "@/components/DatePickerField";
import TimePickerField from "./TimePickerField";
const HeroSectionWithMap = () => {
  const APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_DIRECTION_API_KEY!;

  const router = useRouter();
  const { setBooking, booking, updateBooking } = useBookingStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [time, setTime] = useState<string | null>("12:00pm");
  const [date, setDate] = useState<string | null>(null);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const { pickup, setPickup, dropoff, setDropoff } = useLocationStore();

  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    distanceValue: number;
    durationValue: number;
  } | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: APIKEY,
      version: "weekly",
      libraries: ["places", "geometry"],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 51.5074, lng: -0.1278 }, // London center
          zoom: 10,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        const directionsServiceInstance = new google.maps.DirectionsService();
        const directionsRendererInstance = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#2563eb",
            strokeWeight: 4,
            strokeOpacity: 0.8,
          },
        });

        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
      }
    });
  }, []);

  const calculateRoute = () => {
    if (!directionsService || !directionsRenderer || !pickup || !dropoff) {
      return;
    }

    directionsService.route(
      {
        origin: pickup?.address!,
        destination: dropoff?.address!,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (result, status) => {
        console.log("map status", status, result);
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result);

          const route = result.routes[0];
          const leg = route.legs[0];
          
          setRouteInfo({
            distance: leg.distance?.text || "",
            duration: leg.duration?.text || "",
            distanceValue: leg.distance?.value
              ? leg.distance.value / 1609.34
              : 0, // Convert to miles
            durationValue: leg.duration?.value || 0,
          });
        }
      }
    );
  };

  useEffect(() => {
    if (pickup?.address && dropoff?.address) {
      calculateRoute();
    }
  }, [pickup, dropoff, directionsService]);

  const handleGetQuote = () => {
    if (!pickup || !dropoff || !date || !time) {
      return;
    }
    setBooking({
      type: "one way",
      passengers: 0,
      luggage: 0,
      from_amount: 0,
      meet_greet: 0,
      child_seat: 0,
      airport_fee: 0,
      basePrice: 0,
      totalPrice: 0,
      from_location: pickup,
      to_location: dropoff,
      date: date!,
      time: time!,
      from_distance: Number(routeInfo?.distanceValue.toFixed()) || 0,
      from_duration: Number(routeInfo?.durationValue)/60 || 0,
    });

    router.push("/booking");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-primary">Premium</span>{" "}
                <span className="text-secondary">Airport</span>{" "}
                <span className="text-primary">Transfers</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                Experience luxury, reliability, and comfort with our premium
                chauffeur service. Book your airport transfer and enjoy a
                stress-free journey.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Professional Chauffeurs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Flight Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Fixed Prices</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Get Your Instant Quote
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your journey details below
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="pickup"
                      className="flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Pickup Location</span>
                    </Label>
                    <AddressSearch
                      placeholder="Pickup address or postcode"
                      onLocationSelect={(location) => {
                        setPickup(location);
                      }}
                      selectedLocation={pickup}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="dropoff"
                      className="flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>Dropoff Location</span>
                    </Label>
                    <AddressSearch
                      placeholder="Dropoff address or postcode"
                      onLocationSelect={(location) => {
                        setDropoff(location);
                      }}
                      selectedLocation={dropoff}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <DatePickerField
                      label="Pickup Date"
                      value={date}
                      onChange={(e) => {
                        console.log("selected date", e.toString());
                        setDate(e);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <TimePickerField
                      label="Pickup Time *"
                      value={time || "12:30 pm"}
                      onChange={(e) => {
                        setTime(e);
                      }}
                      className="w-full mt-1"
                    />
                    {/* <ReactTimePicker time={time} setTime={setTime} /> */}
                  </div>
                </div>

                {/* Route Information */}
                {routeInfo && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-primary">
                          {routeInfo.distance}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Distance
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-secondary">
                          {routeInfo.duration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleGetQuote}
                  variant="hero"
                  size="lg"
                  className="w-full text-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!pickup || !dropoff || !date || !time}
                >
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div ref={mapRef} className="w-full h-[600px] rounded-lg" />
            </Card>

            {routeInfo && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h4 className="font-semibold text-primary mb-2">
                      Your Route Preview
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Live route calculation with traffic conditions
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithMap;
