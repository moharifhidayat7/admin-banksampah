import AdminLayout from "@components/Layouts/AdminLayout";
import PembelianSampahForm from "@components/Forms/PembelianSampahForm";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
export default function tambahJenisSampah({ sampahType, sampahCategory }) {
  const router = useRouter();

  const onSubmit = async (data) => {
    let dataToPost;

    if (data.nasabah.__isNew__) {
      dataToPost = {
        customer: {
          name: data.nasabah.value,
        },
        ...data,
      };
    } else if (data.nasabah._id) {
      dataToPost = {
        _nasabah: data.nasabah.value,
        ...data,
      };
    } else {
      dataToPost = {
        ...data,
      };
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    }).then(async (res) => {
      router.push(router.pathname.split("/").slice(0, -1).join("/"));
    });
  };

  return (
    <AdminLayout>
      <div>
        <PembelianSampahForm
          onSubmit={onSubmit}
          title='Tambah Pembelian Sampah'
          sampahType={sampahType}
          sampahCategory={sampahCategory}
        />
      </div>
    </AdminLayout>
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`);
  const sampahType = await res.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
  );
  const sampahCategory = await fetch2.json();

  return {
    props: {
      sampahType,
      sampahCategory,
    },
  };
}
