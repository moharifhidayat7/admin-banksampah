import router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function index() {
    const router = useRouter();
    useEffect(() => {
        router.push("/login");
    });
    return <div>Main</div>;
}
