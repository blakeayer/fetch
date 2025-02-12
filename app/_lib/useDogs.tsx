// Used to send POST request to /dogs endpoint
import { useState, useEffect } from "react";
import { ResultIds, Dog } from "@/models";

export function useDogs(resultIds: ResultIds) {
  const [data, setData] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(resultIds),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setIsLoading(false);
      }
    };

    if (resultIds) {
      fetchDogs();
    }
  }, [resultIds]);

  return {
    data,
    isLoading,
    error,
  };
}
