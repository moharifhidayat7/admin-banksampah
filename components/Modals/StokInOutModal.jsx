import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Modal from "@components/Modal";
import { useForm } from "react-hook-form";
import Select from "react-select";

export default function StokModal({ title, sampahType, show, toggleShow }) {
  const router = useRouter();
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  const [selected, setSelected] = useState({});

  const handleTambah = async (formData) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahStock`, {
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

  return (
    <Modal
      title={"Stok Sampah"}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
    >
      <form onSubmit={handleSubmit((e) => console.log(e))}>
        <Modal.Content>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Tipe Stok
            </div>
            <input
              type='text'
              name='stockType'
              ref={register({ required: true })}
            />
            <Select
              instanceId='sampahType'
              onChange={(e) => {
                setSelected(e);
              }}
              className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
              options={[
                { label: "STOK IN", value: "IN" },
                { label: "STOK OUT", value: "OUT" },
              ]}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Jenis Sampah
            </div>
            <input
              type='text'
              name='_sampahType'
              ref={register({ required: true })}
            />
            <Select
              instanceId='sampahType'
              onChange={(e) => {
                setValue("_sampahType", e.value);
                setSelected(e);
              }}
              className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
              options={sampahType.results.map((type) => {
                return {
                  label: type.name,
                  value: type._id,
                };
              })}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Satuan
            </div>
            <input
              value={selected.unit}
              type='text'
              disabled
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>Qty</div>
            <input
              name='qty'
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
            Submit
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
