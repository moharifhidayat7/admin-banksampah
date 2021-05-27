import { useEffect, useState } from "react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import Link from "next/link";
import TambahUserModal from "../../../components/Modals/TambahUserModal";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import * as Icons from "heroicons-react";

function User() {
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([]);
    const [edit, setEdit] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const getItems = async () => {
        const res = await fetch("http://localhost:3000/api/user");
        const json = await res.json();
        setItems(json);
    };

    const delItems = async (id) => {
        await fetch("http://localhost:3000/api/user/" + id, {
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
            <TambahUserModal
                modal={modal}
                toggleModal={toggleModal}
                getItems={getItems}
                setEdit={setEdit}
                edit={edit}
            />
            <div>
                <h1 className='text-4xl mb-5 inline-block'>User</h1>

                <button
                    type='button'
                    className='px-4 inline-block align-top float-right focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                    onClick={toggleModal}
                >
                    Tambah Data
                </button>
            </div>
            <div className='w-full'>
                <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-4 mt-4'>
                    {items.map((item) => {
                        return (
                            <div className='bg-white rounded shadow border-b p-5'>
                                <div className='inline-block'>
                                    <div className='text-sm font-bold'>
                                        {item.name}
                                    </div>
                                    <div className='text-sm'>{item.role}</div>
                                </div>
                                <div className='inline-block float-right'>
                                    <button
                                        className={`bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                    >
                                        <Icons.Pencil />
                                    </button>
                                    <button className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'>
                                        <Icons.Trash />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </BhrLayout>
    );
}
export default User;
