import Head from "next/head";
import useSWR from "swr";
import { Container } from "../components/Joke/Joke";
import { JokeForm } from "../components/JokeForm/JokeForm";
import { useCreateJoke } from "../utils/hooks/useCreateJoke";
import JokeList from "../components/JokeList/JokeList";
import LoginButton from "../components/LoginButton/LoginButton";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const { handleCreateJoke, isCreating, error } = useCreateJoke();

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Jokes App</title>
      </Head>

      <main>
        <h1>Jokes app</h1>
        <LoginButton />
        <Container>
          {session ? (
            <>
              <div>Create a new joke</div>
              <JokeForm
                onSubmitJoke={handleCreateJoke}
                disabled={isCreating}
                submitText={isCreating ? "Creating joke…" : "Create joke"}
                error={error}
                id="create"
              />
            </>
          ) : (
            <div>Please login to write jokes</div>
          )}
        </Container>
        <JokeList />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
