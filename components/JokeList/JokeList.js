import useSWR from "swr";
import { Joke } from "../Joke/Joke";
import styled from "styled-components";

export default function JokeList({ type }) {
  const jokes = useSWR(type === "feed" ? "api/feed" : "/api/jokes");

  return (
    <>
      {jokes.data && Array.isArray(jokes.data) ? (
        jokes.data.length > 0 ? (
          <Ul>
            {jokes.data.map((joke) => (
              <li key={joke._id}>
                <Joke joke={joke} />
              </li>
            ))}
          </Ul>
        ) : (
          <div>No jokes yet 🤷‍♂️</div>
        )
      ) : (
        <div>Loading…</div>
      )}
    </>
  );
}

const Ul = styled.ul`
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
