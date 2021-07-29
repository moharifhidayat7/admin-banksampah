import PenjualanForm from "@components/Forms/PenjualanForm";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import Head from "next/head";
import ContentBox from "@components/ContentBox";
import NavbarGudang from "@components/Navbar/NavbarGudang";

export default function PembelianSampah({ sampahType, sampahCategory }) {
  const router = useRouter();
  const onSubmit = async (data, items) => {
    if (items.length == 0) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        transactionType: "PENJUALAN",
        items: items.map((item) => {
          return {
            _sampahType: item,
            qty: item.qty,
            price: item.buyerPrice,
          };
        }),
      }),
    }).then((res) => {
      if (res.status == 200) {
        alert("Penjualan Berhasil");
      } else {
        alert("Terjadi Kesalahan");
      }
    });
  };
  return (
    <div>
      <Head>
        <title>Jual Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <NavbarGudang />
      <div className='pb-24 pt-5 px-5'>
        <ContentBox title='Jual Sampah'>
          <ContentBox.Body>
            <PenjualanForm
              onSubmit={onSubmit}
              sampahType={sampahType}
              sampahCategory={sampahCategory}
            />
          </ContentBox.Body>
        </ContentBox>
      </div>
    </div>
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory?sort=name`
  );
  const sampahCategory = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType?sort=name`
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
