import AdminLayout from "../../../../components/Layouts/AdminLayout";
import HargaSampahForm from "../../../../components/Forms/HargaSampahForm";
import { useRouter } from "next/router";

export default function tambahJenisSampah() {
    const router = useRouter();

    const onSubmit = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            router.push("/Admin/Gudang/HargaSampah");
        });
    };

    return (
        <AdminLayout>
            <div>
                <HargaSampahForm
                    onSubmit={onSubmit}
                    title='Tambah Jenis Sampah'
                />
            </div>
        </AdminLayout>
    );
}
