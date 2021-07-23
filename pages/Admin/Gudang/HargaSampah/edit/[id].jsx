import Layout from "@components/Layouts/AdminLayout";
import HargaSampahForm from "@components/Forms/HargaSampahForm";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Head from "next/head";
import ContentBox from "@components/ContentBox";

export default function tambahJenisSampah({ sampahCategory, sampahType }) {
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
      } else {
        alert("Terjadi Kesalahan");
      }
    });
  };
  return (
    <Layout>
      <Head>
        <title>Edit Jenis Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='pb-24'>
        <ContentBox title='Edit Jenis Sampah'>
          <ContentBox.Body>
            <HargaSampahForm
              onSubmit={onSubmit}
              data={sampahType}
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${context.params.id}`
  );
  const sampahType = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
  );
  const sampahCategory = await fetch2.json();

  return {
    props: {
      session,
      sampahCategory,
      sampahType,
    },
  };
}
