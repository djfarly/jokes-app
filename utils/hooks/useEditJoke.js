import { useState } from "react";
import useSWR from "swr";

export function useEditJoke(joke) {
  const jokes = useSWR("/api/jokes");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState();

  async function handleEdit(newText) {
    setIsUpdating(true);
    const response = await fetch(`/api/jokes/${joke._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    const updatedJoke = await response.json();
    if (response.ok) {
      jokes.mutate();
      setError();
      setIsEditMode(false);
    } else {
      setError(updatedJoke.error ?? "Something went wrong");
    }
    setIsUpdating(false);
  }

  function activateEditMode() {
    setIsEditMode(true);
  }

  return {
    isEditMode,
    isUpdating,
    error,
    activateEditMode,
    handleEdit,
  };
}
