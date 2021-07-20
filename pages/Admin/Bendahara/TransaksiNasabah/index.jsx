import { useEffect, useState } from "react";
import Layout from "@components/Layouts/BhrLayout";
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
import { useRouter } from "next/router";

export default function TransaksiNasabah({ nasabahProfile, accountType }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [row, setRow] = useState({});

  const accountTypeOption = accountType.map((type) => {
    return { label: type.name, value: type._id };
  });

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        show={deleteRowModal}
        setShow={setDeleteRowModal}
      />
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Data Nasabah</h1>
        <div className='float-right flex space-x-2'>
          <Link href='/Admin/Bendahara/Nasabah/tambah'>
            <a
              role='button'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
            >
              Tambah Nasabah
            </a>
          </Link>
        </div>
      </div>
      <div className='mt-2'>
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
                selectLabel: "Keanggotaan ...",
                field: "_accountType",
                options: accountTypeOption,
              },
            ]}
          />
          <DateRangeFilter />
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
              <TableCol>Keanggotaan</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {nasabahProfile.total > 0 &&
                nasabahProfile.rows.map((item) => {
                  return (
                    <TableRow
                      key={item._id}
                      handleClick={() => {
                        router.push(`${router.pathname}/${item._id}`);
                      }}
                    >
                      <TableCell>{item.rekening}</TableCell>
                      <TableCell>{item.nik}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.mobile}</TableCell>
                      <TableCell>{item._accountType.name}</TableCell>
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
        <div className='flex justify-between mt-5 items-center'>
          <div className='px-2 py-1'>
            <span>
              Menampilkan: {nasabahProfile.start} - {nasabahProfile.end} dari{" "}
              {nasabahProfile.total} item
            </span>
          </div>
          <Pagination
            page={nasabahProfile.page}
            pageRange={5}
            maxPage={nasabahProfile.maxPage}
            start={nasabahProfile.start}
            end={nasabahProfile.end}
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
  const nasabahProfile = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType`
  );
  const accountType = await fetch2.json();

  return {
    props: {
      nasabahProfile,
      accountType,
    },
  };
}
