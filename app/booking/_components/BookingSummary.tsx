"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin } from "lucide-react";
import React from "react";
import { useBookingStore } from "@/store/bookingStore";
const formatDate = (dateData: any) => {
  // Create a Date object (month is zero-based in JS)
  const dateObj = new Date(dateData.year, dateData.month - 1, dateData.day);

  // Format as readable string
  const formatted = dateObj.toLocaleDateString("en-US", {
    weekday: "long", // e.g., Thursday
    year: "numeric", // 2025
    month: "long", // August
    day: "numeric", // 14
  });
  return formatted;
};
export default function BookingSummary() {
  const booking = useBookingStore((state) => state.booking);
  const getBookingSummary = useBookingStore((state) => state.getBookingSummary);
  const summary = React.useMemo(() => {
    return getBookingSummary();
  }, [booking]);
  console.log("CURRENT BOOKING", booking);
  return (
    <Card className="shadow-xl border-2 border-primary/10 sticky top-6">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="text-xl text-primary flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Booking Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {booking.from_location ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground font-medium">From:</span>
                <span className="text-right text-sm max-w-[60%]">
                  {booking.from_location.address}
                </span>
              </div>
              <div className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground font-medium">To:</span>
                <span className="text-right text-sm max-w-[60%]">
                  {booking.to_location?.address}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span>
                  {formatDate(booking.date)} {booking.time}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passengers:</span>
                <span>{booking.passengers}</span>
              </div>
              {booking.from_package && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span>{booking.from_package.name}</span>
                </div>
              )}
              {booking.from_distance && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distance:</span>
                  <span>{booking.from_distance}</span>
                </div>
              )}
            </div>

            {summary.total > 0 && (
              <div className="border-t pt-4">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Fare:</span>
                    <span className="text-2xl font-bold text-primary">
                      £{summary.total}
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
