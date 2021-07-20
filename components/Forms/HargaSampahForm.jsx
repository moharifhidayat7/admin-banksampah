import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SelectMenu from "@components/Input/SelectMenu";

export default function HargaSampahForm({
  onSubmit,
  data = "",
  title,
  sampahCategory,
}) {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [selected, setSelected] = useState("");

  const options = sampahCategory.map((e) => {
    return { label: e.name, value: e._id };
  });

  const router = useRouter();
  const handleCancel = (data) => {
    if (data != "") {
      router.back();
    } else {
      router.push(
        router.pathname.split("/").slice(0, -1).join("/"),
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  useEffect(() => {
    if (data != "") {
      setValue("name", data.name);
      setSelected({ label: data._category.name, value: data._category._id });
      setValue("_category", data._category._id);
      setValue("price", data.price);
      setValue("denom", data.denom);
    }
  }, []);

  return (
    <div className='bg-white py-2 px-4 rounded-md shadow-md border-gray-300 m-auto w-full sm:w-10/12 md:w-1/2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3 className='text-lg font-medium'>{title}</h3>
        </div>
        <div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Jenis Sampah
            </div>
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
            <SelectMenu
              onChange={(op) => {
                setSelected(op);
                setValue("_category", op.value);
              }}
              options={options}
              label='Kategori ...'
              selected={selected}
              defaultValue={selected}
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Satuan
            </div>
            <input
              name='denom'
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
              type='text'
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
        </div>

        <div className='flex justify-end w-full py-2'>
          <div>
            <button
              type='submit'
              className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              type='button'
              className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
