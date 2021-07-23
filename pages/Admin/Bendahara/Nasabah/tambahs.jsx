import BhrLayout from "../../../../components/Layouts/BhrLayout";
import NasabahForm from "../../../../components/Forms/NasabahForm";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { storage } from "../../../../src/firebase";
import { getSession } from "next-auth/client";

export default function tambahNasabah() {
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
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(async (url) => {
                        setUrl(url);
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ ...data, ktp: url }),
                            }
                        ).then(async (res) => {
                            router.push("/Admin/Bendahara/Nasabah");
                        });
                    });
            }
        );
    };

    return (
        <BhrLayout>
            <div className='pb-24'>
                <NasabahForm
                    onSubmit={onSubmit}
                    handleChange={handleChange}
                    title='Tambah Nasabah'
                />
            </div>
        </BhrLayout>
    );
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
    return {
        props: {}
    }
}
