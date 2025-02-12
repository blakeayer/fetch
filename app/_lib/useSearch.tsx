// Used to send GET request with current queries to dogs/search endpoint
import useSWR from "swr";
import { SearchResults } from "@/models";

const searchFetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "include",
  }).then((r) => r.json());

export function useSearch(requestQuery: string) {
  // console.log("requestQuery: ", requestQuery)
  const { data, error, isLoading } = useSWR<SearchResults | undefined>(
    `https://frontend-take-home-service.fetch.com/dogs/search${requestQuery}`,
    searchFetcher
  );
  return {
    data,
    isLoading,
    error,
  };
}
