"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AccountStep from "@/components/AccountStep";
import { toast } from "sonner";
import BookingSummary from "./BookingSummary";
import VehicleSelection from "./VehicleSelection";
import Payment from "./Payment";
import TripDetails from "./TripDetails";
import { IPackage } from "@/types";
import { DirectionMap } from "@/components/DirectionMap";
import { useBookingStore } from "@/store/bookingStore";
interface Props {
  vehicles?: IPackage[];
}
const Index = ({ vehicles }: Props) => {
  const { booking, currentStep, setCurrentStep } = useBookingStore();
  // const [currentStep, setCurrentStepLocal] = useState(currentStep || 0);

  const steps = ["Trip Details", "Vehicle Selection", "Account", "Payment"];
  const handleBack = () => {
    if (currentStep > 0) {
      // setCurrentStepLocal(currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };
  const handleNext = () => {
    // if (
    //   currentStep === 0 &&
    //   (!booking.from_location || !booking.to_location || !booking.date || (booking.type==='return'&&!booking.return_date))
    // ) {
    //   debugger;
    //   toast("Missing Information", {
    //     description: "Please fill in all required trip details.",
    //   });
    //   return;
    // }

    if (currentStep < steps.length - 1) {
      // setCurrentStepLocal(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-20 pb-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Progress Indicator */}
          <div className="mb-8">
            {/* Desktop Progress */}
            <div className="hidden lg:flex items-center justify-center space-x-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      index < currentStep
                        ? "bg-primary border-primary text-white"
                        : index === currentStep
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-2 text-sm font-medium whitespace-nowrap">
                    {step}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-4 ${
                        index < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Progress - Numbers Only */}
            <div className="lg:hidden flex items-center justify-center gap-2 overflow-x-auto pb-2 px-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center shrink-0">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${
                      index < currentStep
                        ? "bg-primary border-primary text-white"
                        : index === currentStep
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-4 sm:w-6 h-0.5 mx-1 ${
                        index < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Trip Details Step */}
              {currentStep === 0 && <TripDetails handleNext={handleNext} />}

              {/* Vehicle Selection Step */}
              {currentStep === 1 && (
                <VehicleSelection
                  handleNext={handleNext}
                  vehicles={vehicles}
                  handleBack={handleBack}
                />
              )}

              {/* Account Step */}
              {currentStep === 2 && (
                <AccountStep onNext={handleNext} handleBack={handleBack} />
              )}

              {/* Payment Step */}
              {currentStep === 3 && (
                <Payment
                  handleBack={handleBack}
                />
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <BookingSummary />
              <DirectionMap
                pickup={booking?.from_location!}
                dropoff={booking.to_location!}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
