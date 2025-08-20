import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BookingCreateInterface } from "@/types";

interface BookingStore {
  booking: BookingCreateInterface;
  currentStep: number;
  setBooking: (data: BookingCreateInterface) => void;
  updateBooking: (data: Partial<BookingCreateInterface>) => void;
  setCurrentStep: (step: number) => void;
  // calculatePrice: () => void;
  clearBooking: () => void;
  // getBookingSummary: () => {
  //   subtotal: number;
  //   child_seat: number | undefined;
  //   meetGreet: number;
  //   // airportSurcharge: number;
  //   total: number;
  // };
}

const initialBooking: BookingCreateInterface = {
  type: "one way",
  booking_status: 'pending',
  from: null,
  to: null,
  from_full_address: '',
  to_full_address: '',
  date: new Date(),
  time: "",
  passengers: 1,
  luggages: 1,
  meet_greet: false,
  child_seat: 0,
  airport_fee: 0,
  flight_number: "",
  distance: 0,
  ETA: 0,
  amount: 0,
  package: undefined,
};

// // Optimized pricing for London market
// const PRICING_CONFIG = {
//   childSeatPrice: 15,
//   meetGreetPrice: 25,
//   airportSurchargeRate: 0.15, // 15% surcharge for airport routes
//   minimumFare: 35,
// };

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      booking: initialBooking,
      currentStep: 0,
      setBooking: (data: BookingCreateInterface) => set({ booking: data }),
      updateBooking: (data) => {
        const current = get().booking;
        if (!current) return;
        const updatedBooking = { ...current, ...data };
        set({ booking: updatedBooking });
        // Recalculate price after update
        // setTimeout(() => get().calculatePrice(), 0);
      },

      setCurrentStep: (step) => set({ currentStep: step }),

      // calculatePrice: () => {
      //   set((state) => {
      //     const { booking } = state;
      //     const { from_package, from_distance, child_seat, meet_greet } =
      //       booking;

      //     if (!from_package || !from_distance) {
      //       return state;
      //     }

      //     // Calculate base fare using optimized distance bands
      //     let basePrice = from_package.price_options.baseFare;
      //     let remainingDistance = from_distance;

      //     for (const band of from_package.price_options.distanceBands) {
      //       const bandLimit =
      //         band.limit === "Infinity" ? Infinity : Number(band.limit);
      //       const distanceInBand = Math.min(remainingDistance, bandLimit);

      //       basePrice += distanceInBand * band.rate;
      //       remainingDistance -= distanceInBand;

      //       if (remainingDistance <= 0) break;
      //     }

      //     // Apply market-competitive adjustments
      //     basePrice = Math.max(basePrice, PRICING_CONFIG.minimumFare);

      //     // Add-ons
      //     const childSeatPrice = child_seat * PRICING_CONFIG.childSeatPrice;
      //     const meetGreetPrice = meet_greet ? PRICING_CONFIG.meetGreetPrice : 0;

      //     const totalPrice = basePrice + childSeatPrice + meetGreetPrice;

      //     return {
      //       ...state,
      //       booking: {
      //         ...booking,
      //         basePrice: Math.round(basePrice),
      //         childSeatPrice,
      //         meetGreetPrice,
      //         totalPrice: Math.round(totalPrice),
      //       },
      //     };
      //   });
      // },

      clearBooking: () => set({ booking: initialBooking, currentStep: 0 }),

      // getBookingSummary: () => {
      //   const { booking } = get();
      //   return {
      //     subtotal: booking.basePrice,
      //     child_seat: booking.child_seat,
      //     meetGreet: booking.meet_greet?10:0,
      //     total: booking.totalPrice,
      //   };
      // },
    }),
    {
      name: "book-storage",
      partialize: (state) => ({
        booking: state.booking,
        currentStep: state.currentStep,
      }),
    }
  )
);
