"use client";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Car,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useLocationStore } from "@/store/useLocationStore";
import { Badge } from "@/components/ui/badge";
import { removeMilliseconds, to12HourFormat } from "@/lib/utils";

export default function Thankyou() {
  const { booking, clearBooking } = useBookingStore();
  const { clearLocations } = useLocationStore();
  const router = useRouter();
  const { width, height } = useWindowSize();
  // Clear booking if user tries to refresh
  useEffect(() => {
    if (!booking.from || !booking.to) {
      router.push("/");
    }
  }, [booking, router]);
  const clearStore = () => {
    clearBooking();
    clearLocations();
  };
  return (
    <div className="relative min-h-screen mt-5 bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Confetti celebration */}
      {width && height && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-primary/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2
                className="h-16 w-16 text-white"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Thank You!</h1>
            <p className="text-white/90 text-xl">
              Your booking with G&M Rides is confirmed
            </p>
            <Badge
              variant={booking.type === "return" ? "secondary" : "default"}
              className="text-sm mt-2"
            >
              {booking.type === "return" ? (
                <span className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <ArrowLeft className="h-4 w-4 ml-1" />
                  <span className="ml-2">Return Trip</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span className="ml-1">One Way</span>
                </span>
              )}
            </Badge>
          </div>

          {/* Booking Summary */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-primary">
                  Your Trip Details
                </h2>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium">Pickup Location</h3>
                    <p className="text-muted-foreground">
                      {booking?.from?.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium">Drop-off Location</h3>
                    <p className="text-muted-foreground">
                      {booking?.to?.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium">Pickup Time</h3>
                    <p className="text-muted-foreground">
                      {" "}
                      {booking.date &&
                        new Date(booking.date).toDateString()} at {to12HourFormat(removeMilliseconds(booking.time))}
                    </p>
                  </div>
                </div>
                {/* Conditionally show return details */}
                {booking.type === "return" && (
                  <>
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 mt-1 text-primary" />
                      <div>
                        <h3 className="font-medium">Return Time</h3>
                        <p className="text-muted-foreground">
                          {booking.return_date &&
                            new Date(booking.return_date).toDateString()}{" "}
                          at {booking.return_time}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-start gap-4">
                  <Car className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-medium">Vehicle Type</h3>
                    <p className="text-muted-foreground capitalize">
                      {booking?.package?.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-primary/5 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  Payment Summary
                </h2>

                <div className="space-y-4">
                  <div className="border-t border-primary/20 my-2"></div>

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-primary">
                      £{booking?.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Payment Method</span>
                    <span>PayPal</span>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Booking Reference</span>
                    <span>
                      #
                      {Math.random()
                        .toString(36)
                        .substring(2, 10)
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important Information
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      • Your driver will arrive 5-10 minutes before your
                      scheduled pickup time.
                      <br />
                      • Please have your payment method ready if any additional
                      charges apply.
                      <br />• Contact us immediately if your driver hasn't
                      arrived within 5 minutes of pickup time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  clearStore();
                  window.location.href = "/profile?tab=bookings";
                }}
                className="h-12 px-6"
              >
                My Bookings
              </Button>

              <Button
                asChild
                type="button"
                onClick={() => clearStore()}
                className="h-12 px-6 bg-primary hover:bg-primary/90"
              >
                <Link href="/">Book Another Ride</Link>
              </Button>
              <Button
                asChild
                type="button"
                onClick={() => clearStore()}
                variant="outline"
                className="h-12 px-6"
              >
                <Link href={`#`}>Finish</Link>
              </Button>
              <Button
                asChild
                type="button"
                variant="ghost"
                className="h-12 px-6"
              >
                <Link href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Dispatch
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>
            Need help? Contact our customer support at{" "}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
              className="text-primary underline"
            >
              {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
            </a>
          </p>
          <p className="mt-1">
            Or call us at{" "}
            <a
              href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
              className="text-primary underline"
            >
              {process.env.NEXT_PUBLIC_COMPANY_PHONE}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
