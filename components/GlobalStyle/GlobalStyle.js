import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    max-width: 65ch;
    margin: 3rem auto;
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  button, input[type="button"], input[type="submit"] {
    appearance: none;
    border: none;
    background-color: white;
    border-radius: 3px;
    padding: 0.5rem;
    box-shadow: 0 0 5px rgb(0 0 0 / 2%), 0 0 10px rgb(0 0 0 / 0%);

    &:hover {
      background-color: rgb(252 252 252);
      box-shadow: 0 0 5px rgb(0 0 0 / 4%), 0 2.5px 10px rgb(0 0 0 / 4%);
    }
  }

  h1 {
    margin: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
