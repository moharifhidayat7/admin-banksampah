import { useState } from "react";
import { useRouter } from "next/router";
import { toQueryString } from "@helpers/functions";

import Link from "next/link";
import Head from "next/head";

import * as Icons from "heroicons-react";

import Layout from "@components/Layouts/PenjualanLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import TableFilter from "@components/TableFilter";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";

import { getSession } from "next-auth/client";

export default function Nasabah({ data, productCategory }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [row, setRow] = useState({});

  const categoryOption = productCategory.results.map((type) => {
    return { label: type.name, value: type._id };
  });

  const deleteHandler = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product/${row._id}`, {
      method: "DELETE",
    }).then(async (res) => {
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
        title='Hapus Produk'
        show={deleteRowModal}
        toggleShow={() => setDeleteRowModal(!deleteRowModal)}
        onDelete={deleteHandler}
      />
      <Head>
        <title>Tambah Produk - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Data Produk</h1>
        <div className='float-right flex space-x-2'>
          <Link href={router.pathname + "/tambah"}>
            <a
              role='button'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
            >
              <Icons.Plus className='inline-block align-middle mr-2' />
              <span className='align-middle'>Tambah Produk</span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "Nama Produk", value: "name" },
              { label: "Harga", value: "price" },
            ]}
          />
          <TableFilter
            filterField={[
              {
                selectLabel: "Status",
                field: "status",
                options: [
                  {
                    label: "Online",
                    value: "Online",
                  },
                  {
                    label: "Offline",
                    value: "Offline",
                  },
                ],
              },
              {
                selectLabel: "Kategori",
                field: "_category",
                options: categoryOption,
              },
            ]}
          ></TableFilter>
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Info Produk</TableCol>
              <TableCol>Kategori</TableCol>
              <TableCol>Harga</TableCol>
              <TableCol>Stok</TableCol>
              <TableCol>Status</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {data.results.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    onClick={() => {
                      setRow(item);
                    }}
                    className=''
                  >
                    <TableCell>
                      <div className='inline-block align-middle'>
                        {item._picture && (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads/${item._picture}`}
                            alt='item'
                            className='w-20'
                          />
                        )}
                      </div>
                      <div className='inline-block align-top ml-5 w-96 h-16'>
                        <b>{item.name}</b>
                        <p className='line-clamp-3 my-1'>{item.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item._category.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className='text-right'>
                      <Link href={`${router.pathname}/edit/${item._id}`}>
                        <a
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`inline-block bg-blue-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                        >
                          <Icons.Pencil />
                        </a>
                      </Link>
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
          <div className='flex flex-col sm:flex-row px-2 py-1 sm:flex-grow justify-between items-center'>
            {/* <span>
              Menampilkan: {data.start} - {data.end} dari {data.total} item
            </span>
            <span>
              Halaman: {data.page} dari {data.maxPage}
            </span> */}
          </div>
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/product?limit=${limit}&page=${page}&${queryString}`
  );
  const data = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory?sort=name`
  );
  const productCategory = await fetch2.json();

  return {
    props: {
      data,
      productCategory,
    },
  };
}
