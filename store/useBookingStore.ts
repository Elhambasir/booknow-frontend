'use client'

import { IBooking } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookingState {
  booking: IBooking | null
  loading: boolean
  setBooking: (data: IBooking) => void
  updateBooking: (updatedData: Partial<IBooking>) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      booking: null,
      loading: false,

      setBooking: (data: IBooking) =>
        set({ booking: data }),

      updateBooking: (updatedData: Partial<IBooking>) => {
        const current = get().booking
        if (!current) return
        const updatedBooking = { ...current, ...updatedData }
        set({ booking: updatedBooking })
      },

      clearBooking: () => set({ booking: null }),
    }),
    {
      name: 'booking-storage', // localStorage key
      partialize: (state) => ({ booking: state.booking }), // optional: store only booking
    }
  )
)
