"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Handshake, MapPin, NavigationIcon } from "lucide-react";
import React, { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { AddressSearch } from "@/components/AddressSearch";
import { useLocationStore } from "@/store/useLocationStore";
import DatePickerField from "./DatePickerField";
import TimePickerField from "./TimePickerField";
import { Button } from "@/components/ui/button";
import CheckboxField from "./Checkbox";

interface Props {
  handleNext: () => void;
}
export default function TripDetails({ handleNext }: Props) {
  const { updateBooking, booking } = useBookingStore();
  const { pickup, setPickup, dropoff, setDropoff } = useLocationStore();
  const [time, setTime] = useState<string | null>(booking?.time || "12:00pm");
  const [date, setDate] = useState<string | null>(booking?.date || null);
  const [returnTime, setReturnTime] = useState<string | null>(
    booking?.return_time || "12:00pm"
  );
  const [returnDate, setReturnDate] = useState<string | null>(
    booking?.return_date || null
  );
  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <MapPin className="h-6 w-6" />
          <span className="text-2xl">Journey Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Trip Type</Label>
          <RadioGroup
            value={booking.type}
            onValueChange={(value) =>
              updateBooking({
                type: value as "one way" | "return",
              })
            }
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one way" id="oneway" />
              <Label htmlFor="oneway">One Way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="return" id="return" />
              <Label htmlFor="return">Return Trip</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location *</Label>
            <AddressSearch
              placeholder="Pickup address or postcode"
              onLocationSelect={(location) => {
                setPickup(location);
                updateBooking({
                  ...booking,
                  from_location: location,
                });
              }}
              selectedLocation={pickup}
              type="pickup"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropoff">Drop-off Location *</Label>
            <AddressSearch
              placeholder="Dropoff address or postcode"
              onLocationSelect={(location) => {
                setDropoff(location);
                updateBooking({
                  ...booking,
                  to_location: location,
                });
              }}
              selectedLocation={dropoff}
              type="dropoff"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <DatePickerField
              label="Pickup Date"
              value={date}
              onChange={(e) => {
                setDate(e);
                updateBooking({
                  ...booking,
                  date: e,
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <TimePickerField
              label="Pickup Time *"
              value={time || "12:30 pm"}
              onChange={(e) => {
                setTime(e);
                updateBooking({
                  ...booking,
                  time: e,
                });
              }}
              className="w-full mt-1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passengers">Passengers</Label>
            <select
              id="passengers"
              value={booking.passengers}
              onChange={(e) =>
                updateBooking({
                  passengers: parseInt(e.target.value),
                })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} passenger{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Return Journey */}
        {booking.type === "return" && (
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
            <div className="space-y-2">
              <DatePickerField
                label="Return Date"
                value={returnDate}
                onChange={(e) => {
                  setReturnDate(e);
                  updateBooking({
                    ...booking,
                    return_date: e,
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <TimePickerField
                label="Return time"
                value={returnTime || "12:30 pm"}
                onChange={(e) => {
                  setReturnTime(e);
                  updateBooking({
                    ...booking,
                    return_time: e,
                  });
                }}
                className="w-full mt-1"
              />
            </div>
          </div>
        )}

        {/* Additional Options */}
        <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
          <h3 className="font-medium">Additional Options</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="childSeats">Child Seats (£8 each)</Label>
              <RadioGroup
                value={booking.child_seat?.toString() || "0"}
                onValueChange={(value) =>
                  updateBooking({ child_seat: parseInt(value) })
                }
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={num.toString()}
                      id={`child-${num}`}
                    />
                    <Label htmlFor={`child-${num}`}>
                      {num} child seat{num > 1 ? "s" : ""}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <CheckboxField
                label="Meet & Greet Sevice (+£10)"
                description="Choose this if you want"
                onChange={(e) =>
                  updateBooking({
                    ...booking,
                    meet_greet: e,
                  })
                }
                isChecked={booking?.meet_greet ? true : false}
                icon={<Handshake />}
              />
            </div>
          </div>
        </div>

        {booking.from_distance && booking.from_duration && (
          <div className="flex items-center space-x-4 p-3 bg-primary/10 rounded-lg">
            <NavigationIcon className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <span className="font-medium">Distance:</span>{" "}
              {booking.from_distance} •
              <span className="font-medium ml-2">Duration:</span>{" "}
              {booking.from_duration}
            </div>
          </div>
        )}

        <Button onClick={handleNext} className="w-full" size="lg">
          Continue to Vehicle Selection
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
