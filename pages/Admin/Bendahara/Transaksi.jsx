import { useState } from "react";
import { useRouter } from "next/router";
import { formatRp, toQueryString } from "@helpers/functions";

import Link from "next/link";
import Head from "next/head";

import * as Icons from "heroicons-react";
import Prompt from "@components/Modals/Prompt";
import Layout from "@components/Layouts/BhrLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import DateRangeFilter from "@components/DateRangeFilter";
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

export default function Transaksi({ data }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [detailNasabahModal, setDetailNasabahModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [row, setRow] = useState({});

  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
  );

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction/${row._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "CANCELED" }),
      }
    ).then(async (res) => {
      if (res.status == 200) {
        setDeleteRowModal(!deleteRowModal);
        router.replace(router.asPath);
      }
    });
  };

  const confirmHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction/${row._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "SUCCESS" }),
      }
    ).then(async (res) => {
      if (res.status == 200) {
        setConfirmModal(!confirmModal);
        router.replace(router.asPath);
      }
    });
  };

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Batalan Transaksi'
        buttonText='Ya'
        confirm='Anda yakin ingin membatalkan Transaksi'
        show={deleteRowModal}
        toggleShow={() => setDeleteRowModal(!deleteRowModal)}
        onDelete={deleteHandler}
      />
      <Prompt
        title='Konfirmasi ?'
        show={confirmModal}
        toggleShow={() => setConfirmModal(!confirmModal)}
        onConfirm={confirmHandler}
      />
      <Head>
        <title>Transaksi Tabungan - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Transaksi Tabungan</h1>
        <div className='float-right flex space-x-2'>
          {/* <Link href={router.pathname + "/tambah"}>
            <a
              role='button'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
            >
              <Icons.Plus className='inline-block align-middle mr-2' />
              <span className='align-middle'>Tambah Nasabah</span>
            </a>
          </Link> */}
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "Tanggal Transaksi", value: "createdAt" },
              { label: "Nominal", value: "amount" },
            ]}
          />
          <TableFilter
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filterField={[
              {
                selectLabel: "Tipe Transaksi",
                field: "transactionType",
                options: [
                  {
                    label: "DEBIT",
                    value: "DEBIT",
                  },
                  {
                    label: "KREDIT",
                    value: "KREDIT",
                  },
                ],
              },
              {
                selectLabel: "Status",
                field: "status",
                options: [
                  {
                    label: "SUCCESS",
                    value: "SUCCESS",
                  },
                  {
                    label: "PENDING",
                    value: "PENDING",
                  },
                  {
                    label: "CANCELED",
                    value: "CANCELED",
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
            />
          </TableFilter>
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Tanggal Transaksi</TableCol>
              <TableCol>No. Transaksi</TableCol>
              <TableCol>No. Rekening</TableCol>
              <TableCol>Nama Nasabah</TableCol>
              <TableCol>Tipe</TableCol>
              <TableCol>Nominal</TableCol>
              <TableCol>Keterangan</TableCol>
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
                      setDetailNasabahModal(!detailNasabahModal);
                    }}
                    className=''
                  >
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item._nasabah.rekening}</TableCell>
                    <TableCell>{item._nasabah.name}</TableCell>
                    <TableCell
                      className={
                        item.transactionType == "KREDIT"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {item.transactionType}
                    </TableCell>
                    <TableCell
                      className={
                        item.transactionType == "KREDIT"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {formatRp(item.amount)}
                    </TableCell>
                    <TableCell>
                      {item._sampahTransaction ? "Tabung Sampah" : item.note}
                    </TableCell>
                    <TableCell
                      className={
                        item.status == "PENDING"
                          ? "text-yellow-500"
                          : item.status == "SUCCESS"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {item.status}
                    </TableCell>
                    <TableCell className='text-right'>
                      {item.status == "PENDING" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRow(item);
                              setConfirmModal(!confirmModal);
                            }}
                            className='bg-green-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                          >
                            <Icons.Check className='inline-block align-middle mr-2' />
                            <span className='align-middle'>KONFIRMASI</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRow(item);
                              setDeleteRowModal(!deleteRowModal);
                            }}
                            className='bg-red-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                          >
                            <Icons.X className='inline-block align-middle mr-2' />
                            <span className='align-middle'>BATALKAN</span>
                          </button>
                        </>
                      )}
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction?limit=${limit}&page=${page}&${queryString}`
  );
  const data = await fetch1.json();

  return {
    props: {
      data,
    },
  };
}
