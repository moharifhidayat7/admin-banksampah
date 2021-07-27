import { useState, useEffect } from "react";
import Link from "next/link";
export default function BayarModal({
  modal,
  toggleModal,
  keranjang,
  setKeranjang,
  formatRp,
}) {
  const [bayar, setBayar] = useState(0);
  const [success, setSuccess] = useState(false);
  const [print, setPrint] = useState("");

  const checkout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: keranjang,
        payment: bayar,
        status: "SUCCESS",
      }),
    }).then(async (res) => {
      const result = await res.json();
      if (res.status == 200) {
        alert("Pembayaran Berhasil");
        setPrint(result._id);
        setSuccess(true);
      }
    });
  };

  useEffect(() => setSuccess(false), []);

  return (
    <div
      className={`modal fixed z-40 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 ${
        modal ? "" : "hidden"
      }`}
    >
      <div
        className='w-full sm:w-80 lg:w-96'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className='bg-white p-2 px-4'>
          <p className='font-semibold mb-4'>Ringkasan belanja</p>
          <div className='h-44 overflow-y-auto'>
            {keranjang.map((item, index) => {
              return (
                <div key={index + 100}>
                  <div className='flex justify-between font-mono text-gray-600'>
                    <p>
                      {item.qty} x {item._product.name}
                    </p>
                    <p>{formatRp(item._product.price * item.qty)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {success ? (
            ""
          ) : (
            <div>
              <p className='font-semibold'>Bayar</p>
              <div>
                <input
                  type='number'
                  className='text-xl w-full bg-gray-200 p-2 text-right'
                  placeholder='0'
                  value={bayar}
                  onChange={(e) => setBayar(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}

          <hr />
          <div className='my-4 font-semibold'>
            <div className='flex justify-between'>
              <p>Total Harga</p>
              <p>
                {formatRp(
                  keranjang.reduce((tot, item) => {
                    return tot + item._product.price * item.qty;
                  }, 0)
                )}
              </p>
            </div>
            {success ? (
              <div className='flex justify-between'>
                <p>Bayar</p>
                <p>{formatRp(bayar)}</p>
              </div>
            ) : (
              ""
            )}
            <div className='flex justify-between'>
              <p>Kembalian</p>
              <p>
                {formatRp(
                  bayar -
                    keranjang.reduce((tot, item) => {
                      return tot + item._product.price * item.qty;
                    }, 0)
                )}
              </p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {success ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal();
                  setSuccess(false);
                  setBayar("");
                  setKeranjang([]);
                }}
                className='text-lg font-bold text-white bg-red-500 w-full rounded-md py-2 hover:bg-red-600 transition'
              >
                Tutup
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal();
                }}
                className='text-lg font-bold text-white bg-red-500 w-full rounded-md py-2 hover:bg-red-600 transition'
              >
                Batal
              </button>
            )}

            {success ? (
              <Link href={`/Client/Kasir/print/${print}`}>
                <a
                  target='_blank'
                  role='button'
                  className='text-lg text-center font-bold text-white bg-blue-500 w-full rounded-md py-2 hover:bg-blue-600 transition'
                >
                  Print
                </a>
              </Link>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    bayar != 0 &&
                    parseInt(bayar) >=
                      keranjang.reduce((tot, item) => {
                        return tot + item._product.price * item.qty;
                      }, 0)
                  ) {
                    checkout();
                  }
                }}
                className='text-lg font-bold text-white bg-green-500 w-full rounded-md py-2 hover:bg-green-600 transition'
              >
                Bayar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
