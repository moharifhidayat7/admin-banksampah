import { useState } from "react";
import Layout from "@components/Layouts/AdminLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import Filter from "@components/Filter";
import Link from "next/link";
import DateRangeFilter from "@components/DateRangeFilter";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import { getSession } from "next-auth/client";
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
import TambahTipeAkunModal from "@components/Modals/TambahTipeAkunModal";
export default function PenjualanSampah({ data }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [tambahTipeAkunModal, setTambahTipeAkunModal] = useState(false);
  const [row, setRow] = useState({});

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${row._id}`,
      {
        method: "DELETE",
      }
    ).then(async (res) => {
      setDeleteRowModal(!deleteRowModal);
      router.replace(router.asPath);
    });
  };

  const formatRp = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Nasabah'
        show={deleteRowModal}
        setShow={setDeleteRowModal}
        onDelete={deleteHandler}
      />
      <TambahTipeAkunModal
        data={row}
        title='Tambah Tipe Akun'
        show={tambahTipeAkunModal}
        setShow={setTambahTipeAkunModal}
      />
      <Head>
        <title>Penjualan Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Penjualan Sampah</h1>
        <div className='float-right flex space-x-2'>
          <Link href={router.pathname + "/tambah"}>
            <a
              role='button'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
            >
              <Icons.Plus className='inline-block align-middle mr-2' />
              <span className='align-middle'>Tambah Penjualan Sampah</span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "Tanggal", value: "transactionDate" },
              { label: "Pembeli", value: "customer" },
            ]}
          />
          <DateRangeFilter title='Tanggal Transaksi' />
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol className='w-32'>Id</TableCol>
              <TableCol className='w-32'>Tanggal</TableCol>
              <TableCol>Pembeli</TableCol>
              <TableCol>Keterangan</TableCol>
              <TableCol className='w-32'>Jumlah</TableCol>
              <TableCol className='w-40'></TableCol>
            </TableHead>
            <TableBody>
              {data.total > 0 &&
                data.rows.map((item) => {
                  return (
                    <TableRow
                      key={item._id}
                      onClick={() => {
                        router.push(`${router.pathname}/${item._id}`);
                      }}
                      className='cursor-pointer'
                    >
                      <TableCell>{item._id}</TableCell>
                      <TableCell>
                        {new Date(item.transactionDate).toLocaleString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <div className='text-sm font-medium text-gray-700'>
                          {item.customer}
                        </div>
                        <div className='text-sm'>{item.address}</div>
                      </TableCell>
                      <TableCell>{item.note}</TableCell>
                      <TableCell className='text-green-500'>
                        {formatRp(
                          item.items.reduce((accumulator, currentValue) => {
                            return (
                              accumulator +
                              currentValue.buyerPrice * currentValue.qty
                            );
                          }, 0)
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Link href={`${router.pathname}/${item._id}`}>
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            role='button'
                            className={`inline-block align-middle bg-green-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white`}
                          >
                            <Icons.Eye />
                          </a>
                        </Link>
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

export async function getInitialProps(ctx) {
  return flash.get(ctx) || {};
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
      if (key == "limit") {
        return;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        context.query[key]
      )}`;
    })
    .join("&");

  const fetch1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahSale?limit=${limit}&${queryString}`
  );
  const data = await fetch1.json();

  return {
    props: {
      data,
    },
  };
}
