import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Modal from "@components/Modal";
import { useForm } from "react-hook-form";

export default function KategoriModal({ title, data, show, toggleShow }) {
  const router = useRouter();
  const { register, handleSubmit, setValue, reset, errors } = useForm();

  const handleTambah = async (formData) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status == 200) {
        toggleShow();
        reset();
        router.replace(router.asPath);
      }
    });
  };

  const handleEdit = async (formData) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory/${data._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    ).then((res) => {
      if (res.status == 200) {
        toggleShow();
        reset();
        router.replace(router.asPath);
      }
    });
  };

  useEffect(() => {
    if (data._id) {
      setValue("name", data.name);
    } else {
      reset();
    }
  }, [data]);

  return (
    <Modal
      title={data._id ? "Edit Kategori" : title}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
    >
      <form onSubmit={handleSubmit(data._id ? handleEdit : handleTambah)}>
        <Modal.Content>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Nama Kategori
            </div>
            <input
              name='name'
              ref={register({ required: true })}
              type='text'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <button
            type='submit'
            className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
          >
            {data._id ? "Perbarui" : "Tambah"}
          </button>
          <button
            onClick={() => {
              toggleShow();
              reset();
            }}
            type='button'
            className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
          >
            Batal
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
