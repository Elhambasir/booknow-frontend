import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Luggage, Users, Handbag } from "lucide-react";
import React from "react";
import { useBookingStore } from "@/store/bookingStore";
import { IPackage } from "@/types";
import { Button } from "@/components/ui/button";
import { getPrice } from "@/services/getPrice";

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
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const { booking, updateBooking } = useBookingStore();
  const { type, distance, ETA, meet_greet } =
  booking;
  const handleVehicleSelect = (
    vehicle: IPackage,
    vehiclePrice: {
      total: number;
      from_amount: number;
      return_amount: number;
      meet_greet: number;
      subtotal: number;
      tax: number;
      airport_fee: number;
      type: string;
    }
  ) => {
    updateBooking({
      package: vehicle,
      amount: vehiclePrice.total,
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
              distance,
              ETA ?? 0,
              {
                meet_greet: meet_greet ? 10 : 0,
                airport_fee: booking.airport_fee,
              }
            );

            return (
              <Card
                key={vehicle.id}
                className={`border-2 hover:border-primary/50 transition-colors p-0 cursor-pointer`}
                onClick={() => handleVehicleSelect(vehicle, vehiclePrice!)}
              >
                <CardContent className="p-3 py-0 sm:p-6">
                  <div className="grid sm:grid-cols-4 gap-4 sm:gap-6">
                    <div className="sm:col-span-2">
                      <img
                        src={`${vehicle?.image?.url}`}
                        alt={vehicle.name}
                        className="w-full h-32 object-cover rounded mb-4"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2 sm:space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {vehicle.type}
                        </h3>
                        {/* <p className="text-muted-foreground">
                          {vehicle?.description}
                        </p> */}
                      </div>

                      <div className="flex items-center space-x-6 flex-wrap">
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
                        <div className="flex items-center gap-2">
                          <Handbag className="h-4 w-4" />
                          <span className="text-sm">
                            {vehicle.num_of_small_suits} small bags
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
                        <div className="text-sm text-muted-foreground">
                          Total fare
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-primary">
                          £{vehiclePrice?.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
