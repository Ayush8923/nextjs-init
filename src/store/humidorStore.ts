import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HumidorsData } from "@/lib/types";

type PersistedState = Pick<HumidorStoreState, "humidorDetails">;

interface HumidorStoreState {
  humidorDetails: HumidorsData | null;
  setHumidorDetails: (_details: Partial<HumidorsData>) => void;
  clearHumidorDetails: () => void;
}

const useCigarStore = create<HumidorStoreState>()(
  persist<HumidorStoreState, [], [], PersistedState>(
    (set) => ({
      humidorDetails: null,
      setHumidorDetails: (details) =>
        set((state) => ({
          humidorDetails: state.humidorDetails
            ? { ...state.humidorDetails, ...details }
            : ({ ...details } as HumidorsData),
        })),
      clearHumidorDetails: () => set({ humidorDetails: null }),
    }),
    {
      name: "humidor-store",
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key);
          if (!value) return null;

          try {
            return JSON.parse(value);
          } catch (error) {
            return null;
          }
        },
        setItem: (key, value) =>
          sessionStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => sessionStorage.removeItem(key),
      },
      partialize: (state) => ({
        humidorDetails: state.humidorDetails,
      }),
    }
  )
);

export default useCigarStore;
