'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/lib/useSearch';
import Pagination from '@/components/Pagination';
import SearchResults from '@/components/SearchResults';
import SearchForm from '@/components/SearchForm';

const SearchContent = () => {
  const searchParams = useSearchParams();
  const requestQuery = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '?sort=breed%3Aasc&size=25&from=0';
  const { data, isLoading, error } = useSearch(requestQuery);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching results: {error.message}</div>;

  return (
    <>
      <SearchForm />
      {data && <Pagination searchResults={data} />}
      <SearchResults resultIds={data?.resultIds} />
      {data && <Pagination searchResults={data} />}
    </>
  );
};

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen max-w-screen p-8 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full">
        <nav>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4"
            href={'/favorites'}
          >
            See My Favories
          </Link>
        </nav>
        <Suspense fallback={<div>Loading search results...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </div>
  );
};

export default SearchPage;
