import Head from "next/head";
import useSWR from "swr";
import { Container } from "../components/Joke/Joke";
import { JokeForm } from "../components/JokeForm/JokeForm";
import { useCreateJoke } from "../utils/hooks/useCreateJoke";
import JokeList from "../components/JokeList/JokeList";

export default function Home() {
  const { handleCreateJoke, isCreating, error } = useCreateJoke();

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
        <JokeList />
      </main>
    </>
  );
}
