import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function HargaSampahForm({ onSubmit, data, title }) {
    const { register, handleSubmit, errors } = useForm();

    const router = useRouter();
    const handleCancel = (data) => {
        if (data != "") {
            router.back();
        } else {
            router.push("/Admin/Gudang/HargaSampah", undefined, {
                shallow: true,
            });
        }
    };

    return (
        <div className='bg-white rounded shadow m-auto w-full sm:w-10/12 md:w-3/5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='border-b px-4 py-2 flex justify-between	'>
                    <h3 className='font-semibold text-lg'>{title}</h3>
                </div>
                <div className='p-5'>
                    <div className='grid gap-4'>
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
                        <div>
                            <label>
                                Kategori <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='category'
                                defaultValue={data.category}
                                className={`block border w-full px-4 py-1 ${
                                    errors.category
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "Pilih kategori sampah!",
                                })}
                            >
                                <option value='Kertasan'>Kertasan</option>
                                <option value='Emberan'>Emberan</option>
                                <option value='Botol'>Botol</option>
                                <option value='Logam/Besi'>Logam/Besi</option>
                                <option value='Kresek/Plastik'>
                                    Kresek/Plastik
                                </option>
                                <option value='Lain - Lain'>Lain - Lain</option>
                            </select>

                            {errors.category && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.category.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Satuan <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='denom'
                                type='text'
                                defaultValue={data.denom}
                                className={`block border w-full px-4 py-1 ${
                                    errors.denom
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "Satuan harus di isi!",
                                })}
                            />
                            {errors.denom && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.denom.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Harga Satuan{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='price'
                                type='number'
                                defaultValue={data.price}
                                className={`block border w-full px-4 py-1 ${
                                    errors.price
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "Harga harus di isi!",
                                })}
                            />
                            {errors.price && (
                                <span className='text-xs text-red-500'>
                                    "* " +{errors.price.message}
                                </span>
                            )}
                        </div>
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

HargaSampahForm.defaultProps = {
    data: "",
};
