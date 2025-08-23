"use client";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import ProfileHeroSection from "./ProfileHeroSection";
import ProfileTab from "./ProfileTab";
import BookingsTab from "./BookingsTab";
import PaymentsTab from "./PaymentsTab";
import SettingsTab from "./SettingsTab";
import { Calendar, CreditCard, Settings, User } from "lucide-react";
import { UserDetails } from "@/types";
import { signOut } from "next-auth/react";
import { useState } from "react";
const UserProfilePage = ({ userDetails, tab } : { userDetails: UserDetails, tab?: string }) => {
  const defaultActiveTab = tab ?? "profile";
  const [totalTrips, settotalTrips] = useState(0);
  const handleSignOut = () => {
      signOut();
      toast.success("Logout successfully");
    };
  return (
    <div className="min-h-screen bg-muted/30">
      <ProfileHeroSection />
      <section className="py-8 -mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue={defaultActiveTab} className="space-y-8">
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

              <ProfileTab value="profile" userDetails={userDetails} totalTrips={totalTrips} />
              <BookingsTab value="bookings" settotalTrips={settotalTrips} />
              <PaymentsTab value="payments" />
              <SettingsTab value="settings" onLogout={handleSignOut} />
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;