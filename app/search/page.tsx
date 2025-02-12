'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/lib/useSearch';
import Pagination from '@/components/Pagination';
import SearchResults from '@/components/SearchResults';
import SearchForm from '@/components/SearchForm';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const requestQuery = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '?sort=breed%3Aasc&size=25&from=0';
  const { data, isLoading, error } = useSearch(requestQuery);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching results: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen max-w-screen p-8 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <nav>
          <Link
            className="rounded-full p-4 border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href={'/favorites'}
          >
            See My Favories
          </Link>
        </nav>
        {/* {requestQuery && <p>{requestQuery}</p>} */}
        {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        <SearchForm />
        {data && <Pagination searchResults={data} />}
        <SearchResults resultIds={data?.resultIds} />
        {data && <Pagination searchResults={data} />}
      </main>
    </div>
  );
};

export default SearchPage;
