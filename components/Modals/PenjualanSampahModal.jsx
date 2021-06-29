import PenjualanSampahForm from "../Forms/PenjualanSampahForm";

function Penjualan({ sampahType, modal, toggleModal }) {
    const onSubmit = async (data, items) => {
        const postData = {
            ...data,
            items: items,
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahSale`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        }).then(async (res) => {
            alert("Berhasil Jual Sampah");
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
                <PenjualanSampahForm
                    onSubmit={onSubmit}
                    sampahType={sampahType}
                    handleCancel={handleCancel}
                    title='Tambah Penjualan Sampah'
                ></PenjualanSampahForm>
            </div>
        </div>
    );
}

export default Penjualan;
