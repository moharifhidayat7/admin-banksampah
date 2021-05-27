import AdminLayout from "../../../components/Layouts/AdminLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import { useState, useReducer, useEffect } from "react";
import * as Icons from "heroicons-react";
import { useForm } from "react-hook-form";

function Sampah({ sampahCategory }) {
    const { control, register, handleSubmit, setValue, reset, watch, errors } =
        useForm();

    const [edit, setEdit] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const handleKategory = (e) => {
        setCategory(e.target.value);
    };

    const handleEdit = (type) => {
        setEdit(type._sampahType._id);
        setValue("name", type._sampahType.name);
        setValue("qtyfier", type._sampahType.qtyfier);
        setValue("price", type.price);
        setValue("_category", type._sampahType._category._id);
    };

    const addCategory = async () => {
        await fetch("http://localhost:3000/api/sampahCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: category,
            }),
        }).then(async (res) => {
            setCategories([...categories, await res.json()]);
            setCategory("");
        });
    };
    const addType = async (data) => {
        await fetch("http://localhost:3000/api/sampahType", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => getType());
    };
    const editType = async (data, id) => {
        await fetch("http://localhost:3000/api/sampahType/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            addPrice(data, id);
            setEdit("");
        });
    };

    const addPrice = async (data, id) => {
        await fetch("http://localhost:3000/api/priceList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _sampahType: id,
                price: data.price,
            }),
        }).then((res) => {
            getType();
            setEdit("");
        });
    };

    const delType = async (id) => {
        await fetch("http://localhost:3000/api/priceList/" + id, {
            method: "DELETE",
        }).then((res) => getType());
    };

    const getType = async () => {
        const res2 = await fetch("http://localhost:3000/api/priceList");
        const sampahType = await res2.json();

        setTypes(sampahType);
    };

    useEffect(() => {
        setCategories(sampahCategory);
        getType();
    }, []);

    return (
        <AdminLayout>
            <h1 className='text-4xl mb-5'>Harga Sampah</h1>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
                <div className='col-span-2'>
                    <div className='bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                        <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                            <Table>
                                <TableHead>
                                    <TableCol>Jenis Sampah</TableCol>
                                    <TableCol>Kategori</TableCol>
                                    <TableCol>Satuan</TableCol>
                                    <TableCol>Harga</TableCol>
                                    <TableCol></TableCol>
                                </TableHead>
                                <TableBody>
                                    {types.map((type) => {
                                        if (type.price != 0) {
                                            return (
                                                <TableRow key={type._id}>
                                                    <TableCell>
                                                        {type._sampahType.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            type._sampahType
                                                                ._category.name
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            type._sampahType
                                                                .qtyfier
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {type.price}
                                                    </TableCell>
                                                    <TableCell className='float-right'>
                                                        <button
                                                            className={`bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white ${
                                                                edit == type._id
                                                                    ? "hidden"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                handleEdit(type)
                                                            }
                                                        >
                                                            <Icons.Pencil />
                                                        </button>
                                                        <button
                                                            className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                            onClick={() =>
                                                                delType(
                                                                    type._id
                                                                )
                                                            }
                                                        >
                                                            <Icons.Trash />
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-white mb-4 dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                        <div className='px-5 pt-5 pb-2'>
                            <h1 className='text-gray-800 font-bold'>
                                {edit
                                    ? "Edit Jenis Sampah"
                                    : "Tambah Jenis Sampah"}
                            </h1>
                        </div>
                        <div className='px-5 pb-5 flex justify-center'>
                            <form
                                onSubmit={handleSubmit((data, e) => {
                                    if (edit) {
                                        editType(data, edit);
                                    } else {
                                        addType(data);
                                    }
                                    e.target.reset();
                                })}
                                className='w-full'
                            >
                                <div>
                                    <label>Jenis Sampah</label>
                                    <input
                                        className='block mt-2 focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border'
                                        placeholder='Masukkan Jenis Sampah'
                                        name='name'
                                        ref={register({ required: true })}
                                    />
                                </div>
                                <div>
                                    <label>Kategory</label>
                                    <select
                                        className='block px-4 py-3 w-full border rounded mb-2 mt-2'
                                        name='_category'
                                        ref={register({ required: true })}
                                    >
                                        {categories.map((category) => {
                                            return (
                                                <option
                                                    value={category._id}
                                                    key={category._id}
                                                >
                                                    {category.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label>Satuan</label>
                                    <input
                                        className='block mt-2 focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border'
                                        placeholder='Masukkan Satuan'
                                        name='qtyfier'
                                        ref={register({ required: true })}
                                    />
                                </div>
                                <div>
                                    <label>Harga</label>
                                    <input
                                        name='price'
                                        ref={register({ required: true })}
                                        type='number'
                                        pattern='[0-9]*'
                                        className='block appearance-none mt-2 bg-white focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border'
                                        placeholder='Masukkan Harga'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 py-1 text-white'
                                >
                                    {edit ? "Update" : "Tambah"}
                                </button>
                                <input
                                    type='button'
                                    className={`cursor-pointer bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none px-8 py-1 text-white ${
                                        edit ? "" : "hidden"
                                    }`}
                                    onClick={(e) => {
                                        setEdit("");
                                        reset();
                                    }}
                                    value='Batal'
                                />
                            </form>
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                        <div className='px-5 pt-5 pb-2'>
                            <h1 className='text-gray-800 font-bold'>
                                Kategori
                            </h1>
                        </div>
                        <div className='px-5 pb-5 flex justify-center'>
                            <div className='w-full'>
                                <div>
                                    <input
                                        className='block mt-2 focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border'
                                        placeholder='Masukkan Kategori'
                                        onChange={handleKategory}
                                        value={category}
                                    />
                                </div>

                                <button
                                    type='button'
                                    className='block bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 py-1 text-white'
                                    onClick={addCategory}
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/sampahCategory");
    const sampahCategory = await res.json();
    return {
        props: {
            sampahCategory,
        },
    };
}

export default Sampah;
