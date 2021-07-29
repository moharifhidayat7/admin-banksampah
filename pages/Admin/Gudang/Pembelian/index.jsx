import { useState } from "react";
import Layout from "@components/Layouts/AdminLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import TableFilter from "@components/TableFilter";
import Link from "next/link";
import DateRangeFilter from "@components/DateRangeFilter";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import DetailPembelianModal from "@components/Modals/DetailPembelianModal";
import { getSession } from "next-auth/client";
import { formatRp, toQueryString } from "@helpers/functions";
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

export default function PembelianSampah({ data }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [detailPembelianModal, setDetailPembelianModal] = useState(false);
  const [row, setRow] = useState({});

  const toggleDeleteRowModal = () => {
    setDeleteRowModal(!deleteRowModal);
  };

  const toggleDetailPembelianModal = () => {
    setDetailPembelianModal(!detailPembelianModal);
  };
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
  );

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction/${row._id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.status == 200) {
        toggleDeleteRowModal();
        router.replace(router.asPath);
      }
    });
  };

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Transaksi'
        message='Transaksi tabungan ke Bank juga akan terhapus'
        show={deleteRowModal}
        toggleShow={toggleDeleteRowModal}
        onDelete={deleteHandler}
      />
      <DetailPembelianModal
        title='Detail Tansaksi'
        data={row}
        show={detailPembelianModal}
        toggleShow={toggleDetailPembelianModal}
        onDelete={toggleDeleteRowModal}
      />
      <Head>
        <title>Pembelian Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Pembelian Sampah</h1>
        <div className='float-right flex space-x-2'>
          <Link
            href={
              router.pathname.split("/").slice(0, -1).join("/") +
              "/Transaksi/Beli"
            }
          >
            <a
              role='button'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
            >
              <Icons.Plus className='inline-block align-middle mr-2' />
              <span className='align-middle'>Tambah Pembelian Sampah</span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "No. Transaksi", value: "transactionNo" },
              { label: "Tanggal", value: "transactionDate" },
              { label: "Nasabah", value: "_nasabah" },
            ]}
          />
          <TableFilter
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filterField={[
              {
                selectLabel: "Jenis Transaksi",
                field: "transactionType",
                options: [
                  {
                    label: "TABUNG",
                    value: "TABUNG",
                  },
                  {
                    label: "CASH",
                    value: "CASH",
                  },
                ],
              },
            ]}
          >
            <DateRangeFilter
              label='Tanggal Transaksi'
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              field='transactionDate'
            />
          </TableFilter>
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol className='w-32'>No. Transaksi</TableCol>
              <TableCol className='w-32'>Tanggal</TableCol>
              <TableCol>Penjual/Nasabah</TableCol>
              <TableCol>Keterangan</TableCol>
              <TableCol className='w-32'>Tipe Transaksi</TableCol>
              <TableCol className='w-32'>Total</TableCol>
              <TableCol className='w-40'></TableCol>
            </TableHead>
            <TableBody>
              {data.results.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    onClick={() => {
                      setRow(item);
                      toggleDetailPembelianModal();
                    }}
                    className='cursor-pointer'
                  >
                    <TableCell>{item.transactionNo}</TableCell>
                    <TableCell>
                      {new Date(item.transactionDate).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {item._nasabah ? (
                        <>
                          <div className='text-sm font-medium text-gray-700'>
                            {item._nasabah.name}
                          </div>
                          <div className='text-sm'>{item._nasabah.address}</div>
                        </>
                      ) : (
                        <>
                          <div className='text-sm'>{item.customer}</div>
                        </>
                      )}
                    </TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell
                      className={
                        item.transactionType == "TABUNG"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {item.transactionType}
                    </TableCell>
                    <TableCell
                      className={
                        item.transactionType == "TABUNG"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {formatRp(item.total)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRow(item);
                          toggleDetailPembelianModal();
                        }}
                        className='bg-green-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                      >
                        <Icons.Eye />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRow(item);
                          toggleDeleteRowModal();
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
  const transactionType = context.query.transactionType || "!PENJUALAN";

  const queryString = toQueryString(context.query, [
    "page",
    "limit",
    "transactionType",
  ]);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction?limit=${limit}&transactionType=${transactionType}&page=${page}&${queryString}`
  );
  const data = await result.json();

  return {
    props: {
      data,
    },
  };
}
