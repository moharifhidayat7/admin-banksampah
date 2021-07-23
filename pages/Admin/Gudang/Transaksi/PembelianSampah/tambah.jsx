import Layout from "@components/Layouts/AdminLayout";
import PembelianForm from "@components/Forms/PembelianForm";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import Head from "next/head";
import ContentBox from "@components/ContentBox";

export default function PembelianSampah({ sampahType, sampahCategory }) {
  const router = useRouter();
  const onSubmit = async (data, items) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        items: items.map((item) => {
          return {
            _sampahType: item,
            qty: item.qty,
          };
        }),
      }),
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
        <title>Tambah Pembelian Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='pb-24'>
        <ContentBox title='Tambah Pembelian Sampah'>
          <ContentBox.Body>
            <PembelianForm
              onSubmit={onSubmit}
              sampahType={sampahType}
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

  const fetch1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
  );
  const sampahCategory = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
  );
  const sampahType = await fetch2.json();

  return {
    props: {
      session,
      sampahType,
      sampahCategory,
    },
  };
}
