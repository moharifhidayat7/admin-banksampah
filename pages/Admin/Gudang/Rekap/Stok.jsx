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

import { useRouter } from "next/router";

export default function index({ stok }) {
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <AdminLayout>
            <h1 className='text-4xl'>Rekap Pembelian Sampah</h1>
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
                            {stok.map((stok) => {
                                return (
                                    <TableRow key={stok._id}>
                                        <TableCell>{stok.type}</TableCell>
                                        <TableCell>{stok.category}</TableCell>
                                        <TableCell>
                                            {stok.qty} {stok.denom}
                                        </TableCell>
                                        <TableCell>
                                            {formatRp(stok.price)}
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

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/stok`);
    const stok = await res.json();

    return {
        props: {
            stok,
        },
    };
}
