import AdminLayout from "../../../../components/Layouts/AdminLayout";
import PembelianSampahForm from "../../../../components/Forms/PembelianSampahForm";
import { useRouter } from "next/router";

export default function tambahJenisSampah({ sampahType }) {
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

        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToPost),
        }).then(async (res) => {
            router.push("/Admin/Gudang/PembelianSampah");
        });
    };

    return (
        <AdminLayout>
            <div>
                <PembelianSampahForm
                    onSubmit={onSubmit}
                    title='Tambah Pembelian Sampah'
                    sampahType={sampahType}
                />
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
    );
    const sampahType = await res.json();
    return {
        props: {
            sampahType,
        },
    };
}
