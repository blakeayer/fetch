'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/lib/useSearch';
import Pagination from '@/components/Pagination';
import SearchPreferences from '@/components/SearchPreferences';
import SearchResults from '@/components/SearchResults';

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
        {/* {requestQuery && <p>{requestQuery}</p>} */}
        {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        <SearchPreferences />
        {data && <Pagination searchResults={data} />}
        <SearchResults resultIds={data?.resultIds} />
        {data && <Pagination searchResults={data} />}
      </main>
    </div>
  );
};

export default SearchPage;
