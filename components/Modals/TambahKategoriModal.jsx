import Modal from "@components/Modal";
import { useState } from "react";
import { useRouter } from "next/router";

const TambahKategoriModal = ({ title, data, show, setShow }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const toggleShow = () => {
    setShow(!show);
  };

  const handleTambah = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then(async (res) => {
      toggleShow();
      setName("");
      router.replace(router.asPath);
    });
  };

  return (
    <Modal title={title} show={show} toggleShow={toggleShow}>
      <Modal.Content>
        <div>
          <div className='text-sm font-medium text-gray-700 py-2 '>
            Nama Kategori
          </div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type='text'
            className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <button
          onClick={handleTambah}
          type='button'
          className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
        >
          Tambah
        </button>
        <button
          onClick={toggleShow}
          type='button'
          className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
        >
          Batal
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default TambahKategoriModal;
