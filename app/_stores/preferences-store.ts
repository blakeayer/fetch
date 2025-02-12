import { create } from 'zustand';
import { PreferencesData } from '@/models';

interface PreferencesState {
  storeState: Partial<PreferencesData>;
  updateStoreState: (newState: Partial<PreferencesData>) => void;
  resetStoreState: () => void;
  initializeBreedPreferences: (breeds: string[]) => void;
}

export const defaultFormState: Partial<PreferencesData> = {
  sortBy: 'breed',
  orderBy: 'asc',
  minAge: 0,
  maxAge: 20,
  all: true,
  breedPreferences: {},
};

export const usePreferencesStore = create<PreferencesState>((set) => ({
  storeState: defaultFormState,
  updateStoreState: (newState) =>
    set((state) => ({
      storeState: {
        ...state.storeState,
        ...newState,
      },
    })),
  resetStoreState: () => set({ storeState: defaultFormState }),
  initializeBreedPreferences: (breeds) =>
    set((state) => ({
      storeState: {
        ...state.storeState,
        breedPreferences: breeds.reduce(
          (acc, breed) => ({
            ...acc,
            [breed]: false,
          }),
          {}
        ),
      },
    })),
}));
