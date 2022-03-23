import useSWR from "swr";
import { Joke } from "../Joke/Joke";
import styled from "styled-components";

export default function JokeList() {
  const jokes = useSWR("/api/jokes");

  console.log(jokes.data);

  return (
    <>
      {jokes.data && jokes.data.length > 0 ? (
        <Ul>
          {jokes.data.map((joke) => (
            <li key={joke._id}>
              <Joke joke={joke} />
            </li>
          ))}
        </Ul>
      ) : (
        "Loading…"
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
