import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Lock, UserPlus, ArrowLeft } from "lucide-react";
import Guest from "./Guest";
import Login from "./Login";
import Register from "./Register";
interface AccountStepProps {
  onNext: () => void;
  onAuthSuccess?: (userData: any) => void;
  handleBack: () => void;
}

const AccountStep = ({
  onNext,
  onAuthSuccess,
  handleBack,
}: AccountStepProps) => {
  const [authType, setAuthType] = useState<"guest" | "login" | "signup">(
    "guest"
  ); 

  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <User className="h-6 w-6" />
          <span className="text-2xl">Account Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Account Type Selection */}
        <div className="space-y-4">
          <Label>Choose an option</Label>
          <RadioGroup
            value={authType}
            onValueChange={(value) => setAuthType(value as typeof authType)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="guest" id="guest" />
              <Label htmlFor="guest" className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Guest Checkout</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="login" id="login" />
              <Label htmlFor="login" className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Sign In</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="signup" id="signup" />
              <Label htmlFor="signup" className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Create Account</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Dynamic Form Fields */}
        <div className="space-y-4">
          {authType === "guest" && (
            <Guest handleNext={onNext} />
          )}

          {authType === "login" && (
            <Login handleNext={onNext} />
          )}

          {authType === "signup" && (
           <Register handleNext={onNext} />
          )}
        </div>

        {/* <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading
            ? "Processing..."
            : authType === "guest"
            ? "Continue as Guest"
            : authType === "login"
            ? "Sign In & Continue"
            : "Create Account & Continue"}
        </Button> */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountStep;
