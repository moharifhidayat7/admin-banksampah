import { useState } from "react";

const Card = ({ img, data, keranjang, setKeranjang, formatRp }) => {
    const addKeranjang = (item) => {
        const find = keranjang.filter((ker) => ker._product._id == item._id);

        if (qty == 0) {
            return;
        }

        if (find.length > 0) {
            const newArr = [];
            for (let i = 0; i < keranjang.length; i++) {
                if (keranjang[i]._product._id == item._id) {
                    newArr.push({ ...keranjang[i], qty: 1 });
                } else {
                    newArr.push(keranjang[i]);
                }
            }

            setKeranjang(newArr);
        } else {
            setKeranjang([...keranjang, { _product: { ...item }, qty: 1 }]);
        }
    };
    const [qty, setQty] = useState(1);

    return (
        <div className='w-full bg-white overflow-hidden z-0 shadow-xl hover:shadow  transform hover:scale-105'>
            <img className='h-40 w-full object-cover' src={img} alt={img} />

            <div className='py-1 px-3'>
                <h1 className='font-medium uppercase h-8'>{data.name}</h1>
                <p className='text-gray-600 text-sm'>Stok : {data.stock}</p>
                <p className='text-blue-800 text-sm mt-1 h-8'>
                    {formatRp(data.price)}
                </p>
            </div>

            {/* <div className='flex items-center justify-between px-4 pb-2'>
                <button
                    className='px-3 py-1 bg-red-500 text-white'
                    onClick={(e) => {
                        e.preventDefault();
                        if (qty != 0) {
                            setQty(qty - 1);
                        }
                    }}
                >
                    -
                </button>
                <input
                    className='lg:w-10 xl:24 text-center focus:outline-none'
                    placeholder='0'
                    type='number'
                    min='0'
                    value={qty}
                    onChange={(e) => {
                        setQty(parseInt(e.target.value));
                    }}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setQty(qty + 1);
                    }}
                    className='px-3 py-1 bg-green-500 text-white'
                >
                    +
                </button>
            </div> */}
            <div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addKeranjang(data);
                    }}
                    className='px-3 py-1 bg-green-200 hover:bg-gray-200 text-sm text-gray-900 font-semibold w-full'
                >
                    Beli
                </button>
            </div>
        </div>
    );
};

export default Card;
