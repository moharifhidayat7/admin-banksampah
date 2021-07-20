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

export default function Nasabah({ data, accountType }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [row, setRow] = useState({});

  const accountTypeOption = accountType.map((type) => {
    return { label: type.code + " - " + type.name, value: type._id };
  });

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Data'
        show={deleteRowModal}
        setShow={setDeleteRowModal}
      />
      <Head>
        <title>Nasabah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Nasabah</h1>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "No. Rekening", value: "rekening" },
              { label: "NIK", value: "nik" },
              { label: "Nama", value: "name" },
              { label: "Tanggal Registrasi", value: "createdAt" },
            ]}
          />
          <Filter
            className='md:col-span-2'
            filterField={[
              {
                selectLabel: "Jenis Kelamin ...",
                field: "gender",
                options: [
                  {
                    label: "Laki-Laki",
                    value: "Laki-Laki",
                  },
                  {
                    label: "Perempuan",
                    value: "Perempuan",
                  },
                ],
              },
              {
                selectLabel: "Tipe Akun ...",
                field: "_accountType",
                options: accountTypeOption,
              },
            ]}
          />
          <DateRangeFilter title='Tanggal Pendaftaran' />
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Tanggal Pendaftaran</TableCol>
              <TableCol>No. Rekening</TableCol>
              <TableCol>NIK</TableCol>
              <TableCol>Nama</TableCol>
              <TableCol>Alamat</TableCol>
              <TableCol>L/P</TableCol>
              <TableCol>No. HP</TableCol>
              <TableCol>Tipe Akun</TableCol>
            </TableHead>
            <TableBody>
              {data.total > 0 &&
                data.rows.map((item) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{item.rekening}</TableCell>
                      <TableCell>{item.nik}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.mobile}</TableCell>
                      <TableCell>{item._accountType.name}</TableCell>
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
      if (key == "limit") {
        return;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        context.query[key]
      )}`;
    })
    .join("&");

  const fetch1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile?limit=${limit}&${queryString}`
  );
  const data = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType`
  );
  const accountType = await fetch2.json();

  return {
    props: {
      data,
      accountType,
    },
  };
}
