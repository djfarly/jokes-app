import Head from "next/head";
import JokeList from "../components/JokeList/JokeList";
import LoginButton from "../components/LoginButton/LoginButton";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jokes App</title>
      </Head>
      <main>
        <h1>Jokes app</h1>
        <LoginButton />
        <nav>
          <Link href="/my-jokes">
            <a>👤 my jokes</a>
          </Link>
        </nav>
        <h2>Feed</h2>
        <JokeList type="feed" />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
