export function JokeForm({
  onSubmitJoke,
  disabled,
  submitText,
  error,
  defaultValue,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmitJoke(event.target.elements.text.value, event.target);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Joke text</label>
      <input
        type="text"
        required
        id="text"
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
