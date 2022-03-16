import Head from "next/head";
import Link from "next/link";

export default function Create() {
  async function handleSubmit(event) {
    event.preventDefault();
    // get data from event object
    const jokeText = event.target.elements.joke.value;

    // fetch
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ text: jokeText }),
    });
    const createdJoke = await response.json();
    if (response.ok) {
      alert(`Created new joke with id ${createdJoke.data._id}`);
    } else {
      alert(`Ooops — ${createdJoke.error}`);
    }
  }

  return (
    <div>
      <Head>
        <title>Jokes App — create</title>
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="joke">Joke</label>
          <input type="text" required id="joke" name="joke" />
          <input type="submit" value="Add joke!" />
        </form>
        <hr />
        <Link href="/">
          <a>← back home</a>
        </Link>
      </main>
    </div>
  );
}
