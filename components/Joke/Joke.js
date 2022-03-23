import { JokeForm } from "../JokeForm/JokeForm";
import styled from "styled-components";
import { useEditJoke } from "../../utils/hooks/useEditJoke";
import { useDeleteJoke } from "../../utils/hooks/useDeleteJoke";
import { useSession } from "next-auth/react";

const dateFormatter = Intl.DateTimeFormat("en", { dateStyle: "short" });

export function Joke({ joke }) {
  const { activateEditMode, error, handleEdit, isEditMode, isUpdating } =
    useEditJoke(joke);

  const { handleDelete, isDeleting } = useDeleteJoke(joke);

  // we can only edit or delete our own jokes…
  const { data: session } = useSession();
  const isOwnJoke = joke.userId && session?.user?.id === joke.userId?._id;

  if (isEditMode) {
    return (
      <Container>
        <JokeForm
          defaultValue={joke.text}
          onSubmitJoke={handleEdit}
          disabled={isUpdating}
          submitText={isUpdating ? "Updating joke…" : "Update joke"}
          error={error}
          id={joke._id}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <q>{joke.text}</q>
        <Info>
          {joke.userId?.name ? <div>— {joke.userId.name}</div> : null}
          {joke.createdAt ? (
            <div>{dateFormatter.format(new Date(joke.createdAt))}</div>
          ) : null}
          {isOwnJoke ? (
            <Buttons>
              <button onClick={activateEditMode}>Edit</button>
              <button
                onClick={() => {
                  if (
                    confirm(
                      `Please confirm to delete this joke:\n\n"${joke.text}"`
                    )
                  ) {
                    handleDelete();
                  }
                }}
                disabled={isDeleting}
              >
                Delete
              </button>
            </Buttons>
          ) : null}
        </Info>
      </Container>
    );
  }
}

export const Container = styled.article`
  padding: 1rem 1rem 0.75rem 1rem;
  background-color: rgb(246 246 246);
  box-shadow: 0 0 10px rgb(0 0 0 / 6%), 0 5px 20px rgb(0 0 0 / 5%);
  height: 100%;
  display: grid;
  gap: 1rem;

  > form {
    height: 100%;
  }
`;

const Info = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  font-size: small;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;

  > button {
    flex: 1 0 auto;
  }
`;
