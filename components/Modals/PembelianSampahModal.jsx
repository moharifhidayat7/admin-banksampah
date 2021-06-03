import PembelianSampahForm from "../Forms/PembelianSampahForm";

function Penjualan({ sampahType, modal, toggleModal }) {
    const onSubmit = async (data, items, nasabah) => {
        let dataToPost;

        if (nasabah._id) {
            dataToPost = {
                _nasabah: nasabah,
                transactionDate: data.transactionDate,
                transactionType: data.transactionType,
                items: [...items],
            };
        } else {
            dataToPost = {
                _nasabah: {
                    name: data.name,
                    address: data.address,
                    mobile: data.mobile,
                },
                transactionDate: data.transactionDate,
                transactionType: data.transactionType,
                items: [...items],
            };
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToPost),
        }).then(async (res) => {
            alert("Pembelian Sampah Berhasil");
            toggleModal();
        });
    };

    const handleCancel = () => {
        toggleModal();
    };

    return (
        <div
            className={`modal absolute z-40 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 ${
                modal ? "" : "hidden"
            }`}
            onClick={toggleModal}
        >
            <div
                className='w-full'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <PembelianSampahForm
                    onSubmit={onSubmit}
                    sampahType={sampahType}
                    cancel={handleCancel}
                    handleCancel={handleCancel}
                    title='Tambah Penjualan Sampah'
                />
            </div>
        </div>
    );
}

export default Penjualan;
