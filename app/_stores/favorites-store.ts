import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: (id) =>
        set((state) => ({
          favoriteIds: [...state.favoriteIds, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((favoriteId) => favoriteId !== id),
        })),
      toggleFavorite: (id) => {
        const isFavorite = get().isFavorite(id);
        if (isFavorite) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },
      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
