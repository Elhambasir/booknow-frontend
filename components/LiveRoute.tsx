// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import React, { useRef, useEffect, useState } from "react";
// import { useBookingStore } from "@/store/bookingStore";
// import { MapPin, NavigationIcon } from "lucide-react";
// import { Loader } from "@googlemaps/js-api-loader";

// export default function LiveRoute() {
//   const { booking, updateBooking } = useBookingStore();
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [directionsService, setDirectionsService] = useState<any>(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
//   const [distance, setDistance] = useState<string>("");
//   const [duration, setDuration] = useState<string>("");
//   // Calculate route when pickup and dropoff are set
//   useEffect(() => {
//     if (
//       directionsService &&
//       directionsRenderer &&
//       booking.from_location &&
//       booking.to_location
//     ) {
//       if (booking.from_location && booking.to_location) {
//         calculateRoute();
//       }
//     }
//   }, [
//     directionsService,
//     directionsRenderer,
//     booking.from_location,
//     booking.to_location,
//   ]);

//   const calculateRoute = () => {
//     if (!directionsService || !directionsRenderer) return;

//     directionsService.route(
//       {
//         origin: booking.from_location?.address,
//         destination: booking.to_location?.address,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (result: any, status: string) => {
//         if (status === google.maps.DirectionsStatus.OK && result) {
//           directionsRenderer.setDirections(result);
//           const route = result.routes[0];
//           const leg = route.legs[0];
//           setDistance(leg.distance?.text || "");
//           setDuration(leg.duration?.text || "");
//           // Update booking with distance for price calculation
//           const distanceKm = leg.distance?.value
//             ? leg.distance.value / 1000
//             : 0;

//           updateBooking({
//             from_distance: distanceKm,
//             from_duration: leg.duration?.value || 0,
//           });
//         } else {
//           // console.error("Directions request failed:", status);
//           directionsRenderer.setDirections({ routes: [] });
//           setDistance("");
//           setDuration("");
//         }
//       }
//     );
//   };
//   // Initialize Google Maps
//   useEffect(() => {
//     let mapInstance: any = null;

//     const initMap = async () => {
//       const loader = new Loader({
//         apiKey: "AIzaSyBIWiUg019MJ1r_WNoTzTEVcFbHSeVO208",
//         version: "weekly",
//         libraries: ["places"],
//       });

//       try {
//         const google = await loader.load();

//         if (mapRef.current) {
//           mapInstance = new google.maps.Map(mapRef.current, {
//             center: { lat: 51.5074, lng: -0.1278 },
//             zoom: 10,
//             styles: [
//               {
//                 featureType: "all",
//                 elementType: "geometry.fill",
//                 stylers: [{ weight: "2.00" }],
//               },
//             ],
//           });

//           const directionsServiceInstance = new google.maps.DirectionsService();
//           const directionsRendererInstance = new google.maps.DirectionsRenderer(
//             {
//               draggable: false,
//               panel: null,
//               polylineOptions: {
//                 strokeColor: "#3B82F6",
//                 strokeWeight: 4,
//               },
//             }
//           );

//           directionsRendererInstance.setMap(mapInstance);
//           setDirectionsService(directionsServiceInstance);
//           setDirectionsRenderer(directionsRendererInstance);
//         }
//       } catch (error) {
//         console.error("Google Maps initialization error:", error);
//       }
//     };

//     initMap();
//     return () => {
//       if (mapInstance && mapRef.current) {
//         mapRef.current.innerHTML = "";
//       }
//     };
//   }, []);
//   return (
//     <Card className="shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-2">
//           <NavigationIcon className="h-5 w-5 text-primary" />
//           <span>Route Preview</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <div
//           ref={mapRef}
//           className="w-full h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg"
//         />
//         {distance && duration && (
//           <div className="p-4 sm:p-6 space-y-4">
//             <div className="grid grid-cols-2 gap-2 sm:gap-4">
//               <div className="text-center p-2 sm:p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
//                 <div className="text-lg sm:text-2xl font-bold text-primary">
//                   {distance}
//                 </div>
//                 <div className="text-xs sm:text-sm text-muted-foreground">
//                   Total Distance
//                 </div>
//               </div>
//               <div className="text-center p-2 sm:p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border border-secondary/20">
//                 <div className="text-lg sm:text-2xl font-bold text-secondary">
//                   {duration}
//                 </div>
//                 <div className="text-xs sm:text-sm text-muted-foreground">
//                   Journey Time
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {!booking.from_location && !booking.to_location && (
//           <div className="p-4 sm:p-6 text-center text-muted-foreground">
//             <MapPin className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-4 opacity-50" />
//             <p className="text-sm sm:text-base">
//               Enter pickup and drop-off locations to see route preview
//             </p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
