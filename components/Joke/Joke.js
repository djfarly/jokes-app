import { useState } from "react";
import { JokeForm } from "../JokeForm/JokeForm";

import styled from "styled-components";
import useSWR from "swr";

export function Joke({ joke }) {
  const jokes = useSWR("/api/jokes");

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
      <Container>
        <JokeForm
          defaultValue={joke.text}
          onSubmitJoke={handleEditJoke}
          disabled={isUpdating}
          submitText={isUpdating ? "Updating joke…" : "Update joke"}
          error={error}
          id={joke._id}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        {joke.userId ? (
          <small>Author: {joke.userId.name}</small>
        ) : (
          <small>Anon</small>
        )}
        <span>{joke.text}</span>
        <Buttons>
          <button onClick={handleEditButtonClick}>Edit</button>
          <button onClick={handleDeleteButtonClick} disabled={isDeleting}>
            Delete
          </button>
        </Buttons>
      </Container>
    );
  }
}

export const Container = styled.article`
  padding: 1rem 1rem 0.75rem 1rem;
  background-color: rgb(246 246 246);
  box-shadow: 0 0 10px rgb(0 0 0 / 6%), 0 5px 20px rgb(0 0 0 / 5%);
  height: 100%;
  display: grid;
  gap: 1rem;

  > form {
    height: 100%;
  }
`;

const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.5rem;

  > button {
    flex: 1 0 auto;
  }
`;
