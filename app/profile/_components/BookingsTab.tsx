"use client";
import { useState } from "react";
import { Calendar, Car, Clock, Download, Eye, Filter, MapPin, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";

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

const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => (
  <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex-1 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-medium text-sm">{booking.from}</span>
          </div>
          <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
          <Car className="h-4 w-4 text-primary" />
          <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">{booking.to}</span>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
        </div>

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
            <span>{booking.distance} • {booking.duration}</span>
          </div>
        </div>

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
          <Badge className={getStatusBadgeClass(booking.status)}>
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
);

const BookingsTab = ({ value }: { value: string }) => {
  const [bookingFilter, setBookingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <TabsContent value={value} className="space-y-6">
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
            <BookingCard key={booking.id} booking={booking} />
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
  );
};

export default BookingsTab;