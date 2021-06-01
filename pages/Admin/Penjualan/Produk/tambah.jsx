import AdminLayout from "../../../../components/Layouts/PenjualanLayout";
import { useRouter } from "next/router";
import ProductForm from "../../../../components/Forms/ProductForm";

export default function TambahProduk() {
    const router = useRouter();

    const onSubmit = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            router.push("/Admin/Penjualan/Produk");
        });
    };
    return (
        <AdminLayout>
            <div>
                <ProductForm onSubmit={onSubmit} title='Tambah Produk' />
            </div>
        </AdminLayout>
    );
}
