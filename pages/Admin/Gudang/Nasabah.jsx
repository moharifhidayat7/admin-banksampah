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

function Nasabah() {
    const [items, setItems] = useState([]);
    const getItems = async () => {
        const res = await fetch("http://localhost:3000/api/nasabahProfile");
        const json = await res.json();

        setItems(json);
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <AdminLayout>
            <h1 className='text-4xl mb-5'>Nasabah</h1>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>No. Rekening</TableCol>
                        <TableCol>NIK</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol>Alamat</TableCol>
                        <TableCol>L/P</TableCol>
                        <TableCol>No. HP</TableCol>
                        <TableCol>Keanggotaan</TableCol>
                    </TableHead>

                    <TableBody>
                        {items.map((item, index) => {
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

export default Nasabah;
