import { useState } from "react";
import Layout from "@components/Layouts/BhrLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import TableFilter from "@components/TableFilter";
import Link from "next/link";
import DateRangeFilter from "@components/DateRangeFilter";
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
import Head from "next/head";

export default function PembelianSampah({ data }) {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
  );

  return (
    <Layout>
      <Head>
        <title>Transaksi Gudang - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Transaksi Gudang</h1>
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
                  {
                    label: "PENJUALAN",
                    value: "PENJUALAN",
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
              <TableCol>Penjual/Pembeli</TableCol>
              <TableCol>Keterangan</TableCol>
              <TableCol className='w-32'>Tipe Transaksi</TableCol>
              <TableCol className='w-32'>Total</TableCol>
              <TableCol className='w-40'></TableCol>
            </TableHead>
            <TableBody>
              {data.results.map((item) => {
                return (
                  <TableRow key={item._id} className=''>
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
                        item.transactionType == "PENJUALAN"
                          ? "text-green-500"
                          : item.transactionType == "TABUNG"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {item.transactionType}
                    </TableCell>
                    <TableCell
                      className={
                        item.transactionType == "PENJUALAN"
                          ? "text-green-500"
                          : item.transactionType == "TABUNG"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {formatRp(item.total)}
                    </TableCell>
                    <TableCell className='text-right'></TableCell>
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction?limit=${limit}&page=${page}&${queryString}`
  );
  const data = await result.json();

  return {
    props: {
      data,
    },
  };
}
