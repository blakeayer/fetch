'use client';

import React, { useState } from 'react';
import SearchResult from '@/components/SearchResult';
import { useFavoritesStore } from '@/stores/favorites-store';
import { useDogs } from '@/lib/useDogs';
import { useMatch } from '@/lib/useMatch';
import { Dog } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

const FavoritesPage = () => {
  const { favoriteIds } = useFavoritesStore();
  const { data, isLoading, error } = useDogs(favoriteIds);
  const { getMatch, isLoading: isMatchLoading, error: matchError } = useMatch();

  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [fetchingDog, setFetchingDog] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchMatchedDog = async (dogId: string) => {
    try {
      setFetchingDog(true);
      setFetchError(null);
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([dogId]),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matched dog');
      }

      const dogs = await response.json();
      setMatchedDog(dogs[0]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch matched dog';
      setFetchError(errorMessage);
      console.error('Failed to fetch matched dog:', err);
    } finally {
      setFetchingDog(false);
    }
  };

  const handleMatch = async () => {
    try {
      const match = await getMatch(favoriteIds);
      await fetchMatchedDog(match.match);
    } catch (err) {
      console.error('Failed to get match:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex flex-col p-20 gap-8">
      <nav className="self-start">
        <Link
          href="/search"
          className="rounded-full p-4 border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        >
          ← Back to Search
        </Link>
      </nav>
      <h1 className="text-3xl font-bold underline">Favorites</h1>
      <ul className="grid grid-cols-3 gap-8">
        {data?.map((dog) => <SearchResult key={dog.id} result={dog} />)}
      </ul>
      <button
        className="flex rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        type="button"
        onClick={handleMatch}
      >
        Match Me
      </button>
      {(isMatchLoading || fetchingDog) && <div>Loading...</div>}
      {matchError && <div>{matchError}</div>}
      {fetchError && <div>{fetchError}</div>}
      {matchedDog && (
        <div>
          <h3>Your match has been found. Congratulations!</h3>
          <div className="relative h-screen w-full">
            <Image
              fill
              src={matchedDog.img}
              alt={matchedDog.name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="relative">
            <div>Name: {matchedDog.name}</div>
            <div>Age: {matchedDog.age}</div>
            <div>Breed: {matchedDog.breed}</div>
            <div>Zip Code: {matchedDog.zip_code}</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
