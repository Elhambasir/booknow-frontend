import { BookingSelectInterface } from "@/types";
import { User } from "lucide-react";


const ProfileHeroSection = ({
  userBooking
}: {userBooking: BookingSelectInterface[]}) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-gold/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="w-full h-full bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-full flex items-center justify-center shadow-[var(--shadow-gold)]">
              <User className="h-16 w-16 text-primary" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-primary mb-3">
            Welcome back
          </h1>
          <p className="text-primary-muted text-lg mb-8">
            Manage your profile, track your journeys, and control your
            preferences
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userBooking?.filter((b: BookingSelectInterface) => b.booking_status === "delivered").length}
              </div>
              <div className="text-brand-gold/80 text-sm">
                Completed Trips
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userBooking?.filter((b:BookingSelectInterface) => b.booking_status === "pending").length}
              </div>
              <div className="text-brand-gold/80 text-sm">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-brand-gold/80 text-sm">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeroSection;