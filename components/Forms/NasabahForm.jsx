import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Nasabah({ onSubmit, data, title }) {
    const { register, handleSubmit, errors } = useForm();

    const router = useRouter();

    const handleCancel = (data) => {
        if (data != "") {
            router.back();
        } else {
            router.push("/Admin/Bendahara/Nasabah", undefined, {
                shallow: true,
            });
        }
    };

    return (
        <div className='bg-white rounded shadow m-auto w-full sm:w-10/12 md:w-3/5'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType='multipart/form-data'
            >
                <div className='border-b px-4 py-2 flex justify-between	'>
                    <h3 className='font-semibold text-lg'>{title}</h3>
                </div>
                <div className='p-5'>
                    <div className='grid gap-4'>
                        <div>
                            <label>
                                NIK <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='nik'
                                type='number'
                                defaultValue={data.nik}
                                className={`block border w-full px-4 py-1 ${
                                    errors.nik ? "border-red-500 border-2" : ""
                                }`}
                                ref={register({
                                    required: "NIK harus di isi!",
                                })}
                            />
                            {errors.nik && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.nik.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Nama <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='name'
                                type='text'
                                defaultValue={data.name}
                                className={`block border w-full px-4 py-1 ${
                                    errors.name ? "border-red-500 border-2" : ""
                                }`}
                                ref={register({
                                    required: "Nama harus di isi!",
                                })}
                            />
                            {errors.name && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label>
                                    Tanggal Lahir{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='birthdate'
                                    type='date'
                                    defaultValue={data.birthdate}
                                    className={`block border w-full px-4 py-1 ${
                                        errors.birthdate
                                            ? "border-red-500 border-2"
                                            : ""
                                    }`}
                                    ref={register({
                                        required: "Tanggal Lahir harus di isi!",
                                    })}
                                />
                                {errors.birthdate && (
                                    <span className='text-xs text-red-500'>
                                        "* " +{errors.birthdate.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label>
                                    Jenis Kelamin{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    name='gender'
                                    defaultValue={data.gender}
                                    className={`block border w-full px-4 py-1 ${
                                        errors.gender
                                            ? "border-red-500 border-2"
                                            : ""
                                    }`}
                                    ref={register({
                                        required: "Pilih jenis kelamin!",
                                    })}
                                >
                                    <option value='Laki-Laki'>
                                        Laki - Laki
                                    </option>
                                    <option value='Perempuan'>Perempuan</option>
                                </select>
                                {errors.gender && (
                                    <span className='text-xs text-red-500'>
                                        "* " +{errors.gender.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>
                                Keanggotaan{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='accountType'
                                defaultValue={data.accountType}
                                className={`block border w-full px-4 py-1 ${
                                    errors.accountType
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "Pilih jenis kelamin!",
                                })}
                            >
                                <option value='Umum'>Umum</option>
                                <option value='Kelompok'>Kelompok</option>
                            </select>
                            {errors.accountType && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.accountType.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                name='email'
                                type='email'
                                defaultValue={data.email}
                                className={`block border w-full px-4 py-1 ${
                                    errors.email
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register()}
                            />
                        </div>
                        <div>
                            <label>
                                Alamat <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='address'
                                type='text'
                                defaultValue={data.address}
                                className={`block border w-full px-4 py-1 ${
                                    errors.address
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "Alamat harus di isi!",
                                })}
                            />
                            {errors.address && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.address.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                No. HP <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='mobile'
                                type='number'
                                defaultValue={data.mobile}
                                className={`block border w-full px-4 py-1 ${
                                    errors.mobile
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "No. HP harus di isi!",
                                })}
                            />
                            {errors.mobile && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.mobile.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label>
                            Scan KTP <span className='text-red-500'>*</span>
                        </label>
                        <input
                            name='ktp'
                            type='file'
                            accept='image/*'
                            className={`block border w-full px-4 py-1 ${
                                errors.ktp && "border-red-500 border-2"
                            }`}
                            ref={register({ required: "Upload KTP!" })}
                        />
                        {errors.ktp && (
                            <span className='text-xs text-red-500'>
                                "* " +{errors.ktp.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex justify-end w-full border-t p-2'>
                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleCancel(data);
                            }}
                            type='button'
                            className='px-3 bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className='px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

Nasabah.defaultProps = {
    data: "",
};
