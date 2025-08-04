import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Location } from '@/types'

interface LocationState {
  pickup: Location | null
  dropoff: Location | null
  setPickup: (location: Location) => void
  setDropoff: (location: Location) => void
  updateLocation: (type: 'pickup' | 'dropoff', location: Location) => void
  clearLocations: () => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      pickup: null,
      dropoff: null,
      setPickup: (location: Location) => set({ pickup: location }),
      setDropoff: (location: Location) => set({ dropoff: location }),
      updateLocation: (type, location) => {
        if (type === 'pickup') {
          set({ pickup: location })
        } else if (type === 'dropoff') {
          set({ dropoff: location })
        }
      },
      clearLocations: () => set({ pickup: null, dropoff: null }),
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({
        pickup: state.pickup,
        dropoff: state.dropoff,
      }),
    }
  )
)
