import { useState } from 'react';
import { ResultIds, Dog } from '@/models';

interface MatchResponse {
  match: string;
}

interface UseMatchReturn {
  getMatch: (favoriteIds: ResultIds) => Promise<MatchResponse>;
  isLoading: boolean;
  error: string | null;
  data: MatchResponse | null;
}

export function useMatch(): UseMatchReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MatchResponse | null>(null);

  const getMatch = async (favoriteIds: ResultIds): Promise<MatchResponse> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteIds),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch match');
      }

      const matchData = await response.json();
      setData(matchData);
      setError(null);
      return matchData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while finding a match';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getMatch,
    isLoading,
    error,
    data,
  };
}
