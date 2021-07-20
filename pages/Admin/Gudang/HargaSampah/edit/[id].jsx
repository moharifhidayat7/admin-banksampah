import AdminLayout from "../../../../../components/Layouts/AdminLayout";
import HargaSampahForm from "../../../../../components/Forms/HargaSampahForm";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
export default function tambahJenisSampah({ sampahType, sampahCategory }) {
  const router = useRouter();
  const onSubmit = async (data) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${sampahType._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => {
      if (res.status == 200) {
        router.push(router.pathname.split("/").slice(0, -2).join("/"));
      }
    });
  };
  return (
    <AdminLayout>
      <div>
        <HargaSampahForm
          onSubmit={onSubmit}
          data={sampahType}
          sampahCategory={sampahCategory}
          title='Edit Jenis Sampah'
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${context.params.id}`
  );
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
