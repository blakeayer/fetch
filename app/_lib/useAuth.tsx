import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/models";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginUser = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log("Login successful!");
      router.push("/search");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const loginStatus = async () => {
    try {
      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/breeds`,
        { credentials: "include" }
      );

      if (!response.ok) {
        console.log("You have been logged out.");
        router.push("/");
        return;
      }
      console.log("You are still logged in.");
      return;
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  return { loginStatus, loginUser, loading, error };
}
