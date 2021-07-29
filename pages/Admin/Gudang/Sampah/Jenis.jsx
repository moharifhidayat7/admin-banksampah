import { useState } from "react";
import Layout from "@components/Layouts/AdminLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import Link from "next/link";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import TableFilter from "@components/TableFilter";
import JenisModal from "@components/Modals/JenisModal";
import { getSession } from "next-auth/client";
import { formatRp, toQueryString } from "@helpers/functions";
import StokModal from "@components/Modals/StokModal";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";
import * as Icons from "heroicons-react";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Jenis({ data, sampahType, sampahCategory }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [jenisModal, setJenisModal] = useState(false);
  const [stokModal, setStokModal] = useState(false);
  const [row, setRow] = useState({});
  const [action, setAction] = useState("");

  const toggleJenisModal = () => {
    setJenisModal(!jenisModal);
  };

  const toggleStokModal = () => {
    setStokModal(!stokModal);
  };

  const typeOptions = sampahCategory.results.map((cat) => {
    return {
      label: cat.name,
      options: sampahType.results
        .filter((type) => type._category._id == cat._id)
        .map((el) => {
          return {
            label: el.name,
            value: el._id,
            ...el,
          };
        }),
    };
  });

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${row._id}`,
      {
        method: "DELETE",
      }
    ).then(async (res) => {
      setDeleteRowModal(!deleteRowModal);
      router.replace(router.asPath);
    });
  };

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Jenis Sampah'
        show={deleteRowModal}
        toggleShow={() => setDeleteRowModal(!deleteRowModal)}
        onDelete={deleteHandler}
      />
      <JenisModal
        data={row}
        title='Tambah Jenis'
        sampahCategory={sampahCategory}
        show={jenisModal}
        toggleShow={toggleJenisModal}
      />
      <StokModal
        action={action}
        data={row}
        title='Tambah Jenis'
        sampahType={typeOptions}
        show={stokModal}
        toggleShow={toggleStokModal}
      />
      <Head>
        <title>Jenis Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Jenis Sampah</h1>
        <div className='float-right flex space-x-2'>
          <button
            onClick={() => {
              setRow({});
              toggleJenisModal();
            }}
            type='button'
            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
          >
            <Icons.Plus className='inline-block align-middle mr-2' />
            <span className='align-middle'>Tambah Jenis Sampah</span>
          </button>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "Jenis Sampah", value: "name" },
              { label: "Harga", value: "price" },
              { label: "Stok", value: "stock" },
            ]}
          />
          <TableFilter
            filterField={[
              {
                selectLabel: "Kategori",
                field: "_category",
                options: sampahCategory.results.map((category) => {
                  return {
                    label: category.name,
                    value: category._id,
                  };
                }),
              },
            ]}
          ></TableFilter>
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Jenis Sampah</TableCol>
              <TableCol>Kategory</TableCol>
              <TableCol>Satuan</TableCol>
              <TableCol>Harga</TableCol>
              <TableCol>Stok</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {data.results.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    onClick={() => {
                      setRow(item);
                      toggleJenisModal();
                    }}
                    className='hover:bg-blue-100 cursor-pointer'
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item._category.name}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{formatRp(item.price)}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell className='text-right'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAction("IN");
                          setRow(item);
                          toggleStokModal();
                        }}
                        className='bg-green-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                      >
                        <div className='flex items-center px-2'>
                          <Icons.Plus />
                          <span className='font-bold'>STOK IN</span>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAction("OUT");
                          setRow(item);
                          toggleStokModal();
                        }}
                        className='bg-yellow-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-yellow-500 hover:text-yellow-500 focus:outline-none p-1 text-white'
                      >
                        <div className='flex items-center px-2'>
                          <Icons.Minus />
                          <span className='font-bold'>STOK OUT</span>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRow(item);
                          toggleJenisModal();
                        }}
                        className='bg-blue-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType?limit=${limit}&page=${page}&${queryString}`
  );
  const data = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory?sort=name`
  );
  const sampahCategory = await fetch2.json();

  const fetch3 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType?sort=name`
  );
  const sampahType = await fetch3.json();

  return {
    props: {
      data,
      sampahCategory,
      sampahType,
    },
  };
}
