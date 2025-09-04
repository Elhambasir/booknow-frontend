import React from "react";
import {
  Calendar,
  Car,
  Clock,
  Eye,
  X,
  CalendarClock,
  MapPin,
} from "lucide-react";
import ReusableDialog from "@/components/ReusableDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingCancelForm from "./BookingCancelForm";
import RescheduleForm from "./RescheduleForm";
import { removeMilliseconds, to12HourFormat } from "@/lib/utils";
// Helper function for status badge classes (if not already defined)
function getStatusBadgeClass(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}
export default function BookingCard({ booking, refetchBooking }: { booking: any, refetchBooking: ()=> void }) {

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-sm">
                {booking?.from?.address}
              </span>
            </div>
            <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
            <Car className="h-4 w-4 text-primary" />
            <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">{booking.to?.address}</span>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(booking.date)?.toDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{to12HourFormat(removeMilliseconds(booking.time))}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Car className="h-4 w-4" />
              <span>{booking.package?.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>
                {booking.distance} Mile • {booking?.ETA}{" "}
                {booking?.ETA > 1 ? "Minutes" : "Minute"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:text-right">
          <div className="flex flex-col items-center lg:items-end">
            <span className="text-2xl font-bold text-primary">
              £{booking.amount.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-2">
            <Badge className={getStatusBadgeClass(booking?.booking_status!)}>
              {booking?.booking_status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Action buttons container */}
      <div className="mt-4 pt-4 border-t border-muted-foreground/20 flex flex-col-reverse lg:flex-row justify-end gap-3 space-x-2">
        <Button variant="outline" size="sm" className="">
          <Eye className="h-4 w-4 mr-1" />
          Details
        </Button>
        {(booking.booking_status === "pending"||booking.booking_status === "reserved") && (
          <ReusableDialog
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            }
            children={<BookingCancelForm id={booking.documentId} refetchBooking={refetchBooking} />}
          />
        )}
        {booking.booking_status === "pending" && (
          <ReusableDialog
            trigger={
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-1.5 bg-primary/90 hover:bg-primary transition-colors"
              >
                <CalendarClock className="h-4 w-4" />
                Reschedule
              </Button>
            }
            children={<RescheduleForm booking={booking} refetchBooking={refetchBooking} />}
          />
        )}
      </div>
    </div>
  );
}
