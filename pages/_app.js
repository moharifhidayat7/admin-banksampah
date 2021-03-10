import "tailwindcss/tailwind.css";
import "../style/index.css";

import { GlobalContextWrapper } from "../components/Contexts/GlobalContext";

function MyApp({ Component, pageProps }) {
    return (
        <GlobalContextWrapper>
            <Component {...pageProps} />
        </GlobalContextWrapper>
    );
}

export default MyApp;
