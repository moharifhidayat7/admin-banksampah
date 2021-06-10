import BhrLayout from "../../../../components/Layouts/BhrLayout";
import NasabahForm from "../../../../components/Forms/NasabahForm";
import { useRouter } from "next/router";

export default function tambahNasabah() {
    const router = useRouter();

    const onSubmit = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }).then(async (res) => {
            router.push("/Admin/Bendahara/Nasabah");
        });
    };

    return (
        <BhrLayout>
            <div className='pb-24'>
                <NasabahForm onSubmit={onSubmit} title='Tambah Nasabah' />
            </div>
        </BhrLayout>
    );
}
