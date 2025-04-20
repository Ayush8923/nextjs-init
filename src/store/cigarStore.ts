import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CigarDetailsFormData } from "@/lib/types";

type FlowType = "existing" | "custom";
type PersistedState = Pick<CigarStoreState, "cigarDetails">;
interface CigarStoreState {
  cigarDetails: CigarDetailsFormData | null;
  flowType: FlowType;
  setCigarDetails: (_details: Partial<CigarDetailsFormData>) => void;
  setFlowType: (_flowType: FlowType) => void;
  clearCigarDetails: () => void;
  clearCigarFlowType: () => void;
}

const useCigarStore = create<CigarStoreState>()(
  persist<CigarStoreState, [], [], PersistedState>(
    (set) => ({
      cigarDetails: null,
      flowType: "existing",
      setFlowType: (flowType: FlowType) => set({ flowType }),
      setCigarDetails: (details) =>
        set((state) => ({
          cigarDetails: state.cigarDetails
            ? { ...state.cigarDetails, ...details }
            : { ...details },
        })),
      clearCigarDetails: () => set({ cigarDetails: null }),
      clearCigarFlowType: () => set({ flowType: "existing" }),
    }),
    {
      name: "cigar-store",
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
        cigarDetails: state.cigarDetails,
        flowType: state.flowType,
      }),
    }
  )
);

export default useCigarStore;
