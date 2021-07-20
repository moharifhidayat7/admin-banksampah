import "@styles/globals.css";
import "@styles/CustomDatePicker.css";
import { Provider } from "next-auth/client";

import { GlobalContextWrapper } from "../components/Contexts/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalContextWrapper>
        <Component {...pageProps} />
      </GlobalContextWrapper>
    </Provider>
  );
}

export default MyApp;
