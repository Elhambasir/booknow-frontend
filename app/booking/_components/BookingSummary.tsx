"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, NavigationIcon } from "lucide-react";
import React from "react";
import { useBookingStore } from "@/store/bookingStore";

export default function BookingSummary() {
  const booking = useBookingStore((state) => state.booking);
  const currentStep = useBookingStore((state) => state.currentStep);
  return (
    <Card className="shadow-xl border-2 border-primary/10 sticky top-6">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="text-xl text-primary flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Booking Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {booking.from ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground font-medium">From:</span>
                <span className="text-right text-sm max-w-[60%]">
                  {booking.from.address}
                </span>
              </div>
              <div className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground font-medium">To:</span>
                <span className="text-right text-sm max-w-[60%]">
                  {booking.to?.address}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span>
                  {booking.date
                    ? new Date(booking.date!).toDateString()
                    : "N/A"}{" "}
                  {booking.time}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passengers:</span>
                <span>{booking.passengers}</span>
              </div>
              {booking.package && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span>{booking.package.name}</span>
                </div>
              )}
              {booking?.distance === undefined ||
              booking?.ETA === undefined ? (
                <div className="flex items-center space-x-4 p-3 bg-primary/10 rounded-lg animate-pulse">
                  <NavigationIcon className="h-5 w-5 text-primary" />
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              ) : booking.distance != 0 && booking.ETA != 0 ? (
                <div className="flex items-center space-x-4 p-3 bg-primary/10 rounded-lg">
                  <NavigationIcon className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <span className="font-medium">Distance:</span>{" "}
                    {booking.distance} miles •
                    <span className="font-medium ml-2">duration:</span>{" "}
                    {booking.ETA} minutes
                  </div>
                </div>
              ) : null}
            </div>

            {currentStep > 1 && (
              <div className="border-t pt-4">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Fare:</span>
                    <span className="text-2xl font-bold text-primary">
                      £{booking.amount?.toFixed(2)}
                    </span>
                  </div>
                  {booking.type === "return" && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Includes return journey discount
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Fill in your journey details to see booking summary</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
