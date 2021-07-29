import { useState } from "react";
import { useRouter } from "next/router";
import { toQueryString } from "@helpers/functions";
import Link from "next/link";
import Head from "next/head";

import * as Icons from "heroicons-react";

import Layout from "@components/Layouts/AdminLayout";
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
import DetailNasabahModal from "@components/Modals/NasabahModal";

import { getSession } from "next-auth/client";

export default function Nasabah({ data, accountType }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [detailNasabahModal, setDetailNasabahModal] = useState(false);
  const [row, setRow] = useState({});

  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
  );

  const accountTypeOption = accountType.results.map((type) => {
    return { label: type.code + " - " + type.name, value: type._id };
  });

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

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Nasabah'
        show={deleteRowModal}
        setShow={setDeleteRowModal}
        onDelete={deleteHandler}
      />
      <DetailNasabahModal
        data={row}
        title='Detail Nasabah'
        show={detailNasabahModal}
        setShow={setDetailNasabahModal}
        onDelete={() => setDeleteRowModal(!deleteRowModal)}
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
          <TableFilter
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filterField={[
              {
                selectLabel: "Jenis Kelamin",
                field: "gender",
                options: [
                  {
                    label: "Laki-Laki",
                    value: "L",
                  },
                  {
                    label: "Perempuan",
                    value: "P",
                  },
                ],
              },
              {
                selectLabel: "Golongan",
                field: "_accountType",
                options: accountTypeOption,
              },
            ]}
          >
            <DateRangeFilter
              label='Tanggal Pendaftaran'
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              field='createdAt'
            />
          </TableFilter>
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>No. Rekening</TableCol>
              <TableCol>NIK</TableCol>
              <TableCol>Nama</TableCol>
              <TableCol>Alamat</TableCol>
              <TableCol>L/P</TableCol>
              <TableCol>No. HP</TableCol>
              <TableCol>Golongan</TableCol>
              <TableCol>Tanggal Pendaftaran</TableCol>
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
                    className='cursor-pointer'
                  >
                    <TableCell>{item.rekening}</TableCell>
                    <TableCell>{item.nik}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                    <TableCell>{item._accountType.name}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className='text-right'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRow(item);
                          setDetailNasabahModal(!detailNasabahModal);
                        }}
                        className='bg-green-500 align-middle hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                      >
                        <Icons.Eye />
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
            {/* <span>
              Menampilkan: {data.start} - {data.end} dari {data.total} item
            </span>
            <span>
              Halaman: {data.page} dari {data.maxPage}
            </span> */}
          </div>
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile?limit=${limit}&page=${page}&${queryString}`
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
