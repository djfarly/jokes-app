import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [jokes, setJokes] = useState();

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch("/api/jokes");
        const jokesData = await response.json();
        setJokes(jokesData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchJokes();
  }, []);

  return (
    <div>
      <Head>
        <title>Jokes App</title>
      </Head>

      <main>
        {jokes ? (
          <ul>
            {jokes.map((joke) => (
              <li key={joke._id}>{joke.text}</li>
            ))}
          </ul>
        ) : (
          "Loading…"
        )}
        <hr />
        <div>
          <Link href="/create">
            <a>📝 Create new joke</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
