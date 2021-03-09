import Navbar from "../components/Navbar";
import AdminLayout from "../components/Layouts/AdminLayout";
import Sidebar from "../components/Sidebar";
export default function Tes() {
    return (
        <div>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
        </div>
    );
}

Tes.layout = AdminLayout;
