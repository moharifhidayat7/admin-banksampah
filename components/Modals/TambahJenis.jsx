import Modal from "@components/Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TambahJenisModal = ({ title, data, show, setShow }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const toggleShow = () => {
    setShow(!show);
  };

  const handleTambah = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/accountType`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, code }),
    }).then(async (res) => {
      toggleShow();
      setName("");
      setCode("");
      router.replace(router.asPath);
    });
  };

  const handleEdit = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/accountType/${data._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    ).then((res) => {
      if (res.status == 200) {
        toggleShow();
        setName("");
        setCode("");
        router.replace(router.asPath);
      }
    });
  };

  useEffect(() => {
    if (data._id) {
      setName(data.name);
      setCode(data.code);
    } else {
      setName("");
      setCode("");
    }
  }, [data]);

  return (
    <Modal
      title={data._id ? "Edit Golongan" : title}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
    >
      <Modal.Content>
        <div>
          <div className='text-sm font-medium text-gray-700 py-2 '>
            Kode Rekening
          </div>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            type='number'
            disabled={data._id ? "disabled" : ""}
            className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input disabled:bg-gray-200'
          />
        </div>
        <div>
          <div className='text-sm font-medium text-gray-700 py-2 '>
            Nama Golongan
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
          onClick={data._id ? handleEdit : handleTambah}
          type='button'
          className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
        >
          {data._id ? "Perbarui" : "Tambah"}
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
export default TambahJenisModal;
