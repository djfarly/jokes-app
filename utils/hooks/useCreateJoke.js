import { useState, useEffect } from "react";
import useSWR from "swr";

export function useCreateJoke() {
  const jokes = useSWR("/api/jokes");

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState();

  async function handleCreate(newText, form) {
    setIsCreating(true);
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    const createdJoke = await response.json();
    if (response.ok) {
      jokes.mutate();
      form.reset();
      setError();
    } else {
      setError(createdJoke.error ?? "Something went wrong");
    }
    setIsCreating(false);
  }

  return {
    isCreating,
    error,
    handleCreate,
  };
}
