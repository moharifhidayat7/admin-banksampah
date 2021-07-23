import Layout from "@components/Layouts/BhrLayout";
import ContentBox from "@components/ContentBox";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";

import Head from "next/head";
import NasabahForm from "@components/Forms/NasabahForm";

export default function editNasabah({ accountType, nasabahProfile }) {
  const router = useRouter();

  const [image, setImage] = useState({});

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/uploads`,
      {
        method: "POST",
        body: formData,
      }
    );
    return result.json();
  };

  const onSubmit = async (data) => {
    let postData = data;
    if (image.raw) {
      const result = await uploadFile(image.raw);
      if (result._id) {
        postData = {
          ktp: result._id,
          ...data,
        };
      }
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${nasabahProfile._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    ).then((res) => {
      if (res.status == 200) {
        router.push(router.pathname.split("/").slice(0, -2).join("/"));
      }
      if (res.status == 500) {
        alert("ewrror");
      }
    });
  };

  return (
    <Layout>
      <Head>
        <title>Edit Nasabah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='pb-24'>
        <ContentBox title='Edit Nasabah'>
          <ContentBox.Body>
            <NasabahForm
              onSubmit={onSubmit}
              data={nasabahProfile}
              image={image}
              setImage={setImage}
              accountType={accountType}
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${context.params.id}`
  );
  const nasabahProfile = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType`
  );
  const accountType = await fetch2.json();

  return {
    props: {
      nasabahProfile,
      accountType,
    },
  };
}
