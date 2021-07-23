import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";

export default function HargaSampah({ onSubmit, data = "", sampahCategory }) {
  const { register, handleSubmit, setValue, getValues, watch, reset, errors } =
    useForm();

  const categoryOptions = sampahCategory.map((cat) => {
    return {
      label: cat.name,
      value: cat._id,
    };
  });

  useEffect(() => {
    setValue("name", data.name);
    setValue("_category", data._category ? data._category._id : "");
    setValue("unit", data.unit);
    setValue("price", data.price);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full sm:w-3/4 md:w-1/4 m-auto'>
        <div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Jenis Sampah <span className='text-red-500'>*</span>
            </div>
            <input
              type='text'
              name='name'
              ref={register({ required: true })}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Kategori <span className='text-red-500'>*</span>
            </div>
            <input
              type='text'
              name='_category'
              ref={register({ required: true })}
              hidden
            />
            <Select
              instanceId='sampahCategory'
              defaultValue={
                data
                  ? categoryOptions.filter(
                      (acc) => acc.value == data._category._id
                    )[0]
                  : ""
              }
              onChange={(e) => {
                setValue("_category", e.value);
              }}
              className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
              options={categoryOptions}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Satuan <span className='text-red-500'>*</span>
            </div>
            <input
              type='text'
              name='unit'
              ref={register({ required: true })}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Harga <span className='text-red-500'>*</span>
            </div>
            <input
              type='number'
              name='price'
              ref={register({ required: true })}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
        </div>
        <div className='py-2 flex justify-end'>
          <div>
            <button
              type='submit'
              className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
            >
              Simpan
            </button>
            {!data && (
              <button
                onClick={() => {
                  reset();
                }}
                type='button'
                className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
