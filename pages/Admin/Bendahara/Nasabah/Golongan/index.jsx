import { useState } from "react";
import Layout from "@components/Layouts/BhrLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import Link from "next/link";
import DateRangeFilter from "@components/DateRangeFilter";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import { getSession } from "next-auth/client";
import TableFilter from "@components/TableFilter";
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
import TambahGolonganModal from "@components/Modals/TambahGolonganModal";

export default function Golongan({ data, accountType }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [tambahGolonganModal, setTambahGolonganModal] = useState(false);
  const [row, setRow] = useState({});

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType/${row._id}`,
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
        title='Hapus Golongan'
        message='Data Nasabah juga akan ikut terhapus!'
        show={deleteRowModal}
        setShow={setDeleteRowModal}
        onDelete={deleteHandler}
      />
      <TambahGolonganModal
        data={row}
        title='Tambah Golongan'
        show={tambahGolonganModal}
        setShow={setTambahGolonganModal}
      />
      <Head>
        <title>Golongan - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Golongan</h1>
        <div className='float-right flex space-x-2'>
          <button
            onClick={() => {
              setRow({});
              setTambahGolonganModal(!tambahGolonganModal);
            }}
            type='button'
            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
          >
            <Icons.Plus className='inline-block align-middle mr-2' />
            <span className='align-middle'>Tambah Golongan</span>
          </button>
        </div>
      </div>
      <div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol className='w-32'>Kode</TableCol>
              <TableCol>Nama Golongan</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {data.total > 0 &&
                data.rows.map((item) => {
                  return (
                    <TableRow
                      key={item._id}
                      onClick={() => {
                        setRow(item);
                        setTambahGolonganModal(!tambahGolonganModal);
                      }}
                      className='hover:bg-blue-100 cursor-pointer'
                    >
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className='text-right'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRow(item);
                            setTambahGolonganModal(!tambahGolonganModal);
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
          <div className='flex flex-col sm:flex-row px-2 py-1 sm:flex-grow justify-between items-center'>
            <span>
              Menampilkan: {data.start} - {data.end} dari {data.total} item
            </span>
            <span>
              Halaman: {data.page} dari {data.maxPage}
            </span>
          </div>
          <Pagination
            page={data.page}
            pageRange={5}
            maxPage={data.maxPage}
            start={data.start}
            end={data.end}
          />
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

  const queryString = Object.keys(context.query)
    .map((key) => {
      if (key == "limit" || key == "sort") {
        return;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        context.query[key]
      )}`;
    })
    .join("&");

  const fetch1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType?limit=${limit}&sort=code&${queryString}`
  );
  const data = await fetch1.json();

  return {
    props: {
      data,
    },
  };
}
