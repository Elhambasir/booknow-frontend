import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Lock, UserPlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface AccountStepProps {
  onNext: () => void;
  onAuthSuccess?: (userData: any) => void;
  handleBack: ()=> void;
}

const AccountStep = ({ onNext, onAuthSuccess, handleBack }: AccountStepProps) => {
  const [authType, setAuthType] = useState<"guest" | "login" | "signup">(
    "guest"
  );
  const [formData, setFormData] = useState({
    // Guest fields
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    birth_date: "",
    flight_number: "",
    // Auth fields
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (authType === "guest") {
        // Validate guest form
        const requiredFields = [
          "first_name",
          "last_name",
          "email",
          "phone_number",
        ];
        const missingFields = requiredFields.filter(
          (field) => !formData[field as keyof typeof formData]
        );

        if (missingFields.length > 0) {
          toast("Missing Information", {
            description: "Please fill in all required fields.",
          });
          return;
        }

        toast("Guest Checkout", {
          description: "Proceeding as guest user.",
        });
        onNext();
      } else if (authType === "login") {
        // Validate login form
        if (!formData.email || !formData.password) {
          toast("Login Error", {
            description: "Please enter email and password.",
          });
          return;
        }

        // Simulate login API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast("Login Successful", {
          description: "Welcome back! Continuing with your booking.",
        });

        onAuthSuccess?.(formData);
        onNext();
      } else if (authType === "signup") {
        // Validate signup form
        const requiredFields = [
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "password",
        ];
        const missingFields = requiredFields.filter(
          (field) => !formData[field as keyof typeof formData]
        );

        if (missingFields.length > 0) {
          toast("Missing Information", {
            description: "Please fill in all required fields.",
          });
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          toast("Password Mismatch", {
            description: "Passwords do not match.",
          });
          return;
        }

        // Simulate signup API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast("Account Created", {
          description: "Welcome! Your account has been created successfully.",
        });

        onAuthSuccess?.(formData);
        onNext();
      }
    } catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number *</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Date of Birth</Label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flight_number">
                  Flight Number (if applicable)
                </Label>
                <Input
                  id="flight_number"
                  name="flight_number"
                  value={formData.flight_number}
                  onChange={handleInputChange}
                  placeholder="Enter flight number"
                />
              </div>
            </>
          )}

          {authType === "login" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </>
          )}

          {authType === "signup" && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number *</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Date of Birth</Label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flight_number">
                  Flight Number (if applicable)
                </Label>
                <Input
                  id="flight_number"
                  name="flight_number"
                  value={formData.flight_number}
                  onChange={handleInputChange}
                  placeholder="Enter flight number"
                />
              </div>
            </>
          )}
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading
            ? "Processing..."
            : authType === "guest"
            ? "Continue as Guest"
            : authType === "login"
            ? "Sign In & Continue"
            : "Create Account & Continue"}
        </Button>
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
