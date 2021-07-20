import { useState } from "react";
import Layout from "@components/Layouts/AdminLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import Filter from "@components/Filter";
import Link from "next/link";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import TambahKategoriModal from "@components/Modals/TambahKategoriModal";
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
export default function HargaSampah({ data, sampahCategory }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [tambahKategoriModal, setTambahKategoriModal] = useState(false);
  const [row, setRow] = useState({});

  const sampahCategoryOption = sampahCategory.map((type) => {
    return { label: type.name, value: type._id };
  });

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${row._id}`,
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
      <TambahKategoriModal
        data={row}
        title='Tambah Kategori'
        show={tambahKategoriModal}
        setShow={setTambahKategoriModal}
      />
      <DeleteRowModal
        data={row}
        title='Hapus Jenis Sampah'
        show={deleteRowModal}
        setShow={setDeleteRowModal}
        onDelete={deleteHandler}
      />

      <Head>
        <title>Harga Sampah - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Harga Sampah</h1>
        <div className='float-right flex space-x-2'>
          <button
            onClick={() => {
              setTambahKategoriModal(!tambahKategoriModal);
            }}
            type='button'
            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
          >
            <Icons.Plus className='inline-block align-middle mr-2' />
            <span className='align-middle'>Tambah Kategori</span>
          </button>
          <Link href={router.pathname + "/tambah"}>
            <a
              role='button'
              className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
            >
              <Icons.Plus className='inline-block align-middle mr-2' />
              <span className='align-middle'>Tambah Jenis Sampah</span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort
            options={[
              { label: "Jenis Sampah", value: "name" },
              { label: "Harga", value: "price" },
              { label: "Kategori", value: "_category" },
            ]}
          />
          <Filter
            filterField={[
              {
                selectLabel: "Kategory ...",
                field: "_category",
                options: sampahCategoryOption,
              },
            ]}
          />
          <SearchFilter />
        </div>
        <div className='overflow-x-auto rounded-md'>
          <Table>
            <TableHead>
              <TableCol>Jenis Sampah</TableCol>
              <TableCol>Kategory</TableCol>
              <TableCol>Satuan</TableCol>
              <TableCol>Harga</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {data.total > 0 &&
                data.rows.map((item) => {
                  return (
                    <TableRow
                      key={item._id}
                      onClick={() => {
                        router.push(`${router.pathname}/edit/${item._id}`);
                      }}
                      className='hover:bg-blue-100 cursor-pointer'
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item._category.name}</TableCell>
                      <TableCell>{item.denom}</TableCell>
                      <TableCell>{formatRp(item.price)}</TableCell>
                      <TableCell className='text-right'>
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType?${queryString}`
  );
  const data = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`
  );
  const sampahCategory = await fetch2.json();

  return {
    props: {
      data,
      sampahCategory,
    },
  };
}
