import { useState } from "react";
import Layout from "@components/Layouts/PenjualanLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import TableFilter from "@components/TableFilter";
import Link from "next/link";
import DateRangeFilter from "@components/DateRangeFilter";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import Prompt from "@components/Modals/Prompt";
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
  const [row, setRow] = useState({});
  const [confirmModal, setConfirmModal] = useState(false);
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
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/order/${row._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "CANCELED" }),
    }).then((res) => {
      if (res.status == 200) {
        toggleDeleteRowModal();
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
        title='Hapus Transaksi'
        show={deleteRowModal}
        toggleShow={toggleDeleteRowModal}
        onDelete={deleteHandler}
      />
      <Prompt
        title='Konfirmasi ?'
        show={confirmModal}
        toggleShow={() => setConfirmModal(!confirmModal)}
        onConfirm={confirmHandler}
      />
      <Head>
        <title>Transaksi Penjualan - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Data Transaksi Penjualan</h1>
        <div className='float-right flex space-x-2'></div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "No. Transaksi", value: "orderNo" },
              { label: "Tanggal Transaksi", value: "createdAt" },
            ]}
          />
          <TableFilter
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filterField={[
              {
                selectLabel: "Status Transaksi",
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
              <TableCol>No. Transaksi</TableCol>
              <TableCol>Tanggal</TableCol>
              <TableCol>Produk</TableCol>
              <TableCol>Total</TableCol>
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
                      toggleDetailPembelianModal();
                    }}
                    className='cursor-pointer'
                  >
                    <TableCell>{item.orderNo}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {item.items.map((prod) => {
                        return (
                          <div>
                            {prod.qty}x{prod._product.name}
                          </div>
                        );
                      })}
                    </TableCell>
                    <TableCell>{formatRp(item.total)}</TableCell>
                    <TableCell
                      className={
                        item.status == "SUCCESS"
                          ? "text-green-500"
                          : item.status == "PENDING"
                          ? "text-yellow-500"
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

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/order?limit=${limit}&page=${page}&${queryString}`
  );
  const data = await result.json();

  return {
    props: {
      data,
    },
  };
}
