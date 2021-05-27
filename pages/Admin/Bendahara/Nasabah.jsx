import { useEffect, useState } from "react";
import TambahNasabahModal from "../../../components/Modals/TambahNasabahModal";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import Link from "next/link";

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
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([]);
    const [edit, setEdit] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const getItems = async () => {
        const res = await fetch("http://localhost:3000/api/nasabahProfile");
        const json = await res.json();
        setItems(json);
    };

    const delItems = async (id) => {
        await fetch("http://localhost:3000/api/nasabahProfile/" + id, {
            method: "DELETE",
        }).then((res) => getItems());
    };

    const handleEdit = (item) => {
        setEdit(item);
        toggleModal();
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <BhrLayout>
            <TambahNasabahModal
                modal={modal}
                toggleModal={toggleModal}
                getItems={getItems}
                setEdit={setEdit}
                edit={edit}
            />
            <div>
                <h1 className='text-4xl mb-5 inline-block'>Nasabah</h1>

                <button
                    type='button'
                    className='px-4 inline-block align-top float-right focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                    onClick={toggleModal}
                >
                    Tambah Data
                </button>
            </div>
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
                        <TableCol></TableCol>
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
                                    <TableCell className='float-right'>
                                        <Link href={`Nasabah/${item._id}`}>
                                            <a
                                                role='button'
                                                className={`inline-block align-bottom bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white`}
                                            >
                                                <Icons.Eye />
                                            </a>
                                        </Link>
                                        <button
                                            className={`bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white ${
                                                edit._id == item._id
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Icons.Pencil />
                                        </button>
                                        <button
                                            className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                            onClick={() => {
                                                delItems(item._id);
                                            }}
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
        </BhrLayout>
    );
}
export default Nasabah;
