import * as Icons from "heroicons-react";
import AdminLayout from "../../../../components/Layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import PenjualanSampahForm from "../../../../components/Forms/PenjualanSampahForm";
import { getSession } from "next-auth/client";
function Penjualan({ sampahType }) {
    const router = useRouter();
    const { register, handleSubmit, setValue, reset, errors } = useForm();
    const onSubmit = async (data, items) => {
        const postData = {
            ...data,
            items: items,
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahSale`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        }).then(async (res) => {
            reset();
            router.push("/Admin/Gudang/PenjualanSampah");
        });
    };
    return (
        <AdminLayout>
            <div>
                <PenjualanSampahForm
                    onSubmit={onSubmit}
                    sampahType={sampahType}
                    title='Tambah Penjualan Sampah'
                ></PenjualanSampahForm>
            </div>
        </AdminLayout>
    );
}

export default Penjualan;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
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
