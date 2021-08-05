import React, { useState } from "react";
import Layout from "@components/Layouts/AdminLayout";
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

export default function PenjualanSampah({ rekapSampah, sampahCategory }) {
  const [categories, setCategories] = useState(sampahCategory.results);
  const [rekap, setRekap] = useState(rekapSampah);

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleChange = (e) => {
    setMonth(e.target.value);
    getData(e.target.value);
  };

  const getData = async (m) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/rekapSampah?month=${m}`
    );
    const json1 = await res.json();
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
    );
    const json2 = await res2.json();

    setCategories(json2.results);
    setRekap(json1);
  };

  return (
    <Layout>
      <Head>
        <title>Rekap Penjualan Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Rekap Penjualan Sampah</h1>
        <div className='float-right flex space-x-2'>
          <input
            type='month'
            className='form-input'
            value={month}
            onChange={handleChange}
          />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_HOST}/api/export/penjualan?month=${month}`}
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
              <TableCol colspan={4}>Jenis Sampah</TableCol>
              <TableCol className='text-center border'>Qty</TableCol>
              <TableCol className='text-center border'>Nominal</TableCol>
            </TableHead>
            <TableBody>
              {rekap.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <TableRow className='bg-gray-100 font-bold'>
                      <TableCell colspan={7}>
                        {categories.filter((cat) => cat._id == item._id)[0]
                          .name || "-"}
                      </TableCell>
                    </TableRow>
                    {item.type.map((type) => {
                      return (
                        <TableRow key={type._id}>
                          <TableCell colspan={6} className='pl-10'>
                            {type.name}
                          </TableCell>
                          <TableCell className='text-center'>
                            {type.PENJUALAN.qty} {type.unit}
                          </TableCell>
                          <TableCell className='text-center'>
                            {formatRp(type.PENJUALAN.total)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/rekapSampah`
  );
  const rekapSampah = await res.json();
  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
  );
  const sampahCategory = await res2.json();

  return {
    props: {
      rekapSampah,
      sampahCategory,
    },
  };
}
