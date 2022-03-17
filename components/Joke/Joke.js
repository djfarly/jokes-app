import { useState } from "react";
import { JokeForm } from "../JokeForm/JokeForm";

export function Joke({ joke, jokes }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState();

  async function handleEditJoke(newText) {
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

  function handleEditButtonClick() {
    setIsEditMode(true);
  }

  async function handleDeleteButtonClick() {
    setIsDeleting(true);
    const response = await fetch(`/api/jokes/${joke._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      jokes.mutate();
    }
    setIsDeleting(false);
  }

  if (isEditMode) {
    return (
      <li>
        <JokeForm
          defaultValue={joke.text}
          onSubmitJoke={handleEditJoke}
          disabled={isUpdating}
          submitText={isUpdating ? "Updating joke…" : "Update joke"}
          error={error}
          id={joke._id}
        />
      </li>
    );
  } else {
    return (
      <li>
        <span>{joke.text}</span>
        <button onClick={handleEditButtonClick}>Edit</button>
        <button onClick={handleDeleteButtonClick} disabled={isDeleting}>
          Delete
        </button>
      </li>
    );
  }
}
