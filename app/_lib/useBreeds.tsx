// Used to send GET request to /breeds endpoint
import useSWR from "swr";

const breedsFetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "include",
  }).then((r) => r.json());

export function useBreeds() {
  const { data, error, isLoading } = useSWR<string[]>(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    breedsFetcher
  );

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
}
