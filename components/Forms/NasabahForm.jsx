import { useForm } from "react-hook-form";
import Select from "react-select";
import InputMask from "react-input-mask";
import ImageUpload from "@components/Input/ImageUpload";
import { useEffect, useState } from "react";

export default function Nasabah({
  onSubmit,
  data = "",
  image,
  setImage,
  accountType,
}) {
  const { register, handleSubmit, setValue, getValues, watch, reset, errors } =
    useForm();

  const [birthdate, setBirthdate] = useState("");

  const accountTypeOptions = accountType.rows.map((acc) => {
    return {
      label: acc.code + " . " + acc.name,
      value: acc._id,
    };
  });

  useEffect(() => {
    setValue("name", data.name);
    setValue("nik", data.nik);
    setValue("address", data.address);
    setValue("birthdate", data.birthdate);
    setBirthdate(data.birthdate || "");
    setValue("email", data.email);
    setValue("mobile", data.mobile);
    setValue("gender", data.gender);
    setValue("_accountType", data._accountType ? data._accountType._id : "");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full sm:w-3/4 md:w-1/4 m-auto'>
        <div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Scan KTP
            </div>
            <ImageUpload name='ktp' image={image} setImage={setImage} />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              NIK <span className='text-red-500'>*</span>
            </div>
            <input
              type='number'
              name='nik'
              ref={register({ required: true })}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Nama Lengkap <span className='text-red-500'>*</span>
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
              Golongan <span className='text-red-500'>*</span>
            </div>
            <input
              type='text'
              name='_accountType'
              ref={register({ required: true })}
              hidden
            />
            <Select
              instanceId='accountType'
              defaultValue={
                data
                  ? accountTypeOptions.filter(
                      (acc) => acc.value == data._accountType._id
                    )[0]
                  : ""
              }
              onChange={(e) => {
                setValue("_accountType", e.value);
              }}
              className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
              options={accountTypeOptions}
            />
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='w-3/4'>
              <div className='text-sm font-medium text-gray-700 py-2 '>
                Jenis Kelamin <span className='text-red-500'>*</span>
              </div>
              <div>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    className='form-radio'
                    name='gender'
                    ref={register({ required: true })}
                    value='L'
                  />
                  <span className='ml-2'>Laki-Laki</span>
                </label>
                <label className='inline-flex items-center ml-6'>
                  <input
                    type='radio'
                    className='form-radio'
                    name='gender'
                    ref={register({ required: true })}
                    value='P'
                  />
                  <span className='ml-2'>Perempuan</span>
                </label>
              </div>
            </div>
            <div>
              <div className='text-sm font-medium text-gray-700 py-2 '>
                Tanggal Lahir
              </div>
              <input type='text' name='birthdate' ref={register()} hidden />
              <InputMask
                mask='99/99/9999'
                placeholder='dd/mm/yyyy'
                value={birthdate}
                onChange={(e) => {
                  setValue("birthdate", e.target.value);
                  setBirthdate(e.target.value);
                }}
                className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
              />
            </div>
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              Alamat <span className='text-red-500'>*</span>
            </div>
            <input
              type='text'
              name='address'
              ref={register({ required: true })}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>Email</div>
            <input
              type='email'
              name='email'
              ref={register()}
              className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
            />
          </div>
          <div>
            <div className='text-sm font-medium text-gray-700 py-2 '>
              No. HP
            </div>
            <input
              type='text'
              name='mobile'
              ref={register()}
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
                  setBirthdate("");
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
