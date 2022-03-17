import styled from "styled-components";

export function JokeForm({
  onSubmitJoke,
  disabled,
  submitText,
  error,
  defaultValue,
  id,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmitJoke(event.target.elements.text.value, event.target);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={`text-${id}`}>Joke text</label>
        <input
          type="text"
          required
          id={`text-${id}`}
          name="text"
          defaultValue={defaultValue}
        />
        {error ? (
          <p>
            <strong>Error:</strong> {error}
          </p>
        ) : null}
      </div>
      <input type="submit" value={submitText} disabled={disabled} />
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: 1rem;

  > div {
    display: grid;
  }

  label {
    font-size: small;
    font-weight: 300;
  }

  input[type="text"] {
    appearance: none;
    padding: 0.5rem;
    border: 1px solid rgb(190 190 190);
    border-radius: 3px;
  }

  input[type="submit"] {
    margin-top: auto;
  }
`;
