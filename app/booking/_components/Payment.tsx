"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { toast } from "sonner";

interface Props {
  handleBack: () => void;
}
export default function Payment({ handleBack }: Props) {
  const { booking, clearBooking, currentStep, setCurrentStep } = useBookingStore();
  
  const handlePayment = () => {
    toast("Payment Successful!", {
      description: "Your booking has been confirmed.",
    });
    clearBooking();
    setCurrentStep(0);
  };
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
            £{booking.totalFare.toFixed()}
          </div>
          <Button onClick={handlePayment} size="lg" className="w-full">
            Pay with PayPal
          </Button>
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
