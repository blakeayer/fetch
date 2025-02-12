import React from 'react'
import { ResultIds } from '@/models';
import SearchResult from '@/components/SearchResult';
import {useDogs} from '@/lib/useDogs';

const SearchResults = ({ resultIds }: { resultIds: ResultIds | undefined }) => {
  const { data, isLoading, error } = useDogs(resultIds ?? []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className='w-full'>
      <h3>Search Results:</h3>
      {data && (
        <ul className="grid grid-cols-3 gap-2">
          {data.map((result, index) => (
            <SearchResult key={result.id} result={result} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchResults;