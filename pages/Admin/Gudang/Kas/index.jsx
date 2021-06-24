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

export default function index() {
    const [items, setItems] = useState([]);

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const getItems = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/transfer?to=Gudang`
        );
        const stok = await res.json();
        setItems(stok);
    };
    const getTotal = (index) => {
        const sliced = items.slice(index, items.length);
        return sliced.reduce((total, item) => {
            return total + item.amount;
        }, 0);
    };
    useEffect(() => {
        getItems();
    }, []);

    return (
        <AdminLayout>
            <div className='flex justify-between'>
                <h1 className='text-4xl'>Kas Gudang</h1>
                {/* <div className='float-right flex space-x-2'>
                    <input
                        type='month'
                        className='border px-2'
                        defaultValue={currentDate}
                        onChange={handleChange}
                    />
                </div> */}
            </div>
            <div className='mt-5'>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHead>
                            <TableCol className='w-32'>Tanggal</TableCol>
                            <TableCol>Keterangan</TableCol>
                            <TableCol className='w-36'>Nominal</TableCol>
                            <TableCol className='w-32'>Total</TableCol>
                        </TableHead>
                        <TableBody>
                            {items.map((stok, index) => {
                                return (
                                    <TableRow key={stok._id}>
                                        <TableCell>
                                            {new Date(
                                                stok.createdAt
                                            ).toLocaleString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>{stok.note}</TableCell>
                                        <TableCell className='text-green-500'>
                                            + {formatRp(stok.amount)}
                                        </TableCell>
                                        <TableCell className='text-green-500'>
                                            {formatRp(getTotal(index))}
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
