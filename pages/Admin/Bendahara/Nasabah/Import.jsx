import Layout from "@components/Layouts/BhrLayout";
import ContentBox from "@components/ContentBox";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useState } from "react";

export default function Import({ accountType }) {
  const [id, setId] = useState("");
  const [file, setFile] = useState({});

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/import/${id}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (result.status == 200) {
      alert("Import Berhasil");
    } else {
      alert("Gagal");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Import Nasabah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='pb-24'>
        <ContentBox title='Import Nasabah'>
          <ContentBox.Body>
            <div className='w-full sm:w-full md:w-1/3 m-auto'>
              <div>
                <label className='inline-flex items-center pb-2'>
                  Golongan
                </label>
                <select
                  defaultValue=''
                  onChange={(e) => setId(e.target.value)}
                  className='pb-2 w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
                >
                  {accountType.results.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        ({item.code}) {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className='inline-flex items-center pb-2 w-full'>
                  File
                </label>
                <label className='pb-2 w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'>
                  <input
                    type='file'
                    clasName='w-full'
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
              <div className='pt-3'>
                <a
                  className='text-blue-500 hover:underline'
                  target='_blank'
                  href='https://github.com/moharifhidayat7/excel-template/raw/main/import.xlsx'
                >
                  Download Contoh File Excel
                </a>
              </div>
              <div className='py-2 flex justify-end'>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType`
  );
  const accountType = await res.json();

  return {
    props: {
      accountType,
    },
  };
}
