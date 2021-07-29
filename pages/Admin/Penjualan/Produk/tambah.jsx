import Layout from "@components/Layouts/PenjualanLayout";
import ContentBox from "@components/ContentBox";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";

import Head from "next/head";
import ProductForm from "@components/Forms/ProductForm";

export default function tambahNasabah({ productCategory }) {
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
          _picture: result._id,
          ...data,
        };
      }
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => {
      if (res.status == 200) {
        router.push(router.pathname.split("/").slice(0, -1).join("/"));
      }
      if (res.status == 500) {
        alert("ewrror");
      }
    });
  };

  return (
    <Layout>
      <Head>
        <title>Tambah Produk - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='pb-24'>
        <ContentBox title='Tambah Produk'>
          <ContentBox.Body>
            <ProductForm
              onSubmit={onSubmit}
              image={image}
              setImage={setImage}
              productCategory={productCategory}
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory?sort=name`
  );
  const productCategory = await fetch2.json();

  return {
    props: {
      productCategory,
    },
  };
}
