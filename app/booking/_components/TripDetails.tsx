"use client";
import { useEffect, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin, Handshake, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { useLocationStore } from "@/store/useLocationStore";
import { AddressSearch } from "@/components/AddressSearch";
import CheckboxField from "@/components/form/CheckboxField";
import RadioGroupField from "@/components/form/RadioGroupFields";
import SelectField from "@/components/form/SelectField";
import DatePickerField from "@/components/form/DatePickerField"; // using your provided one
import { TimePickerField } from "@/components/form/TimePickerField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripDetailsSchema } from "@/lib/validationSchema";
import { LocationService } from "@/services/locationService";
import { toast } from "sonner";
import { addYears } from "date-fns";
import TextField from "@/components/form/TextField";

type TripDetailsFormValues = z.infer<typeof tripDetailsSchema>;

interface Props {
  handleNext: () => void;
}
const getDistanceDuration = async (
  origin: {
    lat: number;
    lng: number;
  },
  destination: { lat: number; lng: number }
) => {
  const locationService = new LocationService();

  return await locationService.calculateDistance(origin, destination);
};
export default function TripDetails({ handleNext }: Props) {
  const { updateBooking, booking } = useBookingStore();
  const [isPending, startTransition] = useTransition();
  const { pickup, setPickup, dropoff, setDropoff } = useLocationStore();
  const form = useForm<TripDetailsFormValues>({
    resolver: zodResolver(tripDetailsSchema),
    defaultValues: {
      type: booking?.type || "one way",
      from: booking?.from?.address || undefined,
      to: booking?.to?.address || undefined,
      date: booking.date || undefined,
      time: booking?.time || undefined,
      passengers: booking?.passengers.toString() || undefined,
      luggages: booking?.luggages.toString() || undefined,
      flight_number: booking?.flight_number || undefined,
      return_date: booking?.return_date || undefined,
      return_time: booking?.return_time || undefined,
      child_seat: booking?.child_seat.toString() || undefined,
      meet_greet: booking?.meet_greet || false,
    },
  });

  const onSubmit = async (values: TripDetailsFormValues) => {
    startTransition(async () => {
      try {
        const origin = {
          lat: pickup?.latitude!,
          lng: pickup?.longitude!,
        };
        const destination = {
          lat: dropoff?.latitude!,
          lng: dropoff?.longitude!,
        };
        const { distance, duration } = await getDistanceDuration(
          origin,
          destination
        );
        if (!distance || !duration) {
          toast.error(
            `Sorry, we couldn't calculate the distance and duration for your trip. Please try again later.`
          );
          return;
        }
        let airportFee = 0;
        if (booking.from?.isAirport) {
          airportFee = 10;
        }
        if (booking.to?.isAirport) {
          airportFee += 10;
        }
        updateBooking({
          type: values.type,
          from: pickup,
          to: dropoff,
          distance: distance,
          ETA: duration,
          date: values.date,
          time: values.time+":00.000",
          passengers: Number(values.passengers),
          luggages: Number(values.luggages),
          flight_number: values.flight_number,
          return_date: values.return_date,
          return_time: values.return_time+":00.000",
          child_seat: Number(values.child_seat) || 0,
          meet_greet: values.meet_greet,
          airport_fee: airportFee,
        });
        handleNext();
      } catch (error) {
        console.error("Something went wrong", error);
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    // Update form values when locations change
    if (pickup) {
      form.setValue("from", pickup.address, { shouldValidate: true });
    } else {
      form.setValue("from", "", { shouldValidate: true });
    }

    if (dropoff) {
      form.setValue("to", dropoff.address, { shouldValidate: true });
    } else {
      form.setValue("to", "", { shouldValidate: true });
    }
  }, [pickup, dropoff]);

  useEffect(() => {
    const type = form.watch("type");
    if (type && type === "one way") {
      form.setValue("return_date", undefined);
      form.setValue("return_time", undefined);
    }
  }, [form.watch("type")]);
  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <MapPin className="h-6 w-6" />
          <span className="text-2xl">Journey Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Trip Type */}
            <RadioGroupField
              name="type"
              label="Trip Type"
              items={[
                {
                  id: 1,
                  value: "one way",
                  label: "One Way",
                  Icon: null,
                  description: "One way trip",
                },
                {
                  id: 2,
                  value: "return",
                  label: "Return Trip",
                  Icon: null,
                  description: "Return journey included",
                },
              ]}
            />

            {/* Pickup & Dropoff */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <AddressSearch
                  label="Pickup Location"
                  placeholder="Pickup address or postcode"
                  selectedLocation={pickup}
                  type="pickup"
                  isRequired={true}
                  onLocationSelect={async (location) => {
                    setPickup(location);
                    let data = undefined;
                    if (location && dropoff) {
                      data = await getDistanceDuration(
                        {
                          lat: location?.latitude!,
                          lng: location?.longitude!,
                        },
                        {
                          lat: dropoff?.latitude!,
                          lng: dropoff?.longitude!,
                        }
                      );
                    }
                    updateBooking({
                      from: location,
                      distance: data?.distance,
                      ETA: data?.duration,
                    });
                    form.setValue("from", location.address, {
                      shouldValidate: true,
                    });
                  }}
                />
                {form.formState.errors.from && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.from.message}
                  </p>
                )}
              </div>
              <div>
                <AddressSearch
                  isRequired={true}
                  label="Drop-off Location"
                  placeholder="Dropoff address or postcode"
                  selectedLocation={dropoff}
                  type="dropoff"
                  onLocationSelect={async (location) => {
                    setDropoff(location);
                    let data = undefined;
                    if (pickup && location) {
                      data = await getDistanceDuration(
                        {
                          lat: pickup?.latitude!,
                          lng: pickup?.longitude!,
                        },
                        {
                          lat: location?.latitude!,
                          lng: location?.longitude!,
                        }
                      );
                    }
                    updateBooking({
                      to: location,
                      distance: data?.distance,
                      ETA: data?.duration,
                    });
                    form.setValue("to", location.address, {
                      shouldValidate: true,
                    });
                  }}
                />
                {form.formState.errors.to && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.to.message}
                  </p>
                )}
              </div>
            </div>

            {/* Pickup Date / Time / Passengers */}
            <div className="grid md:grid-cols-2 gap-4">
              <DatePickerField
                name="date"
                label="Pickup Date"
                isRequired={true}
                maxDate={addYears(new Date(), 1)}
                minDate={new Date()}
                yearRange={1}
              />
              <TimePickerField
                name="time"
                label="Pickup Time"
                isRequired={true}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <SelectField
                name="passengers"
                label="Passengers"
                placeholder="Select passengers"
                isRequired={true}
                options={[...Array(4)].map((_, i) => ({
                  value: (i + 1).toString(),
                  label: `${i + 1} passenger${i > 0 ? "s" : ""}`,
                }))}
              />
              <SelectField
                name="child_seat"
                label="Child Seat"
                placeholder="Select Child Seats"
                isRequired={true}
                options={[...Array(4)].map((_, i) => ({
                  value: i.toString(),
                  label: `${i} child seat${i > 0 ? "s" : ""}`,
                }))}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <SelectField
                name="luggages"
                label="Luggages"
                placeholder="Select Luggages"
                isRequired={true}
                options={[...Array(4)].map((_, i) => ({
                  value: i.toString(),
                  label: `${i} luggage${i > 0 ? "s" : ""}`,
                }))}
              />
              {(booking?.from?.isAirport||booking?.to?.isAirport)&&(
                <TextField
                name="flight_number"
                label="Flight Number"
                placeholder="Enter flight number"
              />
              )}
            </div>

            {/* Return Journey */}
            {form.watch("type") === "return" && (
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                <DatePickerField
                  name="return_date"
                  label="Return Date"
                  maxDate={addYears(new Date(), 1)}
                  minDate={new Date()}
                  isRequired={true}
                  yearRange={1}
                />
                <TimePickerField
                  name="return_time"
                  label="Return Time"
                  isRequired={true}
                />
              </div>
            )}

            {/* Additional Options */}
            {(booking?.from?.isAirport||booking?.to?.isAirport)&&(
              <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
              <h3 className="font-medium">Additional Options</h3>
              <div className="flex items-center space-x-2 pt-2">
                <CheckboxField
                  name="meet_greet"
                  label="Meet & Greet Service (+£10)"
                  subLabel="(optional)"
                  description="Choose this if you want"
                  icon={<Handshake />}
                />
              </div>
            </div>
            )}
            
            <Button
              type="submit"
              disabled={
                isPending ||
                !pickup ||
                !dropoff ||
                !form.watch("from") ||
                !form.watch("to") ||
                !form.watch("date") ||
                !form.watch("time")
              }
              className="w-full"
              size="lg"
            >
              {isPending ? "Processing..." : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
