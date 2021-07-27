import PembelianForm from "@components/Forms/PembelianForm";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Head from "next/head";
import ContentBox from "@components/ContentBox";
import NavbarGudang from "@components/Navbar/NavbarGudang";
import PrintModal from "@components/Modals/PrintModal";

export default function PembelianSampah({ sampahType, sampahCategory }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(false);
  const [link, setLink] = useState("");
  const onSubmit = async (data, items) => {
    if (data._nasabah == "") {
      delete data._nasabah;
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction`, {
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
    }).then(async (res) => {
      if (res.status == 200) {
        const result = await res.json();
        alert("Pembelian Berhasil");
        setPrompt(!prompt);
        setLink(router.pathname + `/Pembelian/${result._id}`);
      } else {
        alert("Terjadi Kesalahan");
      }
    });
  };
  return (
    <div>
      <Head>
        <title>Beli Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <PrintModal
        title='Print'
        link={link}
        show={prompt}
        toggleShow={() => setPrompt(!prompt)}
      />
      <NavbarGudang />
      <div className='pb-24 pt-5 px-5'>
        <ContentBox title='Beli Sampah'>
          <ContentBox.Body>
            <PembelianForm
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
