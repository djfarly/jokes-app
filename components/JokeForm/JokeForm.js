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
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value={submitText} disabled={disabled} />
    </form>
  );
}
