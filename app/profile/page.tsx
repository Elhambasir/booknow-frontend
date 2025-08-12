"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const UserProfileFormSchem = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  phone_number: z.string(),
  gender: z.string(),
  address: z.string(),
  birth_date: z.date(),
  city: z.string(),
  postcode: z.string(),
});
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  User,
  Settings,
  Calendar,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit3,
  MapPin,
  Phone,
  Mail,
  Car,
  Clock,
  Star,
  Download,
  Filter,
  Search,
  MoreVertical,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import TextField from "@/components/form/TextField";
import EmailField from "@/components/form/EmailField";
import PhoneNumberField from "@/components/form/PhoneNumberField";
import SelectField from "@/components/form/SelectField";
import TextareaField from "@/components/form/TextareaField";
const Profile = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const defaultActiveTab = searchParams.get("tab");
  const [profileData, setProfileData] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "+44 7123 456789",
    gender: "male",
    birth_date: "1990-01-01",
    address: "123 London Street",
    city: "London",
    postcode: "SW1A 1AA",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [bookingFilter, setBookingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserProfileFormSchem>>({
    resolver: zodResolver(UserProfileFormSchem),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserProfileFormSchem>) {
    startTransition(async () => {
      try {
        toast.success("Submitted Data", {
          description: JSON.stringify(values),
        });
      } catch (error: any) {
        console.error("Signup error", error);
        if (error.response && error.response.status === 400) {
          // Try to extract a more specific error message if available
          const apiMessage = error.response.data?.message;
          if (
            Array.isArray(apiMessage) &&
            apiMessage[0]?.messages?.[0]?.message
          ) {
            toast.error(apiMessage[0].messages[0].message);
          } else if (typeof apiMessage === "string") {
            toast.error(apiMessage);
          } else {
            toast.error("Invalid input or user already exists.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.error("error", error);
        return;
      }
    });
  }

  const handleSave = () => {
    // Simulate API call
    toast("Profile Updated", {
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    toast("Logged Out", {
      description: "You have been logged out successfully.",
    });
    // Redirect to home or login page
    window.location.href = "/";
  };

  const mockBookings = [
    {
      id: "1",
      bookingRef: "BK-2024-001",
      date: "2024-08-15",
      time: "14:30",
      from: "Heathrow Terminal 5",
      to: "Central London Hotel",
      vehicle: "Executive Sedan",
      status: "Completed",
      amount: "£85.00",
      distance: "25 miles",
      duration: "45 mins",
      rating: 5,
      driver: "James Wilson",
    },
    {
      id: "2",
      bookingRef: "BK-2024-002",
      date: "2024-08-20",
      time: "09:00",
      from: "123 London Street, SW1A 1AA",
      to: "Gatwick South Terminal",
      vehicle: "Premium SUV",
      status: "Upcoming",
      amount: "£95.00",
      distance: "32 miles",
      duration: "55 mins",
      driver: "Sarah Johnson",
    },
    {
      id: "3",
      bookingRef: "BK-2024-003",
      date: "2024-07-28",
      time: "16:45",
      from: "Stansted Airport",
      to: "Cambridge City Centre",
      vehicle: "Luxury Sedan",
      status: "Completed",
      amount: "£65.00",
      distance: "18 miles",
      duration: "35 mins",
      rating: 4,
      driver: "Michael Brown",
    },
    {
      id: "4",
      bookingRef: "BK-2024-004",
      date: "2024-07-15",
      time: "11:20",
      from: "Birmingham Airport",
      to: "Birmingham City Centre",
      vehicle: "Executive Sedan",
      status: "Cancelled",
      amount: "£35.00",
      distance: "12 miles",
      duration: "25 mins",
      driver: "David Clark",
    },
  ];

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesFilter =
      bookingFilter === "all" ||
      booking.status.toLowerCase() === bookingFilter.toLowerCase();
    const matchesSearch =
      booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-gold/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Profile Avatar */}
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="w-full h-full bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-full flex items-center justify-center shadow-[var(--shadow-gold)]">
                <User className="h-16 w-16 text-primary" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-primary mb-3">
              Welcome back, {profileData.first_name}
            </h1>
            <p className="text-primary-muted text-lg mb-8">
              Manage your profile, track your journeys, and control your
              preferences
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {mockBookings.filter((b) => b.status === "Completed").length}
                </div>
                <div className="text-brand-gold/80 text-sm">
                  Completed Trips
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {mockBookings.filter((b) => b.status === "Upcoming").length}
                </div>
                <div className="text-brand-gold/80 text-sm">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-brand-gold/80 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 -mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs
              defaultValue={defaultActiveTab ?? "profile"}
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-4 h-12 bg-card/50 backdrop-blur-sm border shadow-lg">
                <TabsTrigger
                  value="profile"
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bookings"
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Bookings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Payments</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Enhanced Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Personal Information Card */}
                  <div className="lg:col-span-2">
                    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <span>Personal Information</span>
                          </CardTitle>
                          <Button
                            variant={isEditing ? "default" : "outline"}
                            onClick={() =>
                              isEditing ? handleSave() : setIsEditing(true)
                            }
                            className="transition-all duration-200"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            {isEditing ? "Save Changes" : "Edit Profile"}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              {isEditing ? (
                                <TextField
                                  name="first_name"
                                  label="First Name"
                                />
                              ) : (
                                <Input
                                  value={profileData.first_name}
                                  disabled
                                  className="capitalize"
                                />
                              )}
                              {isEditing ? (
                                <TextField name="last_name" label="Last Name" />
                              ) : (
                                <Input
                                  value={profileData.last_name}
                                  disabled
                                  className="capitalize"
                                />
                              )}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              {isEditing ? (
                                <EmailField
                                  name="email"
                                  label="Email"
                                  placeholder="youremail@gmail.com"
                                />
                              ) : (
                                <Input
                                  value={profileData.email}
                                  disabled
                                  className="capitalize"
                                />
                              )}
                              {isEditing ? (
                                <PhoneNumberField
                                  label="Phone Number"
                                  name="phone_number"
                                />
                              ) : (
                                <Input
                                  value={profileData.phone_number}
                                  disabled
                                  className="capitalize"
                                />
                              )}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              {isEditing ? (
                                <SelectField
                                  label="Gender"
                                  name="gender"
                                  options={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                  ]}
                                />
                              ) : (
                                <Input
                                  value={profileData.gender}
                                  disabled
                                  className="capitalize"
                                />
                              )}
                            </div>
                            <div className="space-y-2">
                              {isEditing ? (
                                <TextareaField
                                  name="address"
                                  label="Address"
                                  placeholder="Your Address"
                                />
                              ) : (
                                <Input
                                  value={profileData.address}
                                  disabled
                                  className="capitalize"
                                />
                              )}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                {isEditing ? (
                                  <SelectField
                                    label="City"
                                    name="city"
                                    options={[
                                      { label: "Kabul", value: "kabul" },
                                      { label: "Ghazni", value: "ghazni" },
                                    ]}
                                  />
                                ) : (
                                  <Input
                                    value={profileData.city}
                                    disabled
                                    className="capitalize"
                                  />
                                )}
                              </div>
                              <div className="space-y-2">
                                {isEditing ? (
                                  <TextField label="Postcode" name="postcode" />
                                ) : (
                                  <Input
                                    value={profileData.postcode}
                                    disabled
                                    className="capitalize"
                                  />
                                )}
                              </div>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Info Sidebar */}
                  <div className="space-y-6">
                    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">
                          Account Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm font-medium">
                            Member Since
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Jan 2024
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm font-medium">
                            Total Trips
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            {mockBookings.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm font-medium">
                            Favorite Route
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Airport transfers
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0 bg-gradient-to-br from-brand-gold/10 to-brand-gold/5">
                      <CardContent className="p-6 text-center">
                        <Star className="h-8 w-8 mx-auto mb-3 text-brand-gold" />
                        <h3 className="font-semibold mb-2">Premium Member</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Enjoy exclusive benefits and priority booking
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Benefits
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Enhanced Bookings Tab */}
              <TabsContent value="bookings" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <span>Your Journeys</span>
                        <Badge variant="secondary" className="ml-2">
                          {filteredBookings.length} trips
                        </Badge>
                      </CardTitle>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full sm:w-64"
                          />
                        </div>
                        <Select
                          value={bookingFilter}
                          onValueChange={setBookingFilter}
                        >
                          <SelectTrigger className="w-full sm:w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            {/* Route */}
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="font-medium text-sm">
                                  {booking.from}
                                </span>
                              </div>
                              <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
                              <Car className="h-4 w-4 text-primary" />
                              <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">
                                  {booking.to}
                                </span>
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              </div>
                            </div>

                            {/* Details Row */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Car className="h-4 w-4" />
                                <span>{booking.vehicle}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {booking.distance} • {booking.duration}
                                </span>
                              </div>
                            </div>

                            {/* Booking Reference */}
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {booking.bookingRef}
                              </Badge>
                              {booking.driver && (
                                <span className="text-xs text-muted-foreground">
                                  Driver: {booking.driver}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Status and Price */}
                          <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:text-right">
                            <div className="flex flex-col items-center lg:items-end">
                              <span className="text-2xl font-bold text-primary">
                                {booking.amount}
                              </span>
                              {booking.rating && (
                                <div className="flex items-center space-x-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < booking.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({booking.rating})
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-center lg:items-end gap-2">
                              <Badge
                                className={getStatusBadgeClass(booking.status)}
                              >
                                {booking.status}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredBookings.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                          No bookings found
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {searchTerm || bookingFilter !== "all"
                            ? "Try adjusting your search or filter criteria"
                            : "Your booking history will appear here"}
                        </p>
                        <Button>
                          <Car className="h-4 w-4 mr-2" />
                          Book Your First Ride
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Enhanced Payments Tab */}
              <TabsContent value="payments" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <span>Payment Methods</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        No payment methods
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Add a payment method to make booking faster and easier
                      </p>
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Enhanced Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <span>Account Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      {/* Notifications */}
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Get updates about your bookings and account
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      {/* Security */}
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Two-Factor Authentication
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>

                      {/* Privacy */}
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Eye className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Data Privacy</p>
                            <p className="text-sm text-muted-foreground">
                              Control how your data is used and shared
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-destructive mb-4">
                        Danger Zone
                      </h3>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleLogout}
                          className="w-full justify-start"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
