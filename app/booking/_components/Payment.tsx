"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from "lucide-react";
import React, { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalPayment from "@/components/paypal";
import { useRouter } from "next/navigation";
interface Props {
  handleBack: () => void;
}
export default function Payment({ handleBack }: Props) {
  const [msg, setMsg] = useState<string | null>(null);

  const { booking, updateBooking } =
    useBookingStore();
  const router = useRouter();
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!paypalClientId) {
    throw new Error("PayPal Client ID is missing from environment variables");
  }
  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <CreditCard className="h-6 w-6" />
          <span className="text-2xl">Payment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">
            £{booking.totalFare.toFixed(2)}
          </div>
          <PayPalScriptProvider
            options={{ clientId: paypalClientId, currency: "GBP" }}
          >
            <div className={`bg-white rounded-lg px-3 py-4 my-10`}>
              {/* PayPal Payment */}
              {booking && (
                <PaypalPayment
                  onOrderCreate={() => {}}
                  details={booking}
                  onComplete={(res) => {
                    if (res?.success) {
                      const book = res.data?.booking?.bookings?.at(-1);
                      if (book?.id) updateBooking({ ...booking, id: book.id });
                    }
                    setMsg(null);
                    router.push("/thank-you");
                  }}
                  setMsg={setMsg}
                />
              )}
            </div>
          </PayPalScriptProvider>
          <p className="text-sm text-muted-foreground">
            Secure payment powered by PayPal
          </p>
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
