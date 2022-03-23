import Head from "next/head";
import { Container } from "../components/Joke/Joke";
import { JokeForm } from "../components/JokeForm/JokeForm";
import { useCreateJoke } from "../utils/hooks/useCreateJoke";
import JokeList from "../components/JokeList/JokeList";
import LoginButton from "../components/LoginButton/LoginButton";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function MyJokes() {
  const { handleCreate, isCreating, error } = useCreateJoke();

  return (
    <>
      <Head>
        <title>Jokes App</title>
      </Head>

      <main>
        <h1>Jokes app</h1>
        <LoginButton />
        <nav>
          <Link href="/">
            <a>← back to feed</a>
          </Link>
        </nav>
        <Container>
          <div>Create a new joke</div>
          <JokeForm
            onSubmitJoke={handleCreate}
            disabled={isCreating}
            submitText={isCreating ? "Creating joke…" : "Create joke"}
            error={error}
            id="create"
          />
        </Container>
        <h2>My Jokes</h2>
        <JokeList />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // this page is not available for unauthenticated users
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
