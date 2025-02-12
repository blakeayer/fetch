// Used to send GET request with current queries to dogs/search endpoint
import useSWR from "swr";
import { SearchResults } from "@/models";
import { fetchApi } from "./fetchApi";

export function useSearch(requestQuery: string) {
  const { data, error, isLoading } = useSWR<SearchResults | undefined>(
    `/dogs/search${requestQuery}`,
    async (url: string) => {
      const response = await fetchApi(url);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return response.json();
    }
  );
  return {
    data,
    isLoading,
    error,
  };
}
