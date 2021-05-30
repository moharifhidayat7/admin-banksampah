import AdminLayout from "../../../../../components/Layouts/AdminLayout";
import PembelianSampahForm from "../../../../../components/Forms/PembelianSampahForm";
import { useRouter } from "next/router";

export default function tambahJenisSampah({ sampahType, sampahPurchase }) {
    const router = useRouter();

    const onSubmit = async (data, items, nasabah) => {
        let dataToPost;

        if (nasabah._id) {
            dataToPost = {
                _nasabah: nasabah,
                transactionDate: data.transactionDate,
                transactionType: data.transactionType,
                items: [...items],
            };
        } else {
            dataToPost = {
                _nasabah: {
                    name: data.name,
                    address: data.address,
                    mobile: data.mobile,
                },
                transactionDate: data.transactionDate,
                transactionType: data.transactionType,
                items: [...items],
            };
        }

        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase/${sampahPurchase._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToPost),
            }
        ).then(async (res) => {
            router.push("/Admin/Gudang/HargaSampah");
        });
    };

    return (
        <AdminLayout>
            <div>
                <PembelianSampahForm
                    onSubmit={onSubmit}
                    title='Edit Pembelian Sampah'
                    sampahType={sampahType}
                    data={sampahPurchase}
                />
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
    );
    const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase/${params.id}`
    );
    const sampahType = await res.json();
    const sampahPurchase = await res2.json();
    return {
        props: {
            sampahType,
            sampahPurchase,
        },
    };
}
