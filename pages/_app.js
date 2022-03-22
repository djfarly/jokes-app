import { SWRConfig } from "swr";
import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle";
import { Toggle } from "../components/Toggle/Toggle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <GlobalStyle />
        <Toggle />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
