"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Calendar,
  Car,
  Filter,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
// import { GenerateBookingPDF } from "@/lib/usePDF";
import Link from "next/link";
import BookingCard from "./BookingCard";
import { Button } from "@/components/ui/button";

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
  // const { jsPDFEnglish } = GenerateBookingPDF(bookingData);
  const { data, isLoading, isError, refetch } = useBookings({
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
  const refetchBooking = () => {
    refetch();
  }
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
              {/* <Button type="button" variant="outline" size="icon" onClick={jsPDFEnglish}>
                <Download className="h-4 w-4" />
              </Button> */}
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
                <BookingCard key={booking.id} booking={booking} refetchBooking={refetchBooking} />
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
              <Button asChild>
                <Link href="/booking">
                  <Car className="h-4 w-4 mr-2" />
                  Book Your First Ride
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BookingsTab;
