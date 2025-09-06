"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeMilliseconds, to12HourFormat } from "@/lib/utils";
import { GenerateInvoicePDF } from "@/lib/usePDF";
type Invoice = {
  invoiceId: string;
  date: string;
  time: string;
  bookingStatus: string;
  amount: number;
  currency: string;
  passengers: number;
  from: string;
  to: string;
  vehicle: string;
  flightNumber?: string | null;
  features: string[];
  gmFees: number;
};

const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  const { jsPDFEnglish } = GenerateInvoicePDF(invoice);
  const handleDownload = async () => {
    await jsPDFEnglish(); // generates & downloads PDF
  };

  return (
    <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-semibold">
          Invoice #{invoice.invoiceId.slice(0, 8)}
        </CardTitle>
        <Badge
          variant={invoice.bookingStatus === "pending" ? "secondary" : "default"}
        >
          {invoice.bookingStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Date:</span> {invoice.date} | {to12HourFormat(removeMilliseconds(invoice.time))}
        </p>
        <p>
          <span className="font-semibold">From:</span> {invoice.from}
        </p>
        <p>
          <span className="font-semibold">To:</span> {invoice.to}
        </p>
        <p>
          <span className="font-semibold">Vehicle:</span> {invoice.vehicle}
        </p>
        {invoice.flightNumber && (
          <p>
            <span className="font-semibold">Flight:</span> {invoice.flightNumber}
          </p>
        )}
        <p>
          <span className="font-semibold">Passengers:</span> {invoice.passengers}
        </p>
        <p>
          <span className="font-semibold">Features:</span> {invoice.features.join(", ")}
        </p>
        {/* <p>
          <span className="font-semibold">GM Fees:</span> {invoice.gmFees.toFixed(2)}{" "}
          {invoice.currency}
        </p> */}
        <p className="font-bold text-gray-800">
          Total Amount: {invoice.amount.toFixed(2)} {invoice.currency}
        </p>

        <Button size="sm" className="mt-2" onClick={handleDownload}>
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
