import { ItemDescription } from "semantic-ui-react";

const Card = ({ img, data, keranjang, setKeranjang, formatRp }) => {
    const addKeranjang = (item) => {
        const find = keranjang.filter((ker) => ker._id == item._id);

        if (find.length > 0) {
            const newItems = keranjang.map((ker) => {
                if (ker._id == item._id) {
                    ker.qty += 1;
                }
                return ker;
            });

            setKeranjang(newItems);
        } else {
            setKeranjang([...keranjang, { ...item, qty: 1 }]);
        }
    };

    return (
        <div className='w-64 bg-white rounded-lg overflow-hidden shadow'>
            <img className='h-40 w-full object-cover' src={img} alt={img} />

            <div className='px-4 py-2 '>
                <h1 className='text-gray-900 font-bold text-lg uppercase h-8'>
                    {data.name}
                </h1>
                <p className='text-gray-600 font-bold text-sm mt-1'>
                    Stok : {data.stock}
                </p>
                <p className='text-gray-600 text-sm mt-1 h-8'>
                    {" "}
                    {data.description}
                </p>
            </div>

            <div className='flex items-center justify-between px-4 py-2 bg-gray-900'>
                <h1 className='text-gray-200 font-bold'>
                    {formatRp(data.price)}
                </h1>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addKeranjang(data);
                    }}
                    className='px-3 py-1 bg-gray-200 hover:bg-green-200 text-sm text-gray-900 font-semibold rounded'
                >
                    Tambahkan
                </button>
            </div>
        </div>
    );
};

export default Card;
