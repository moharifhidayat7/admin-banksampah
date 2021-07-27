import { useForm } from "react-hook-form";
import Select from "react-select";
import ImageUpload from "@components/Input/ImageUpload";
import { useEffect, useState } from "react";

export default function Nasabah({
  onSubmit,
  data = "",
  image,
  setImage,
  productCategory,
}) {
  const { register, handleSubmit, setValue, getValues, watch, reset, errors } =
    useForm();

  const categoryOptions = productCategory.results.map((acc) => {
    return {
      label: acc.name,
      value: acc._id,
    };
  });

  const statusOption = [
    {
      label: "Online",
      value: "Online",
    },
    { label: "Offline", value: "Offline" },
  ];

  useEffect(() => {
    if (data._picture) {
      setImage({
        preview: `${process.env.NEXT_PUBLIC_API_HOST}/api/uploads/${data._picture}`,
      });
    }
    if (data) {
      setValue("name", data.name);
      setValue("_category", data._category._id);
      setValue("price", data.price);
      setValue("description", data.description);
      setValue("status", data.status);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full sm:w-3/4 md:w-1/4 m-auto'>
        <div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Gambar Produk
            </div>
            <ImageUpload name='_picture' image={image} setImage={setImage} />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Nama Produk <span className='text-red-500'>*</span>
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
              instanceId='productCategory'
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
              Harga <span className='text-red-500'>*</span>
            </div>
            <input
              type='number'
              name='price'
              ref={register({ required: true })}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Status <span className='text-red-500'>*</span>
            </div>
            <input
              type='text'
              name='status'
              ref={register({ required: true })}
              hidden
            />
            <Select
              instanceId='productStatus'
              defaultValue={
                data
                  ? statusOption.filter((acc) => acc.value == data.status)[0]
                  : ""
              }
              onChange={(e) => {
                setValue("status", e.value);
              }}
              className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
              options={statusOption}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Deskripsi Produk
            </div>
            <textarea
              name='description'
              ref={register()}
              rows='4'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            ></textarea>
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
