import Modal from "@components/Modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailNasabahModal = ({
  title,
  data,
  message,
  show,
  setShow,
  onDelete,
}) => {
  const router = useRouter();
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <Modal
      title={title}
      show={show}
      toggleShow={toggleShow}
      className='md:w-1/2'
      zClass='z-30'
    >
      <Modal.Content>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div>
            <div className='relative'>
              {data._ktp && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads/${data._ktp}`}
                  alt='Picture of the author'
                  className='rounded-md'
                  width={16}
                  height={9}
                  layout='responsive'
                />
              )}
            </div>
          </div>
          <div className='col-span-2'>
            <div>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='w-1/3'></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border px-5 py-2'>No. Rekening</td>
                    <td className='border px-5 py-2'>{data.rekening}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>NIK</td>
                    <td className='border px-5 py-2'>{data.nik}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>Nama Lengkap</td>
                    <td className='border px-5 py-2'>{data.name}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>Alamat</td>
                    <td className='border px-5 py-2'>{data.address}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>Jenis Kelamin</td>
                    <td className='border px-5 py-2'>{data.gender}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>Tanggal Lahir</td>
                    <td className='border px-5 py-2'>{data.birthdate}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>Email</td>
                    <td className='border px-5 py-2'>{data.email}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>No. HP</td>
                    <td className='border px-5 py-2'>{data.mobile}</td>
                  </tr>
                  <tr>
                    <td className='border px-5 py-2'>Tanggal Pendaftaran</td>
                    <td className='border px-5 py-2'>
                      {new Date(data.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className='flex justify-end'>
          <button
            onClick={toggleShow}
            type='button'
            className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
          >
            Tutup
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default DetailNasabahModal;
