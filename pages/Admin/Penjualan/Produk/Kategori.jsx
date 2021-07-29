import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import * as Icons from "heroicons-react";

import { getSession } from "next-auth/client";
import { toQueryString } from "@helpers/functions";

import Layout from "@components/Layouts/PenjualanLayout";
import Pagination from "@components/Pagination";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import KategoriModal from "@components/Modals/KategoriProdukModal";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";

export default function Kategori({ data }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [kategoriModal, setKategoriModal] = useState(false);
  const [row, setRow] = useState({});

  const toggleKategoriModal = () => {
    setKategoriModal(!kategoriModal);
  };

  const toggleDeleteRowModal = () => {
    setDeleteRowModal(!deleteRowModal);
  };

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory/${row._id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.status == 200) {
        setDeleteRowModal(!deleteRowModal);
        router.replace(router.asPath);
      }
    });
  };

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Kategori'
        message='Data Harga Sampah juga akan ikut terhapus!'
        show={deleteRowModal}
        toggleShow={toggleDeleteRowModal}
        onDelete={deleteHandler}
      />
      <KategoriModal
        data={row}
        title='Tambah Kategori'
        show={kategoriModal}
        toggleShow={toggleKategoriModal}
      />
      <Head>
        <title>Kategori Produk - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Kategori Produk</h1>
        <div className='float-right flex space-x-2'>
          <button
            onClick={() => {
              setRow({});
              toggleKategoriModal();
            }}
            type='button'
            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
          >
            <Icons.Plus className='inline-block align-middle mr-2' />
            <span className='align-middle'>Tambah Kategori Produk</span>
          </button>
        </div>
      </div>
      <div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Nama Kategori</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {data.results.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    onClick={() => {
                      setRow(item);
                      toggleKategoriModal();
                    }}
                    className='hover:bg-blue-100 cursor-pointer'
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell className='text-right'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRow(item);
                          toggleKategoriModal();
                        }}
                        className='inline-block bg-blue-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                      >
                        <Icons.Pencil />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRow(item);
                          setDeleteRowModal(!deleteRowModal);
                        }}
                        className='bg-red-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                      >
                        <Icons.Trash />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className='flex flex-col sm:flex-row justify-between py-2 items-center'>
          <div className='flex flex-col sm:flex-row px-2 py-1 sm:flex-grow justify-between items-center'></div>
          <Pagination meta={data.meta} />
        </div>
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

  const limit = context.query.limit || 10;
  const page = context.query.page || 1;

  const queryString = toQueryString(context.query, ["page", "limit"]);

  const fetch1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory?sort=name&limit=${limit}&page=${page}&${queryString}`
  );
  const data = await fetch1.json();

  return {
    props: {
      data,
    },
  };
}
