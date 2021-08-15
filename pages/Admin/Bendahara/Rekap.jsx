import React, { useState } from "react";
import Layout from "@components/Layouts/BhrLayout";
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
import DatePicker from "react-datepicker";

export default function PenjualanSampah({ rekapPenarikan }) {
  const [rekap, setRekap] = useState(rekapPenarikan);

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleChange = (e) => {
    setMonth(e.target.value);
    getData(e.target.value);
  };

  const getData = async (m) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/rekapBank?month=${m}`
    );
    const json1 = await res.json();

    setRekap(json1);
  };

  return (
    <Layout>
      <Head>
        <title>Rekap Tabungan - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Rekap Tabungan</h1>
        <div className='float-right flex space-x-2'>
          <input
            type='month'
            className='form-input'
            value={month}
            onChange={handleChange}
          />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_HOST}/api/export/penarikan?month=${month}`}
          >
            <a
              role='button'
              target='_blank'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-yellow-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-yellow-500 hover:bg-white hover:text-yellow-500 focus:ring-yellow-500 focus:bg-white focus:text-yellow-500 '
            >
              <Icons.Printer className='inline-block align-middle mr-2' />
              <span className='align-middle'>Print</span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'></div>
        <div className='overflow-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Nasabah</TableCol>
              <TableCol>Alamat</TableCol>
              <TableCol className='text-right border w-52'>DEBIT</TableCol>
              <TableCol className='text-right border w-52'>KREDIT</TableCol>
            </TableHead>
            <TableBody>
              {rekap.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.nasabah.name}</TableCell>
                    <TableCell>{item.nasabah.address}</TableCell>
                    <TableCell className='text-right'>
                      {formatRp(item.DEBIT)}
                    </TableCell>
                    <TableCell className='text-right'>
                      {formatRp(item.KREDIT)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/rekapBank`);
  const rekapPenarikan = await res.json();

  return {
    props: {
      rekapPenarikan,
    },
  };
}
