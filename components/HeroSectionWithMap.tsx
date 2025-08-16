"use client";
import { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Star } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useBookingStore } from "@/store/bookingStore";
import { useLocationStore } from "@/store/useLocationStore";
import { useBookingStore } from "@/store/bookingStore";
import DatePickerField from "@/components/form/DatePickerField";
import { TimePickerField } from "@/components/form/TimePickerField";
import Image from "next/image";
import { Form } from "./ui/form";
import { tripSchema } from "@/lib/validationSchema";
import { useForm } from "react-hook-form";
import { LocationService } from "@/services/locationService";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AddressSearch } from "./AddressSearch";
import { addYears } from "date-fns";
type TripFormValues = z.infer<typeof tripSchema>;

const HeroSectionWithMap = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setBooking, booking, setCurrentStep } = useBookingStore();
  const { pickup, setPickup, dropoff, setDropoff } = useLocationStore();

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      type: "one way",
      from_location: undefined,
      to_location: undefined,
      date: undefined,
      time: undefined,
    },
  });

  const onSubmit = (values: TripFormValues) => {
    startTransition(async () => {
      try {
        const locationService = new LocationService();
        const { distance, duration } = await locationService.calculateDistance(
          {
            lat: pickup?.latitude!,
            lng: pickup?.longitude!,
          },
          {
            lat: dropoff?.latitude!,
            lng: dropoff?.longitude!,
          }
        );

        if (!distance || !duration) {
          toast.error(
            `Sorry, we couldn't calculate the distance and duration for your trip. Please try again later.`
          );
          return;
        }
        let airportFee = 0;
        if (pickup?.isAirport) {
          airportFee = 10;
        }
        if (dropoff?.isAirport) {
          airportFee += 10;
        }
        setBooking({
          type: values.type,
          from_location: pickup,
          to_location: dropoff,
          date: values.date,
          time: values.time,
          from_distance: distance,
          from_duration: duration,
          from_amount: 0,
          totalFare: 0,
          passengers: 1,
          luggage: 0,
          child_seat: 0,
          meet_greet: false,
          airport_fee: airportFee,
        });
        setCurrentStep(0);
        toast.success("Redirecting to booking");
        router.push("/booking");
      } catch (error) {
        console.error("Something went wrong", error);
        toast.error("Something went wrong");
      }
    });
  };
  useEffect(() => {
    if (pickup) {
      form.setValue("from_location", pickup.address);
    }
    if (dropoff) {
      form.setValue("to_location", dropoff.address);
    }
  }, [pickup, dropoff]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">
                  Trusted by 10,000+ passengers
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-primary">G & M Airport</span>
                <br />
                <span className="text-secondary">Taxi Service</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                Experience luxury and reliability with our professional
                chauffeur service. Available 24/7 for all UK airports with meet
                & greet service.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    24/7 Available
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary fill-current" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    5-Star Service
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 py-1 space-y-6">
                <div className="text-start">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Book Your Journey
                  </h3>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Pickup & Dropoff */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <AddressSearch
                          label="Pickup Location"
                          placeholder="Pickup address or postcode"
                          selectedLocation={pickup}
                          type="pickup"
                          isRequired={true}
                          onLocationSelect={(location) => {
                            setPickup(location);
                            form.setValue("from_location", location.address, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        {form.formState.errors.from_location && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.from_location.message}
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
                          onLocationSelect={(location) => {
                            setDropoff(location);
                            form.setValue("to_location", location.address, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        {form.formState.errors.to_location && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.to_location.message}
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
                    <Button
                      variant="hero"
                      type="submit"
                      size="lg"
                      className="w-full text-lg bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={
                        isPending ||
                        pickup?.address === "" ||
                        dropoff?.address === "" ||
                        !form.watch("date") ||
                        !form.watch("time")
                      }
                    >
                      {isPending
                        ? "Getting Instant Quote"
                        : "Get Instant Quote"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={"/images/hero-taxi.jpg"}
                alt="Premium Airport Taxi Service"
                width={600}
                height={500}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>

              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-xs text-muted-foreground">
                      Happy Clients
                    </div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">
                      Available
                    </div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">5★</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithMap;
