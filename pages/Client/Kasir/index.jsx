import Card from "../../../components/Card";
import { useState, useEffect } from "react";
import NavbarProduk from "../../../components/Navbar/NavbarProduk";
import * as Smooth from "react-scroll";
import * as Icon from "heroicons-react";
import BayarModal from "../../../components/Modals/BayarModal";

export default function index({ products }) {
    const [keranjang, setKeranjang] = useState([]);
    const [modal, setModal] = useState(false);

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };
    const [bt, setBt] = useState("hidden");
    useEffect(() => {
        window.addEventListener("scroll", (event) => {
            if (window.scrollY >= 160) {
                setBt("");
            } else {
                setBt("hidden");
            }
        });
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div>
            <BayarModal
                modal={modal}
                toggleModal={toggleModal}
                keranjang={keranjang}
                setKeranjang={setKeranjang}
                formatRp={formatRp}
            />
            <NavbarProduk />
            <Smooth.Link smooth to='home'>
                <button
                    className={`z-50 bg-blue-800  font-bold bg-opacity-30 w-10 p-2 fixed left-4 bottom-4 rounded-md ${bt} `}
                >
                    <Icon.Home />
                </button>
            </Smooth.Link>

            <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-2 lg:gap-10 mx-14 mb-4'>
                <div className='md:col-span-2 space-y-4'>
                    <div
                        id='kompos'
                        className='text-lg z-10 mt-4 top-0 sticky bg-white font-medium text-gray-500 border-b border-gray-300 p-2'
                    >
                        KOMPOS
                    </div>
                    <div className='grid lg:grid-cols-4 gap-2 grid-rows-2'>
                        {products.map((product) => {
                            return (
                                <Card
                                    key={product._id}
                                    img='/3541851566.jpg'
                                    data={product}
                                    keranjang={keranjang}
                                    setKeranjang={setKeranjang}
                                    formatRp={formatRp}
                                />
                            );
                        })}
                    </div>
                    {/* <div
                        id='kreatif'
                        className='text-lg z-10 mt-4 sticky top-0 bg-white font-medium text-gray-500 border-b border-gray-300 p-2'
                    >
                        Kreatif
                    </div>
                    <div className='grid lg:grid-cols-4 gap-2 grid-rows-2'>
                        {products.map((product) => {
                            return (
                                <Card
                                    key={product._id}
                                    img='/3541851566.jpg'
                                    data={product}
                                    keranjang={keranjang}
                                    setKeranjang={setKeranjang}
                                    formatRp={formatRp}
                                />
                            );
                        })}
                    </div>
                    <div
                        id='allproduct'
                        className='text-lg z-10 sticky mt-4 top-0 bg-white font-medium text-gray-500 border-b border-gray-300 p-2'
                    >
                        All Product
                    </div>
                    <div className='grid lg:grid-cols-4 gap-2 grid-rows-2'>
                        {products.map((product) => {
                            return (
                                <Card
                                    key={product._id}
                                    img='/3541851566.jpg'
                                    data={product}
                                    keranjang={keranjang}
                                    setKeranjang={setKeranjang}
                                    formatRp={formatRp}
                                />
                            );
                        })}
                    </div> */}
                </div>
                <div className='top-0 sticky'>
                    <div className='text-lg mt-4 top-0  sticky bg-white font-medium text-gray-500 border-b border-gray-300 p-2'>
                        Pencarian Populer
                    </div>
                    <div className='bg-white p-2'>Pot Bunga</div>
                    <div className='bg-white p-2'>Buju Recycle</div>
                </div>
                {/* Checkout */}
                <div className='lg:fixed sm:w-80  lg:bottom-4 lg:right-14 lg:mx-0 lg:w-96'>
                    <div className='text-lg w-full mt-4  bg-white font-medium text-gray-500 border-b border-gray-300 p-2'>
                        Keranjang
                    </div>
                    <div className='bg-white p-2 px-4'>
                        <p className='font-semibold mb-4'>
                            Ringkasan belanja
                            <button
                                onClick={() => setKeranjang([])}
                                className='float-right text-white px-2 py-1 block bg-red-500 hover:bg-red-800 text-xs rounded-lg focus:outline-none'
                            >
                                Kosongkan
                            </button>
                        </p>
                        <div className='h-44 overflow-y-auto'>
                            {keranjang.map((item, index) => {
                                return (
                                    <div key={index + 100}>
                                        <div className='flex justify-between font-mono text-gray-600'>
                                            <p>
                                                {item.qty} x{" "}
                                                {item._product.name}
                                            </p>
                                            <p>
                                                {formatRp(
                                                    item._product.price *
                                                        item.qty
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <hr />
                        <div className='my-4 font-semibold'>
                            <div className='flex justify-between'>
                                <p>Total Harga</p>
                                <p>
                                    {formatRp(
                                        keranjang.reduce((tot, item) => {
                                            return (
                                                tot +
                                                item._product.price * item.qty
                                            );
                                        }, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (keranjang.length > 0) {
                                    toggleModal();
                                }
                            }}
                            className='text-lg font-bold text-white bg-green-500 w-full rounded-md py-2 hover:bg-green-600 transition'
                        >
                            Bayar
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
