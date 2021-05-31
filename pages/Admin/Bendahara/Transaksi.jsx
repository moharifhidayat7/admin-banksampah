import * as Icons from "heroicons-react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import TambahTransaksiBankModal from "../../../components/Modals/TambahTransaksiBankModal";
import { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import { useForm } from "react-hook-form";

function Pemasukan() {
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([]);
    const [edit, setEdit] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const getItems = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction`
        );
        const json = await res.json();
        setItems(json);
    };

    const delItems = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction/${id}`,
            {
                method: "DELETE",
            }
        ).then((res) => getItems());
    };

    const handleEdit = (item) => {
        setEdit(item);
        toggleModal();
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        getItems();
    }, []);
    return (
        <BhrLayout>
            <TambahTransaksiBankModal
                modal={modal}
                toggleModal={toggleModal}
                getItems={getItems}
                setEdit={setEdit}
                edit={edit}
            />
            <div>
                <h1 className='text-4xl mb-5 inline-block'>
                    Transaksi Tabungan Nasabah
                </h1>

                <button
                    type='button'
                    className='px-4 inline-block align-top float-right focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                    onClick={toggleModal}
                >
                    Tabung/Tarik Tunai
                </button>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>Tanggal</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol>No. Rekening</TableCol>
                        <TableCol>Tipe Transaksi</TableCol>

                        <TableCol>Jumlah</TableCol>
                        <TableCol>Keterangan</TableCol>
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
                                    <TableCell>{item._nasabah.name}</TableCell>
                                    <TableCell>
                                        {item._nasabah.rekening}
                                    </TableCell>
                                    <TableCell
                                        className={`${
                                            item.transactionType == "Pemasukan"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {item.transactionType}
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
                                        {item._sampahTransaction
                                            ? formatRp(
                                                  item._sampahTransaction.items.reduce(
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
                                            : formatRp(item.amount)}
                                    </TableCell>
                                    <TableCell>
                                        {item._sampahTransaction ? (
                                            <span>
                                                Transaksi Sampah (
                                                <a
                                                    href='#'
                                                    className='text-blue-500 hover:underline'
                                                >
                                                    {
                                                        item._sampahTransaction
                                                            ._id
                                                    }
                                                </a>
                                                )
                                            </span>
                                        ) : (
                                            item.note
                                        )}
                                    </TableCell>

                                    <TableCell className='float-right'>
                                        <button
                                            className={`hidden bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                        >
                                            <Icons.Pencil />
                                        </button>
                                        {item._sampahTransaction ? (
                                            ""
                                        ) : (
                                            <button
                                                className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                onClick={() => {
                                                    delItems(item._id);
                                                }}
                                            >
                                                <Icons.Trash />
                                            </button>
                                        )}
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

export default Pemasukan;
