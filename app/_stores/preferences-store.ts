import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PreferencesData } from '@/models';

interface PreferencesState {
  formState: Partial<PreferencesData>;
  updateFormState: (newState: Partial<PreferencesData>) => void;
  resetFormState: () => void;
}

const defaultFormState: Partial<PreferencesData> = {
  sortBy: 'breed',
  orderBy: 'asc',
  minAge: 0,
  maxAge: 20,
  all: true,
  breedPreferences: {},
};

export const preferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      formState: defaultFormState,
      updateFormState: (newState) =>
        set((state) => ({
          formState: {
            ...state.formState,
            ...newState,
          },
        })),
      resetFormState: () => set({ formState: defaultFormState }),
    }),
    {
      name: 'preferences-storage',
    }
  )
);
