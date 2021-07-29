import Layout from "@components/Layouts/AdminLayout";
import HargaSampahForm from "@components/Forms/HargaSampahForm";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import Head from "next/head";
import ContentBox from "@components/ContentBox";

export default function tambahJenisSampah({ sampahCategory }) {
  const router = useRouter();
  const onSubmit = async (data) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        router.push(router.pathname.split("/").slice(0, -1).join("/"));
      } else {
        alert("Terjadi Kesalahan");
      }
    });
  };
  return (
    <Layout>
      <Head>
        <title>Tambah Jenis Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='pb-24'>
        <ContentBox title='Tambah Jenis Sampah'>
          <ContentBox.Body>
            <HargaSampahForm
              onSubmit={onSubmit}
              sampahCategory={sampahCategory}
            />
          </ContentBox.Body>
        </ContentBox>
      </div>
    </Layout>
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

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
  );
  const sampahCategory = await fetch2.json();

  return {
    props: {
      session,
      sampahCategory,
    },
  };
}
