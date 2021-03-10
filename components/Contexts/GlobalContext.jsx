import { createContext, useContext, useReducer } from "react";

const globalState = {
    showSidebar: false,
    tes: "yes",
};

const reducer = (state, action) => {
    switch (action) {
        case "toggleSidebar":
            return { ...state, showSidebar: !state.showSidebar };
        default:
            return state;
    }
};

const GlobalContext = createContext();

export function GlobalContextWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, globalState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
