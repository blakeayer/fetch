import React from 'react';
import { ResultIds } from '@/models';
import SearchResult from '@/components/SearchResult';
import { useDogs } from '@/lib/useDogs';

const SearchResults = ({ resultIds }: { resultIds: ResultIds | undefined }) => {
  const { data, isLoading, error } = useDogs(resultIds ?? []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full">
      <h3>Search Results:</h3>
      {data && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((result) => (
            <li className="w-full" key={result.id}>
              <SearchResult result={result} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
