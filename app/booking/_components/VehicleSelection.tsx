import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Luggage, Users } from "lucide-react";
import React from "react";
import { useBookingStore } from "@/store/bookingStore";
import { IPackage } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPrice } from "@/services/getPrice";
// const vehicles: any[] = [
//   {
//     id: "sedan",
//     name: "Luxury Sedan",
//     brand: "Mercedes",
//     description: "Perfect for business trips and airport transfers",
//     passengers: 3,
//     luggage: 2,
//     popular: true,
//     features: ["WiFi", "Water", "Phone Charger", "Professional Driver"],
//     image: "/src/assets/luxury-sedan.jpg",
//     price_options: {
//       perMin: 0.75,
//       baseFare: 15,
//       commission: 25.5,
//       distanceBands: [
//         { rate: 2.5, limit: 5 },
//         { rate: 1.8, limit: 15 },
//         { rate: 2.2, limit: 30 },
//         { rate: 1.5, limit: Infinity },
//       ],
//     },
//   },
//   {
//     id: "suv",
//     name: "Premium SUV",
//     description: "Spacious and comfortable for families and groups",
//     passengers: 6,
//     luggage: 4,
//     features: [
//       "WiFi",
//       "Water",
//       "Phone Charger",
//       "Extra Space",
//       "Climate Control",
//     ],
//     image: "/src/assets/luxury-suv.jpg",
//     priceOptions: {
//       perMin: 1.0,
//       baseFare: 25,
//       commission: 35.75,
//       distanceBands: [
//         { rate: 3.5, limit: 5 },
//         { rate: 2.8, limit: 15 },
//         { rate: 3.2, limit: 30 },
//         { rate: 2.5, limit: Infinity },
//       ],
//     },
//   },
//   {
//     id: "executive",
//     name: "Executive Van",
//     description: "Premium transport for larger groups and events",
//     passengers: 8,
//     luggage: 6,
//     features: [
//       "WiFi",
//       "Water",
//       "Phone Charger",
//       "Executive Seating",
//       "Entertainment System",
//     ],
//     image: "/src/assets/executive-van.jpg",
//     priceOptions: {
//       perMin: 1.25,
//       baseFare: 35,
//       commission: 45.85,
//       distanceBands: [
//         { rate: 4.5, limit: 5 },
//         { rate: 3.8, limit: 15 },
//         { rate: 4.2, limit: 30 },
//         { rate: 3.5, limit: Infinity },
//       ],
//     },
//   },
// ];

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  vehicles?: IPackage[];
}
export default function VehicleSelection({
  handleNext,
  vehicles,
  handleBack,
}: Props) {
  console.log("VEHICLES", vehicles);
  const { calculatePrice, booking, updateBooking } = useBookingStore();
  const {
    type,
    from_package,
    from_distance,
    from_duration,
    meet_greet,
    child_seat,
  } = booking;
  //   const calculateVehiclePrice = (vehicle: IPackage) => {
  //     const priceData = calculatePrice();
  //     if (!booking.from_distance) return vehicle.price_options.baseFare;

  //     let price = vehicle.price_options.baseFare;
  //     let remainingDistance = booking.from_distance;

  //     for (const band of vehicle.price_options.distanceBands) {
  //       const bandLimit =
  //         band.limit === "Infinity" ? Infinity : Number(band.limit);
  //       const distanceInBand = Math.min(remainingDistance, bandLimit);
  //       price += distanceInBand * band.rate;
  //       remainingDistance -= distanceInBand;
  //       if (remainingDistance <= 0) break;
  //     }

  //     // Add extras
  //     if (booking.child_seat) price += booking.child_seat * 8;
  //     if (booking.meet_greet) price += 15;
  //     if (booking.type === "return") price *= 1.85;

  //     return Math.round(price);
  //   };

  const handleVehicleSelect = (vehicle: IPackage) => {
    updateBooking({
      from_package: vehicle,
    });
    handleNext();
  };
  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <Car className="h-6 w-6" />
          <span className="text-2xl">Choose Your Vehicle</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          {vehicles?.map((vehicle: IPackage) => {
            const vehiclePrice = getPrice(
              type,
              vehicle.price_options,
              from_distance,
              from_duration ?? 0,
              {
                meet_greet: meet_greet ? 10 : 0,
                child_seat: child_seat * 8,
                airport_fee: 10,
              }
            );
            const isSelected = booking.from_package?.id === vehicle.id;

            return (
              <Card
                key={vehicle.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleVehicleSelect(vehicle)}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="grid sm:grid-cols-4 gap-4 sm:gap-6">
                    <div className="sm:col-span-2">
                      <img
                        src={`https://booknowapi.gmdirecthire.co.uk${vehicle?.image?.url}`}
                        alt={vehicle.name}
                        className="w-full h-32 object-cover rounded mb-4"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2 sm:space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {vehicle.name}
                        </h3>
                        {/* <p className="text-muted-foreground">
                          {vehicle?.description}
                        </p> */}
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">
                            {vehicle.num_of_passengers} passengers
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Luggage className="h-4 w-4" />
                          <span className="text-sm">
                            {vehicle.num_of_big_suits} large bags
                          </span>
                        </div>
                      </div>

                      {/* <div className="flex flex-wrap gap-1">
                        {vehicle.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div> */}

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="text-2xl sm:text-3xl font-bold text-primary">
                          £{vehiclePrice?.total.toFixed()}
                        </div>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          {isSelected ? "Selected" : "Select Vehicle"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
