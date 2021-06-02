import Card from "../../../components/Card";
import { useState, useEffect } from "react";

export default function index({ products }) {
    const [keranjang, setKeranjang] = useState([]);

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <>
            <div className='fixed top-0 w-full'>
                <div className='bg-gradient-to-l from-green-600 to-gray-500 h-12 shadow-lg flex items-center'>
                    <p className='text-center w-full font-mono font-bold text-lg'>
                        KASIR PEMBELIAN PRODUK
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 mt-16 gap-5 px-8'>
                <div className='col-span-2'>
                    <div className='text-2xl mb-2'> Etalase Produk</div>
                    <div className='flex space-x-4 flex-wrap'>
                        {products.map((product) => {
                            return (
                                <Card
                                    key={product._id}
                                    img='https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2019/12/29/3541851566.jpg'
                                    data={product}
                                    keranjang={keranjang}
                                    setKeranjang={setKeranjang}
                                    formatRp={formatRp}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className='text-2xl mb-2'>Keranjang</div>
                    <div className='bg-white rounded-xl p-2 px-4 '>
                        <p className='font-semibold mb-4'>Ringkasan belanja</p>
                        {keranjang.map((item, index) => {
                            return (
                                <div
                                    key={index + 100}
                                    className='flex justify-between font-mono text-gray-600'
                                >
                                    <p>
                                        {item.qty} x {item.name}
                                    </p>
                                    <p>{formatRp(item.price)}</p>
                                </div>
                            );
                        })}
                        <hr />
                        <div className='my-4 font-semibold flex justify-between'>
                            <p>Total Harga</p>
                            <p>
                                {formatRp(
                                    keranjang.reduce((tot, item) => {
                                        return tot + item.price;
                                    }, 0)
                                )}
                            </p>
                        </div>
                        <button className='text-lg font-bold text-white bg-green-500 w-full rounded-md py-2 hover:bg-green-600 transition'>
                            Bayar
                        </button>
                    </div>
                    <div className='my-4 hidden'>
                        <div className='bg-white rounded shadow-md hidden sm:hidden md:hidden lg:block'>
                            <div className='border-gray-300 border-b p-5'>
                                <h1 className='text-gray-800 font-bold'>
                                    Notifikasi Pembelian Produk Online
                                </h1>
                            </div>
                            <div>
                                <div className='flex items-center space-x-5 px-5 py-2 bg-yellow-100 border-gray border-b'>
                                    <div className='flex-grow'>
                                        <small className='font-bold'>
                                            Kompos 15Kg (2 pcs){" "}
                                        </small>{" "}
                                        <span className='text-xs ml-2 text-gray'>
                                            Iis Dahlila
                                        </span>
                                        <small className='font-bold block'>
                                            Total Rp.200.000
                                        </small>
                                        <div>
                                            <small>
                                                Dusun Kampunganyar RT 02 RW 05
                                                Desa Gumuk, Kecamatan Licin
                                            </small>
                                        </div>
                                    </div>
                                    <div className='flex-none space-x-2 '>
                                        <p className='text-sm'>
                                            Telah di konfirmasi
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-5 px-5 py-2 border-gray border-b'>
                                    <div className='flex-grow'>
                                        <small className='font-bold'>
                                            Pot (2 pcs)
                                        </small>
                                        <span className='text-xs ml-2 text-gray'>
                                            Slamet
                                        </span>
                                        <small className='block font-bold'>
                                            Total Rp.300.000
                                        </small>

                                        <small>
                                            Dusun Kampunganyar RT 02 RW 05 Desa
                                            Gumuk, Kecamatan Licin
                                        </small>
                                    </div>
                                    <div className='flex-none space-x-2'>
                                        <button className='text-xs rounded bg-red-500 text-white py-1 px-2'>
                                            X
                                        </button>
                                        <button className='text-xs rounded bg-green-500 text-white py-1 px-2'>
                                            Y
                                        </button>
                                    </div>
                                </div>
                                <div className='text-center text-sm p-4'>
                                    Akan Tersedia Saat Online
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product`);
    const products = await res.json();
    return {
        props: {
            products,
        },
    };
}
