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

export default function index({ sampahType }) {
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const delType = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${id}`,
            {
                method: "DELETE",
            }
        ).then(async (res) => {
            refreshData();
        });
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <AdminLayout>
            <h1 className='text-4xl'>Data Harga Sampah</h1>
            <div className='mt-5'>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHead>
                            <TableCol>Jenis Sampah</TableCol>
                            <TableCol>Kategori</TableCol>
                            <TableCol>Satuan</TableCol>
                            <TableCol>Harga</TableCol>
                            <TableCol className='text-center'></TableCol>
                        </TableHead>
                        <TableBody>
                            {sampahType.map((type) => {
                                return (
                                    <TableRow key={type._id}>
                                        <TableCell>{type.name}</TableCell>
                                        <TableCell>{type.category}</TableCell>
                                        <TableCell>{type.denom}</TableCell>
                                        <TableCell>
                                            {formatRp(type.price)}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <Link
                                                href={`/Admin/Gudang/HargaSampah/edit/${type._id}`}
                                            >
                                                <a
                                                    role='button'
                                                    className={`bg-blue-500 inline-block align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                                >
                                                    <Icons.Pencil />
                                                </a>
                                            </Link>
                                            <button
                                                className='bg-red-500 hover:bg-white align-middle shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                onClick={() =>
                                                    delType(type._id)
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
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
    );
    const sampahType = await res.json();

    return {
        props: {
            sampahType,
        },
    };
}
