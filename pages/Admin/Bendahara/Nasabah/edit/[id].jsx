import BhrLayout from "../../../../../components/Layouts/BhrLayout";
import NasabahForm from "../../../../../components/Forms/NasabahForm";
import { useRouter } from "next/router";

export default function editNasabah({ nasabahProfile }) {
    const router = useRouter();

    const onSubmit = async (data) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${nasabahProfile._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            router.push("/Admin/Bendahara/Nasabah");
        });
    };

    return (
        <BhrLayout>
            <div className='pb-24'>
                <NasabahForm
                    onSubmit={onSubmit}
                    data={nasabahProfile}
                    title='Edit Nasabah'
                />
            </div>
        </BhrLayout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${params.id}`
    );
    const nasabahProfile = await res.json();
    return {
        props: {
            nasabahProfile,
        },
    };
}
