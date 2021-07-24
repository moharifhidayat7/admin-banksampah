import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Modal from "@components/Modal";
import { useForm } from "react-hook-form";
import Select from "react-select";
export default function JenisModal({
  title,
  data,
  show,
  toggleShow,
  sampahCategory,
}) {
  const router = useRouter();
  const { register, handleSubmit, setValue, reset, errors } = useForm();

  const categoryOptions = sampahCategory.results.map((result) => {
    return {
      label: result.name,
      value: result._id,
    };
  });

  const [selected, setSelected] = useState({});

  const handleTambah = async (formData) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`, {
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
    console.log(formData);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType/${data._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    ).then((res) => {
      console.log(res);
      if (res.status == 200) {
        toggleShow();
        reset();
        router.replace(router.asPath);
      }
    });
  };

  useEffect(() => {
    if (data._id) {
      const rowCategory = categoryOptions.filter(
        (acc) => acc.value == data._category._id
      )[0];
      setValue("name", data.name);
      setValue("unit", data.unit);
      setValue("price", data.price);
      setValue("_category", rowCategory.value);
      setSelected(rowCategory);
    } else {
      setSelected({});
      reset();
    }
  }, [data]);

  return (
    <Modal
      title={data._id ? "Edit Jenis" : title}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
    >
      <form onSubmit={handleSubmit(data._id ? handleEdit : handleTambah)}>
        <Modal.Content>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>Nama</div>
            <input
              name='name'
              ref={register({ required: true })}
              type='text'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Kategori
            </div>
            <input
              type='text'
              name='_category'
              ref={register({ required: true })}
              hidden
            />
            <Select
              instanceId='sampahCategory'
              value={selected}
              onChange={(e) => {
                setValue("_category", e.value);
                setSelected(e);
              }}
              className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
              options={categoryOptions}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Satuan
            </div>
            <input
              name='unit'
              ref={register({ required: true })}
              type='text'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>Harga</div>
            <input
              name='price'
              ref={register({ required: true })}
              type='number'
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
              setSelected({});
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
