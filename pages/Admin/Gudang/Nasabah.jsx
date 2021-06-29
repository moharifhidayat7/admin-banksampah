import { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import * as Icons from "heroicons-react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
export default function Nasabah({ nasabahProfile }) {
    const router = useRouter();
    return (
        <AdminLayout>
            <h1 className='text-4xl mb-5'>Data Nasabah</h1>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>No. Rekening</TableCol>
                        <TableCol>NIK</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol>Alamat</TableCol>
                        <TableCol>Jenis Kelamin</TableCol>
                        <TableCol>No. HP</TableCol>
                        <TableCol>Keanggotaan</TableCol>
                    </TableHead>

                    <TableBody>
                        {nasabahProfile.map((item) => {
                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item.rekening}</TableCell>
                                    <TableCell>{item.nik}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell>{item.gender}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.accountType}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
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
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile`
    );
    const nasabahProfile = await res.json();
    return {
        props: {
            nasabahProfile,
        },
    };
}
