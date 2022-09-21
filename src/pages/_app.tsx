import type { AppProps } from "next/app";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import { UserWrapper } from "src/context/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "../styles/globals.css";

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserWrapper>
      <Component {...pageProps} />
    </UserWrapper>
  );
}

export default MyApp;
