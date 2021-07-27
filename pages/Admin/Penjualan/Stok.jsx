import { useState } from "react";
import Layout from "@components/Layouts/PenjualanLayout";
import Pagination from "@components/Pagination";
import SearchFilter from "@components/SearchFilter";
import Sort from "@components/Sort";
import Link from "next/link";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import TableFilter from "@components/TableFilter";
import { getSession } from "next-auth/client";
import { toQueryString } from "@helpers/functions";
import StokModal from "@components/Modals/ProductStockModal";
import DateRangeFilter from "@components/DateRangeFilter";

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
export default function Stok({ data, product, productCategory }) {
  const router = useRouter();
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [stokModal, setStokModal] = useState(false);
  const [row, setRow] = useState({});
  const [action, setAction] = useState("");

  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
  );

  const toggleDeleteRowModal = () => {
    setDeleteRowModal(!deleteRowModal);
  };

  const toggleStokModal = () => {
    setStokModal(!stokModal);
  };

  const typeOptions = productCategory.results.map((cat) => {
    return {
      label: cat.name,
      options: product.results
        .filter((type) => type._category._id == cat._id)
        .map((el) => {
          return {
            label: el.name,
            value: el._id,
            ...el,
          };
        }),
    };
  });

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/productStock/${row._id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.status == 200) {
        setDeleteRowModal(!deleteRowModal);
        router.replace(router.asPath);
      }
    });
  };

  return (
    <Layout>
      <DeleteRowModal
        data={row}
        title='Hapus Stok'
        show={deleteRowModal}
        toggleShow={toggleDeleteRowModal}
        onDelete={deleteHandler}
      />
      <StokModal
        action={action}
        title='Stok'
        product={typeOptions}
        show={stokModal}
        toggleShow={toggleStokModal}
      />
      <Head>
        <title>Stok Produk - Bank Sampah Banyuwangi</title>
      </Head>
      <div className='border-b border-gray-400 pb-2 flex justify-between'>
        <h1 className='text-4xl'>Stok In/Out Produk</h1>
        <div className='float-right flex space-x-2'>
          <button
            onClick={() => {
              setAction("IN");
              toggleStokModal();
            }}
            type='button'
            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
          >
            <Icons.Plus className='inline-block align-middle mr-2' />
            <span className='align-middle'>Stok In</span>
          </button>
          <button
            onClick={() => {
              setAction("OUT");
              toggleStokModal();
            }}
            type='button'
            className='px-4 inline-block align-top focus:outline-none shadow-md bg-red-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500 focus:bg-white focus:text-red-500 '
          >
            <Icons.Minus className='inline-block align-middle mr-2' />
            <span className='align-middle'>Stok Out</span>
          </button>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2'>
          <Sort options={[{ label: "Tanggal", value: "createdAt" }]} />
          <TableFilter
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filterField={[
              {
                selectLabel: "Produk",
                field: "_product",
                options: product.results.map((type) => {
                  return {
                    label: type.name,
                    value: type._id,
                  };
                }),
              },
              {
                selectLabel: "Tipe Stok",
                field: "stockType",
                options: [
                  { label: "Stok In", value: "IN" },
                  { label: "Stock Out", value: "OUT" },
                ],
              },
            ]}
          >
            <DateRangeFilter
              label='Tanggal Stok'
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
              <TableCol>Tanggal</TableCol>
              <TableCol>Produk</TableCol>
              <TableCol>Tipe Stok</TableCol>
              <TableCol>Qty</TableCol>
              <TableCol>Keterangan</TableCol>
              <TableCol></TableCol>
            </TableHead>
            <TableBody>
              {data.results.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    className='hover:bg-blue-100 cursor-pointer'
                  >
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{item._product.name}</TableCell>
                    <TableCell
                      className={
                        item.stockType == "OUT"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {item.stockType}
                    </TableCell>
                    <TableCell
                      className={
                        item.stockType == "OUT"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {item.stockType == "OUT" && "-"}
                      {item.qty}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className='text-right'>
                      <button
                        onClick={(e) => {
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

  const queryString = toQueryString(context.query, ["page", "limit"]);

  const fetch1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/productStock?limit=${limit}&page=${page}&${queryString}`
  );
  const data = await fetch1.json();

  const fetch2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/product?sort=name`
  );
  const product = await fetch2.json();

  const fetch3 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory?sort=name`
  );
  const productCategory = await fetch3.json();

  return {
    props: {
      data,
      product,
      productCategory,
    },
  };
}
