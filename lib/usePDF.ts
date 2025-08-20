import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function GenerateBookingPDF(bookingData: any) {
  async function jsPDFEnglish() {
    const doc = new jsPDF();
    
    // Set styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    
    // Title
    doc.text("BOOKING DETAILS", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, 28, { align: "center" });
    
    // Draw header line
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 32, 195, 32);

    let currentY = 40;

    // Check if bookingData is an array or single object
    const bookings = Array.isArray(bookingData) ? bookingData : [bookingData];

    // Process each booking
    bookings.forEach((booking: any, index: number) => {
      if (index > 0) {
        // Add page break for multiple bookings
        doc.addPage();
        currentY = 20;
      }

      // Booking Header - FIXED: Check if documentId exists
      const bookingId = booking.documentId || booking.id || `N/A-${index}`;
      doc.setFontSize(16);
      doc.setTextColor(60, 120, 200);
      doc.text(`BOOKING #${bookingId}`, 15, currentY);
      currentY += 10;

      // Status badge - FIXED: Handle undefined status
      const status = booking.booking_status || "unknown";
    //   doc.setFillColor(
    //     status === "confirmed" ? [76, 175, 80] :
    //     status === "pending" ? [255, 152, 0] :
    //     status === "canceled" ? [244, 67, 54] :
    //     [100, 100, 100]
    //   );
      doc.roundedRect(160, currentY - 10, 30, 8, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text(status.toUpperCase(), 175, currentY - 5, { align: "center" });
      doc.setTextColor(40, 40, 40);

      // Basic Info Table - FIXED: Handle undefined values
      const basicInfo = [
        ["Booking Date", booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"],
        ["Pickup Time", booking.time || "N/A"],
        ["Passengers", booking.passengers?.toString() || "0"],
        ["Luggages", booking.luggages?.toString() || "0"],
        ["Distance", booking.distance ? `${booking.distance} km` : "N/A"],
        ["ETA", booking.ETA ? `${booking.ETA} minutes` : "N/A"],
        ["Total Amount", booking.amount ? `£${booking.amount.toFixed(2)}` : "£0.00"],
        ["Type", booking.type ? booking.type.toUpperCase() : "N/A"],
        ["Vehicle", booking.package?.name || "Not assigned"]
      ];

      autoTable(doc, {
        head: [["", ""]],
        body: basicInfo,
        startY: currentY,
        theme: 'grid',
        headStyles: {
          fillColor: [245, 245, 245],
          textColor: [60, 120, 200],
          fontStyle: 'bold'
        },
        bodyStyles: {
          textColor: [80, 80, 80]
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 50 },
          1: { cellWidth: 'auto' }
        },
        margin: { left: 15, right: 15 }
      });

      currentY = (doc as any).lastAutoTable.finalY + 15;

      // Location Information - FIXED: Handle undefined location data
      doc.setFontSize(14);
      doc.setTextColor(60, 120, 200);
      doc.text("LOCATION DETAILS", 15, currentY);
      currentY += 8;

      const fromAddress = booking.from?.address || booking.from_full_address || "N/A";
      const toAddress = booking.to?.address || "N/A";
      
      const locationInfo = [
        ["FROM:", fromAddress],
        ["City:", `${booking.from?.city || ""} ${booking.from?.postcode || ""}`.trim() || "N/A"],
        ["", ""],
        ["TO:", toAddress],
        ["City:", `${booking.to?.city || ""} ${booking.to?.postcode || ""}`.trim() || "N/A"]
      ];

      autoTable(doc, {
        body: locationInfo,
        startY: currentY,
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 3
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 25, textColor: [60, 120, 200] },
          1: { cellWidth: 'auto', textColor: [80, 80, 80] }
        },
        margin: { left: 15, right: 15 }
      });

      currentY = (doc as any).lastAutoTable.finalY + 15;

      // Flight Information if available - FIXED: Handle undefined flight number
      if (booking.flight_number) {
        doc.setFontSize(14);
        doc.setTextColor(60, 120, 200);
        doc.text("FLIGHT INFORMATION", 15, currentY);
        currentY += 8;

        const flightInfo = [
          ["Flight Number:", booking.flight_number],
          ["Airport:", booking.from?.isAirport ? "Pickup from Airport" : 
                     booking.to?.isAirport ? "Dropoff at Airport" : "N/A"]
        ];

        autoTable(doc, {
          body: flightInfo,
          startY: currentY,
          theme: 'grid',
          headStyles: {
            fillColor: [245, 245, 245],
            textColor: [60, 120, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 40 },
            1: { cellWidth: 'auto' }
          },
          margin: { left: 15, right: 15 }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;
      }

      // Package Details - FIXED: Handle undefined package
      if (booking.package) {
        doc.setFontSize(14);
        doc.setTextColor(60, 120, 200);
        doc.text("VEHICLE PACKAGE", 15, currentY);
        currentY += 8;

        const packageInfo = [
          ["Vehicle:", booking.package.name || "N/A"],
          ["Type:", booking.package.type || "N/A"],
          ["Capacity:", booking.package.num_of_passengers ? `${booking.package.num_of_passengers} passengers` : "N/A"],
          ["Luggage:", booking.package.num_of_big_suits || booking.package.num_of_small_suits ? 
                    `${booking.package.num_of_big_suits || 0} large + ${booking.package.num_of_small_suits || 0} small` : "N/A"],
          ["Features:", booking.package.features?.join(", ") || "None"]
        ];

        autoTable(doc, {
          body: packageInfo,
          startY: currentY,
          theme: 'grid',
          headStyles: {
            fillColor: [245, 245, 245],
            textColor: [60, 120, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 40 },
            1: { cellWidth: 'auto' }
          },
          margin: { left: 15, right: 15 }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;
      }

      // Return Trip if exists - FIXED: Handle undefined return data
      if (booking.return) {
        doc.setFontSize(14);
        doc.setTextColor(60, 120, 200);
        doc.text("RETURN TRIP", 15, currentY);
        currentY += 8;

        const returnInfo = [
          ["Return Date:", booking.return.date ? new Date(booking.return.date).toLocaleDateString() : "N/A"],
          ["Return Time:", booking.return.time || "N/A"],
          ["From:", booking.return.from?.address || "N/A"],
          ["To:", booking.return.to?.address || "N/A"]
        ];

        autoTable(doc, {
          body: returnInfo,
          startY: currentY,
          theme: 'grid',
          headStyles: {
            fillColor: [245, 245, 245],
            textColor: [60, 120, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 40 },
            1: { cellWidth: 'auto' }
          },
          margin: { left: 15, right: 15 }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;
      }

      // Footer for each booking - FIXED: Handle undefined createdAt
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      const createdDate = booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "Unknown";
      doc.text(`Created: ${createdDate}`, 15, currentY + 5);
      doc.text(`Booking ID: ${booking.id || "N/A"}`, 195, currentY + 5, { align: "right" });

      currentY += 15;
    });

    // Save PDF with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    doc.save(`bookings_report_${timestamp}.pdf`);
  }

  return {
    jsPDFEnglish,
  };
}