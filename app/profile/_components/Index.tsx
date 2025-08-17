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
import { BookingSelectInterface, UserDetails } from "@/types";
import { signOut } from "next-auth/react";
const UserProfilePage = ({ userDetails, tab, userBooking } : { userDetails: UserDetails, tab?: string, userBooking: BookingSelectInterface[]}) => {
  const defaultActiveTab = tab ?? "profile";

  const handleSignOut = () => {
      signOut();
      toast.success("Logout successfully");
    };
  return (
    <div className="min-h-screen bg-muted/30">
      <ProfileHeroSection userBooking={userBooking} />
      
      <section className="py-12 -mt-6">
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

              <ProfileTab value="profile" userDetails={userDetails} />
              <BookingsTab value="bookings" userBooking={userBooking} />
              <PaymentsTab value="payments" />
              <SettingsTab value="settings" onLogout={handleSignOut} />
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserProfilePage;