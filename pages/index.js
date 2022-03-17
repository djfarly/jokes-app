import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { Container, Joke } from "../components/Joke/Joke";
import { JokeForm } from "../components/JokeForm/JokeForm";
import styled from "styled-components";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export default function Home() {
  const jokes = useSWR("/api/jokes", fetcher);

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState();

  async function handleCreateJoke(newText, form) {
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

  return (
    <>
      <Head>
        <title>Jokes App</title>
      </Head>

      <main>
        <h1>Jokes app</h1>
        <Container>
          <div>Create a new joke</div>
          <JokeForm
            onSubmitJoke={handleCreateJoke}
            disabled={isCreating}
            submitText={isCreating ? "Creating joke…" : "Create joke"}
            error={error}
            id="create"
          />
        </Container>
        {jokes.data ? (
          <JokeList>
            {jokes.data.map((joke) => (
              <li key={joke._id}>
                <Joke joke={joke} jokes={jokes} />
              </li>
            ))}
          </JokeList>
        ) : (
          "Loading…"
        )}
      </main>
    </>
  );
}

const JokeList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  > li {
    flex: 1 0 30ch;
  }
`;
