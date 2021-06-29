import AdminLayout from "../../../../components/Layouts/AdminLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import * as Icons from "heroicons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function index() {
    const [items, setItems] = useState([]);
    const [month, setMonth] = useState("");

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const getItems = async (month = "") => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/stok?month=${month}`
        );
        const stok = await res.json();
        setItems(stok);
    };

    const currentDate = new Date().toJSON().slice(0, 7);

    const handleChange = (e) => {
        getItems(e.target.value);
    };

    useEffect(() => {
        getItems(currentDate);
        setMonth(currentDate);
    }, []);

    return (
        <AdminLayout>
            <div>
                <h1 className='text-4xl inline-block'>
                    Rekap Pembelian Sampah
                </h1>
                <div className='float-right flex space-x-2'>
                    <input
                        type='month'
                        className='border px-2'
                        defaultValue={currentDate}
                        onChange={handleChange}
                    />
                    <Link href={`/api/export/sampahMasuk?month=${month}`}>
                        <a
                            role='button'
                            target='_blank'
                            className='px-4 mr-2 inline-block align-top focus:outline-none shadow-md bg-blue-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-blue-500 hover:bg-white hover:text-blue-500 focus:ring-blue-500 focus:bg-white focus:text-blue-500 '
                        >
                            Export
                        </a>
                    </Link>
                </div>
            </div>
            <div className='mt-5'>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHead>
                            <TableCol>Jenis Sampah</TableCol>
                            <TableCol>Kategori</TableCol>
                            <TableCol>Quantity</TableCol>
                            <TableCol>Harga Beli</TableCol>
                        </TableHead>
                        <TableBody>
                            {items.map((stok) => {
                                return (
                                    <TableRow key={stok._id}>
                                        <TableCell>{stok.type}</TableCell>
                                        <TableCell>{stok.category}</TableCell>
                                        <TableCell>
                                            {stok.cashQty > 0 ? (
                                                <div className='text-red-500'>
                                                    {stok.cashQty} {stok.denom}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {stok.tabungQty > 0 ? (
                                                <div className='text-green-500'>
                                                    {stok.tabungQty}{" "}
                                                    {stok.denom}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {stok.cashQty > 0 ? (
                                                <div className='text-red-500'>
                                                    {formatRp(stok.cashPrice)}{" "}
                                                    CASH
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {stok.tabungQty > 0 ? (
                                                <div className='text-green-500'>
                                                    {formatRp(stok.tabungPrice)}{" "}
                                                    TABUNG
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
