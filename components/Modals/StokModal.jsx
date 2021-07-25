import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Modal from "@components/Modal";
import { useForm } from "react-hook-form";
import Select from "react-select";

export default function StokModal({
  title,
  data = "",
  action,
  show,
  toggleShow,
  sampahType,
}) {
  const router = useRouter();
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  const [selected, setSelected] = useState("");

  const handleTambah = async (formData) => {
    if (formData.stockType == "OUT" && formData.qty > selected.stock) {
      return;
    }
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
  useEffect(() => {
    if (data._id) {
      setValue("_sampahType", data._id);
      setSelected({ label: data.name, value: data._id, unit: data.unit, stock: data.stock });
    } else {
      setValue("_sampahType", "");
    }
    setValue("stockType", action);
  }, [show]);

  return (
    <Modal
      title={action == "IN" ? "Stok In" : "Stok Out"}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
    >
      <form onSubmit={handleSubmit(handleTambah)}>
        <Modal.Content>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Jenis Sampah
            </div>
            <input
              type='text'
              name='_sampahType'
              hidden
              ref={register({ required: true })}
            />
            <input
              type='text'
              name='stockType'
              hidden
              ref={register({ required: true })}
            />
            <input
              value={data && data.name}
              disabled
              type='text'
              className={`${
                !data && "hidden"
              } w-full disabled:bg-gray-300 text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input`}
            />

            <Select
              instanceId='sampahType'
              value={selected}
              onChange={(e) => {
                setValue("_sampahType", e.value);
                setSelected(e);
              }}
              className={`w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm ${
                data._id ? "hidden" : ""
              }`}
              options={sampahType}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Satuan
            </div>
            <input
              value={selected && selected.unit}
              disabled
              type='text'
              className='w-full disabled:bg-gray-300 text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Stok Sekarang
            </div>
            <input
              value={selected && selected.stock}
              disabled
              type='text'
              className='w-full disabled:bg-gray-300 text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>Qty</div>
            <input
              name='qty'
              ref={register({ required: true })}
              min='1'
              type='number'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Keterangan
            </div>
            <textarea
              name='note'
              ref={register()}
              rows='4'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            ></textarea>
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
