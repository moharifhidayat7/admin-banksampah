import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Layouts/AdminLayout";
import * as Icons from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";

function Pembelian({ transactions }) {
    const [modal, setModal] = useState(false);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const delTransaction = async (id) => {
        await fetch("http://localhost:3000/api/sampahTransaction/" + id, {
            method: "DELETE",
        }).then((res) => {
            refreshData();
        });
    };

    return (
        <AdminLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'>
                    Pembelian Sampah Nasabah
                </h1>

                <div className='float-right'>
                    <Link href='Transaksi/penjualan'>
                        <a
                            role='button'
                            className='px-4 mr-2 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                        >
                            Jual Sampah
                        </a>
                    </Link>
                    <Link href='Transaksi/pembelian'>
                        <a
                            role='button'
                            className='px-4 inline-block align-top focus:outline-none shadow-md bg-red-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500 focus:bg-white focus:text-red-500 '
                        >
                            Beli Sampah
                        </a>
                    </Link>
                </div>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol className='w-32'>Tanggal</TableCol>
                        <TableCol>NIK</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol className='w-80'>Alamat</TableCol>
                        <TableCol className='hidden'>Tipe Transaksi</TableCol>
                        <TableCol>Tipe Transaksi</TableCol>
                        <TableCol>Item</TableCol>
                        <TableCol>Jumlah</TableCol>
                        <TableCol className='w-56'>Keterangan</TableCol>
                        <TableCol></TableCol>
                    </TableHead>

                    <TableBody>
                        {transactions.map((trx, index) => {
                            return (
                                <TableRow key={trx._id}>
                                    <TableCell>
                                        {new Date(
                                            trx.transactionDate
                                        ).toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>778887</TableCell>
                                    <TableCell>
                                        {trx.guest
                                            ? trx.guest.name
                                            : trx._nasabah
                                            ? trx._nasabah.name
                                            : "-"}
                                    </TableCell>
                                    <TableCell className='hidden'>
                                        {trx.guest
                                            ? trx.guest.address
                                            : trx._nasabah
                                            ? trx._nasabah.address
                                            : "-"}
                                    </TableCell>
                                    <TableCell
                                        className={
                                            trx.transactionType == "saving" ||
                                            trx.transactionType == "cash"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }
                                    >
                                        {trx.transactionType == "saving" ||
                                        trx.transactionType == "cash"
                                            ? "Pembelian Sampah"
                                            : trx.transactionType == "penjualan"
                                            ? "Penjualan Sampah"
                                            : "Pemasukan"}
                                    </TableCell>
                                    <TableCell>
                                        {trx.transactionType == "cash" ||
                                        trx.transactionType == "penjualan"
                                            ? "Tunai"
                                            : trx.transactionType == "saving"
                                            ? `Tabungan (${trx._nasabah.rekening})`
                                            : "Tunai"}
                                    </TableCell>
                                    <TableCell className='w-56'>
                                        {trx.items.map((item, index) => (
                                            <li key={index}>
                                                {item._sampahType.name}
                                            </li>
                                        ))}
                                    </TableCell>
                                    <TableCell
                                        className={
                                            trx.transactionType == "saving" ||
                                            trx.transactionType == "cash"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }
                                    >
                                        {trx.items.length > 0
                                            ? new Intl.NumberFormat("id-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                              }).format(
                                                  trx.items.reduce(
                                                      (tot, item) => {
                                                          return (
                                                              tot +
                                                              item.price *
                                                                  item.qty
                                                          );
                                                      },
                                                      0
                                                  )
                                              )
                                            : new Intl.NumberFormat("id-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                              }).format(trx.amount)}
                                    </TableCell>
                                    <TableCell>{trx.note}</TableCell>
                                    <TableCell className='float-right'>
                                        <button className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'>
                                            <Icons.Eye />
                                        </button>
                                        <button
                                            className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                            onClick={() =>
                                                delTransaction(trx._id)
                                            }
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
        </AdminLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/sampahTransaction");
    const transactions = await res.json();
    return {
        props: {
            transactions,
        },
    };
}

export default Pembelian;
