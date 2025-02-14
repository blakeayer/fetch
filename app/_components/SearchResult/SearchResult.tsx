import React from 'react';
import Image from 'next/image';
import { Dog } from '@/models';
import { useFavoritesStore } from '@/stores/favorites-store';

const SearchResult = ({ result }: { result: Dog }) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(result.id)}
      className={`p-5 w-full rounded-lg ${isFavorite(result.id) ? 'bg-zinc-600' : 'bg-zinc-800'}`}
    >
      <div className="relative aspect-square w-full">
        <Image
          fill
          src={result.img}
          alt={result.name}
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="relative">
        <div>Name: {result.name}</div>
        <div>Age: {result.age}</div>
        <div>Breed: {result.breed}</div>
        <div>Zip Code: {result.zip_code}</div>
        {isFavorite(result.id) && <span className="absolute bottom-0 right-0">❤️</span>}
      </div>
    </button>
  );
};

export default SearchResult;
