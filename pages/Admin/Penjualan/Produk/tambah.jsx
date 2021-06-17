import AdminLayout from "../../../../components/Layouts/PenjualanLayout";
import { useRouter } from "next/router";
import ProductForm from "../../../../components/Forms/ProductForm";
import { useState } from "react";
import { storage } from "../../../../src/firebase";

export default function TambahProduk() {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmit = async (data) => {
        const uploadTask = storage.ref(`products/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("products")
                    .child(image.name)
                    .getDownloadURL()
                    .then(async (url) => {
                        setUrl(url);
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_HOST}/api/product`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ ...data, picture: url }),
                            }
                        ).then(async (res) => {
                            router.push("/Admin/Penjualan/Produk");
                        });
                    });
            }
        );
    };

    return (
        <AdminLayout>
            <div>
                <ProductForm
                    onSubmit={onSubmit}
                    handleChange={handleChange}
                    title='Tambah Produk'
                />
            </div>
        </AdminLayout>
    );
}
