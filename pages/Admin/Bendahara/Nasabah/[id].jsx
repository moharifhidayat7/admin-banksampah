import { useEffect, useState } from "react";
import TambahNasabahModal from "../../../../components/Modals/TambahNasabahModal";
import TransaksiBankModal from "../../../../components/Modals/TransaksiBankModal";

import BhrLayout from "../../../../components/Layouts/BhrLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import Link from "next/link";
import * as Icons from "heroicons-react";
import { useRouter } from "next/router";

function Nasabah({ nasabah }) {
    const router = useRouter();

    const [modalData, setModalData] = useState([]);
    const [modal, setModal] = useState(false);

    const [modalTitle, setmodalTitle] = useState("");

    const toggleModal = () => {
        setModal(!modal);
    };
    const refreshData = () => {
        router.replace(router.asPath);
    };

    const deleteHandler = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${id}`,
            {
                method: "DELETE",
            }
        ).then(async (res) => {
            router.replace("/Admin/Bendahara/Nasabah");
        });
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <BhrLayout>
            <TransaksiBankModal
                modal={modal}
                toggleModal={toggleModal}
                modalData={modalData}
                modalTitle={modalTitle}
            />
            <div className='flex justify-between'>
                <h1 className='text-2xl mb-5 inline-block'>
                    Detail Nasabah ({nasabah.name})
                </h1>
                <div>
                    <button
                        onClick={() =>
                            router.push(
                                `/Admin/Bendahara/Nasabah/edit/${nasabah._id}`
                            )
                        }
                        className='inline-block align-middle mr-2 px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                    >
                        <Icons.Pencil className='inline-block align-middle' />
                        <span className='align-middle'>Edit Nasabah</span>
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            deleteHandler(nasabah._id);
                        }}
                        className='align-middle px-3 bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                    >
                        <Icons.Trash className='inline-block align-middle' />
                        <span className='align-middle'>Hapus Nasabah</span>
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                    <img
                        src='https://via.placeholder.com/150'
                        className='w-full border'
                        alt='place'
                    />
                    <div className='bg-white rounded shadow grid grid-cols-1 md:gap-4'>
                        <div className='border-gray-300 p-5 grid gap-2'>
                            <div>
                                <div className='text-sm font-bold'>NIK</div>
                                <div>{nasabah.nik}</div>
                            </div>
                            <div>
                                <div className='text-sm font-bold'>Nama</div>
                                <div>{nasabah.name}</div>
                            </div>
                            <div>
                                <div className='text-sm font-bold'>Alamat</div>
                                <div>{nasabah.address}</div>
                            </div>
                            <div>
                                <div className='text-sm font-bold'>
                                    Jenis Kelamin
                                </div>
                                <div>{nasabah.gender}</div>
                            </div>
                            <div>
                                <div className='text-sm font-bold'>Email</div>
                                <div>{nasabah.email || "-"}</div>
                            </div>
                            <div>
                                <div className='text-sm font-bold'>No. HP</div>
                                <div>{nasabah.mobile}</div>
                            </div>
                            <div>
                                <div className='text-sm font-bold'>
                                    Tanggal Registrasi
                                </div>
                                <div>{formatDate(nasabah.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 mt-4 md:mt-0'>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='col-span-2 text-center bg-white rounded shadow border-b p-5'>
                                <div className='text-xs font-bold'>
                                    Total Saldo Rekening ({nasabah.rekening})
                                </div>
                                <div className='block text-xl font-bold text-blue-500'>
                                    {formatRp(5000000)}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setModalData(nasabah);
                                    setmodalTitle("Penarikan");
                                    toggleModal();
                                }}
                                className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                            >
                                <div className='inline-block pr-2 align-middle'>
                                    <Icons.Minus />
                                </div>
                                <span className='inline-block align-middle'>
                                    Penarikan
                                </span>
                            </button>
                            <button
                                onClick={() => {
                                    setModalData(nasabah);
                                    setmodalTitle("Pemasukan");
                                    toggleModal();
                                }}
                                className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                            >
                                <div className='inline-block pr-2 align-middle'>
                                    <Icons.Plus />
                                </div>
                                <span className='inline-block align-middle'>
                                    Pemasukan
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='text-xl py-4'>Transaksi Terakhir</div>
                    <Table>
                        <TableHead>
                            <TableCol>Tanggal</TableCol>
                            <TableCol>Rekening</TableCol>
                            <TableCol>Jumlah</TableCol>
                            <TableCol>Keterangan</TableCol>
                            <TableCol>Tipe Transaksi</TableCol>
                            <TableCol></TableCol>
                        </TableHead>
                        {/* <TableBody>
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
                                            {item.rekening}
                                        </TableCell>
                                        <TableCell
                                            className={`${
                                                item.transactionType == "Pemasukan"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {`${
                                                item.transactionType == "Pemasukan"
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
                        </TableBody> */}
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
