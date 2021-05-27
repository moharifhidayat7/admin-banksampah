import { useEffect, useState } from "react";
import TambahNasabahModal from "../../../../components/Modals/TambahNasabahModal";
import BhrLayout from "../../../../components/Layouts/BhrLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import * as Icons from "heroicons-react";

function Nasabah({ nasabah }) {
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([]);

    const getItems = async () => {
        const res = await fetch("http://localhost:3000/api/bankTransaction");
        const json = await res.json();
        setItems(json);
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <BhrLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'>Detail Nasabah</h1>
            </div>
            <div className='flex sm:flex-row flex-col'>
                <div className='md:w-96'>
                    <img
                        src='https://via.placeholder.com/300/150'
                        className='w-full'
                        alt='place'
                    />
                    <div className='bg-white rounded shadow mt-4 mb-4'>
                        <div className='border-gray-300 border-b p-5 grid gap-2'>
                            <div>
                                <div className='font-bold'>NIK</div>
                                <div>{nasabah.nik}</div>
                            </div>
                            <div>
                                <div className='font-bold'>Nama</div>
                                <div>{nasabah.name}</div>
                            </div>
                            <div>
                                <div className='font-bold'>Alamat</div>
                                <div>{nasabah.address}</div>
                            </div>
                            <div>
                                <div className='font-bold'>Jenis Kelamin</div>
                                <div>{nasabah.gender}</div>
                            </div>
                            <div>
                                <div className='font-bold'>Email</div>
                                <div>{nasabah.email}</div>
                            </div>
                            <div>
                                <div className='font-bold'>No. HP</div>
                                <div>{nasabah.mobile}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:pl-5 w-full mb-8'>
                    <div className='text-2xl pb-4'>Saldo</div>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
                        <div className='bg-green-500 text-white rounded shadow border-b p-5'>
                            <div className='text-sm'>
                                Rekening ({nasabah.rekening})
                            </div>
                            <div className='text-xl font-bold'>
                                Rp. 50000000
                            </div>
                        </div>
                    </div>
                    <div className='text-2xl py-4'>Transaksi Terakhir</div>
                    <Table>
                        <TableHead>
                            <TableCol>Tanggal</TableCol>
                            <TableCol>Rekening</TableCol>
                            <TableCol>Jumlah</TableCol>
                            <TableCol>Keterangan</TableCol>
                            <TableCol>Tipe Transaksi</TableCol>
                            <TableCol></TableCol>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour12: false,
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {item._nasabah.rekening}
                                        </TableCell>
                                        <TableCell
                                            className={`${
                                                item.transactionType == "debet"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {`${
                                                item.transactionType == "debet"
                                                    ? "+ "
                                                    : "- "
                                            }`}
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(item.amount)}
                                        </TableCell>
                                        <TableCell>{item.note}</TableCell>
                                        <TableCell
                                            className={`${
                                                item.transactionType == "debet"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {item.transactionType}
                                        </TableCell>
                                        <TableCell className='float-right'>
                                            <button
                                                className={`hidden bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
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
            </div>
        </BhrLayout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        "http://localhost:3000/api/nasabahProfile/" + params.id
    );
    const nasabah = await res.json();
    return {
        props: {
            nasabah,
        },
    };
}

export default Nasabah;
