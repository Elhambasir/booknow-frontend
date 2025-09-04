"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Calendar, Search, Filter } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import InvoiceCard from "./InvoiceCard";
import { Button } from "@/components/ui/button";
import { useBookings } from "@/hooks/useBooking";

type InvoicesTabProps = {
  value: string;
  setTotalInvoices: Dispatch<SetStateAction<number>>;
};

const InvoicesTab = ({ value, setTotalInvoices }: InvoicesTabProps) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings directly
  const { data, isLoading, isError, refetch } = useBookings({
    page,
    pageSize,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchTerm,
  });

  // Transform bookings to invoices
  const invoices = data?.data?.map((booking: any) => ({
    invoiceId: booking.documentId,
    date: booking.date,
    time: booking.time,
    bookingStatus: booking.booking_status,
    amount: booking.amount,
    currency: "GBP",
    passengers: booking.passengers,
    from: booking.from.address,
    to: booking.to.address,
    vehicle: booking.package?.name,
    flightNumber: booking.flight_number || null,
    features: booking.package?.features || [],
    gmFees: booking.amount * (booking.gm_fees_percentage / 100),
  })) || [];

  // Update total invoices from server meta
  useEffect(() => {
    if (data?.meta?.pagination?.total !== undefined) {
      setTotalInvoices(data.meta.pagination.total);
    }
  }, [data, setTotalInvoices]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
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
              <span>Your Invoices</span>
              <Badge variant="secondary" className="ml-2">
                {data?.meta?.pagination?.total || 0} invoices
              </Badge>
            </CardTitle>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
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
              <div className="text-red-500 mb-4">Error loading invoices</div>
              <Button onClick={() => refetch()}>Try Again</Button>
            </div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No invoices found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Your invoice history will appear here"}
              </p>
            </div>
          ) : (
            <>
              {invoices.map((invoice: any) => (
                <InvoiceCard key={invoice.invoiceId} invoice={invoice} />
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
                    const pageCount = data?.meta?.pagination?.pageCount || 1;
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
                    const sortedPages = Array.from(showPages).sort((a, b) => a - b);
                    const result: (number | string)[] = [];

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
                        const pageCount = data?.meta?.pagination?.pageCount || 1;
                        if (page < pageCount) setPage(page + 1);
                      }}
                      isActive={page < (data?.meta?.pagination?.pageCount || 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default InvoicesTab;
