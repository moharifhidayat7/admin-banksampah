import { useGlobalContext } from "./Contexts/GlobalContext";

export default function Sidebar({ children }) {
    const [state, dispatch] = useGlobalContext();
    return (
        <div
            className={
                (state.showSidebar ? "md:w-0 md:hidden" : "md:w-56 h-0") +
                " w-full sm:w-full md:h-full overflow-hidden bg-gray-800 fixed md:inset-y-0 shadow-lg pt-20"
            }
        >
            {children}
        </div>
    );
}
