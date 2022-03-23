import { useState } from "react";
import useSWR from "swr";

export function useDeleteJoke(joke) {
  const jokes = useSWR("/api/jokes");

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const response = await fetch(`/api/jokes/${joke._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      jokes.mutate();
    }
    setIsDeleting(false);
  }

  return {
    isDeleting,
    handleDelete,
  };
}
