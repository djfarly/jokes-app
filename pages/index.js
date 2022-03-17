import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { Joke } from "../components/Joke/Joke";
import { JokeForm } from "../components/JokeForm/JokeForm";

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
    <div>
      <Head>
        <title>Jokes App</title>
      </Head>

      <main>
        <JokeForm
          onSubmitJoke={handleCreateJoke}
          disabled={isCreating}
          submitText={isCreating ? "Creating joke…" : "Create joke"}
          error={error}
        />
        <hr />
        {jokes.data ? (
          <ul>
            {jokes.data.map((joke) => (
              <Joke key={joke._id} joke={joke} jokes={jokes} />
            ))}
          </ul>
        ) : (
          "Loading…"
        )}
      </main>
    </div>
  );
}
