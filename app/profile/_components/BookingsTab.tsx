// components/BookingsTab.tsx
"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Calendar,
  Car,
  Clock,
  Download,
  Eye,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { useBookings } from "@/hooks/useBooking";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "checking":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "pending":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    case "reserved":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "picked up":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "canceled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const BookingCard = ({ booking }: { booking: any }) => (
  <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex-1 space-y-3">
        <div className="flex items-center space-x-3">
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
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Car className="h-4 w-4" />
            <span>{booking.package?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>
              {booking.distance} • {booking?.ETA}
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

const BookingsTab = ({
  value,
  settotalTrips,
}: {
  value: string;
  settotalTrips: Dispatch<SetStateAction<number>>;
}) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useBookings({
    page,
    pageSize,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchTerm,
  });

  // Update totalTrips whenever data changes
  useEffect(() => {
    if (data?.meta?.pagination?.total !== undefined) {
      settotalTrips(data.meta.pagination.total);
    }
  }, [data, settotalTrips]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1); // Reset to first page when changing status filter
  };

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
                {data?.meta?.pagination?.total || 0} trips
              </Badge>
            </CardTitle>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="picked up">Picked Up</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          ) : isError ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">Error loading bookings</div>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <>
              {data.data.map((booking: any) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}

              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                      isActive={page > 1}
                    />
                  </PaginationItem>

                  {(() => {
                    const pageCount = data.meta.pagination.pageCount;
                    const currentPage = page;
                    const pages = [];

                    // Always show first and last pages
                    const showPages = new Set([1, pageCount]);

                    // Show current page and surrounding pages
                    for (
                      let i = Math.max(1, currentPage - 1);
                      i <= Math.min(pageCount, currentPage + 1);
                      i++
                    ) {
                      showPages.add(i);
                    }

                    // Convert to sorted array
                    const sortedPages = Array.from(showPages).sort(
                      (a, b) => a - b
                    );
                    const result: (number | string)[] = [];

                    // Build the pages array with ellipsis
                    for (let i = 0; i < sortedPages.length; i++) {
                      if (i > 0 && sortedPages[i] - sortedPages[i - 1] > 1) {
                        result.push("...");
                      }
                      result.push(sortedPages[i]);
                    }

                    return result.map((pageItem, index) => (
                      <PaginationItem key={index}>
                        {pageItem === "..." ? (
                          <span className="flex h-9 w-9 items-center justify-center">
                            ...
                          </span>
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageItem as number);
                            }}
                            isActive={pageItem === currentPage}
                          >
                            {pageItem}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ));
                  })()}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < data.meta.pagination.pageCount)
                          setPage(page + 1);
                      }}
                      isActive={page < data.meta.pagination.pageCount}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
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
