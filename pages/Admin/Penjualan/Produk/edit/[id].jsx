import AdminLayout from "../../../../../components/Layouts/PenjualanLayout";
import { useRouter } from "next/router";
import ProductForm from "../../../../../components/Forms/ProductForm";

export default function TambahProduk({ product }) {
    const router = useRouter();

    const onSubmit = async (data) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/product/${product._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            router.push("/Admin/Penjualan/Produk");
        });
    };
    return (
        <AdminLayout>
            <div>
                <ProductForm
                    onSubmit={onSubmit}
                    data={product}
                    title='Edit Produk'
                />
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/product/${params.id}`
    );
    const product = await res.json();
    return {
        props: {
            product,
        },
    };
}
