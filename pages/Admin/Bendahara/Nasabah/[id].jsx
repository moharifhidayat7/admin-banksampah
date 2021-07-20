import { useEffect, useState } from "react";
import TambahNasabahModal from "../../../../components/Modals/TambahNasabahModal";
import TransaksiBankModal from "../../../../components/Modals/TransaksiBankModal";
import Layout from "../../../../components/Layouts/BhrLayout";
import DeleteRowModal from "@components/Modals/DeleteRowModal";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "../../../../components/Table";
import Link from "next/link";
import * as Icons from "heroicons-react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
function Nasabah({ nasabah }) {
  const router = useRouter();
  const [modalData, setModalData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteRowModal, setDeleteRowModal] = useState(false);
  const [modalTitle, setmodalTitle] = useState("");
  const [items, setItems] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const toggleModal = () => {
    setModal(!modal);
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const getTransaction = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction?nasabah=${nasabah._id}`
    ).then(async (res) => {
      const result = await res.json();
      setItems(result);

      setSaldo(
        result.reduce((total, item) => {
          if (item.transactionType == "Tabung") {
            return total + item.amount;
          } else {
            return total - item.amount;
          }
        }, 0)
      );
    });
  };
  useEffect(() => getTransaction(), []);

  const formatRp = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deleteHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${nasabah._id}`,
      {
        method: "DELETE",
      }
    ).then(async (res) => {
      setDeleteRowModal(!deleteRowModal);
      router.replace(router.pathname.split("/").slice(0, -1).join("/"));
    });
  };

  return (
    <Layout>
      <DeleteRowModal
        data={nasabah}
        title='Hapus Nasabah'
        show={deleteRowModal}
        setShow={setDeleteRowModal}
        onDelete={deleteHandler}
      />
      <TransaksiBankModal
        modal={modal}
        toggleModal={toggleModal}
        modalData={modalData}
        saldo={saldo}
        modalTitle={modalTitle}
        getTransaction={getTransaction}
      />
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl mb-5 inline-block'>{nasabah.name}</h1>
        <div className='flex space-x-2 items-center'>
          <button
            type='button'
            onClick={() => {
              router.back();
            }}
            className='px-3 py-1 focus:outline-none shadow-md bg-gray-500 rounded ring-2 ring-white text-white hover:ring-gray-500 hover:bg-white hover:text-gray-500 focus:ring-gray-500 focus:bg-white focus:text-gray-500'
          >
            <Icons.ArrowLeft
              size='1rem'
              className='inline-block align-middle mr-2'
            />
            <span className='align-middle'>Kembali</span>
          </button>
          <Link href='#'>
            <a
              role='button'
              className='text-center px-3 py-1 focus:outline-none shadow-md bg-blue-500 rounded ring-2 ring-white text-white hover:ring-blue-500 hover:bg-white hover:text-blue-500 focus:ring-blue-500 focus:bg-white focus:text-blue-500 '
            >
              <Icons.Pencil
                size='1rem'
                className='inline-block align-middle mr-2'
              />
              <span className='align-middle'>Edit</span>
            </a>
          </Link>
          <button
            type='button'
            onClick={() => {
              setDeleteRowModal(!deleteRowModal);
            }}
            className='px-3 py-1 focus:outline-none shadow-md bg-red-500 rounded ring-2 ring-white text-white hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500 focus:bg-white focus:text-red-500'
          >
            <Icons.Trash
              size='1rem'
              className='inline-block align-middle mr-2'
            />
            <span className='align-middle'>Hapus Nasabah</span>
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-0 md:gap-4'>
        <div className='grid grid-cols-1 gap-4 col-span-2'>
          <img src={nasabah.ktp} className='w-full border' alt='place' />
          <div className='bg-white rounded shadow grid grid-cols-1 md:gap-4'>
            <div className='border-gray-300 p-5 grid gap-2'>
              <div>
                <div className='text-sm font-bold'>NIK</div>
                <div>{nasabah.nik}</div>
              </div>
              <div>
                <div className='text-sm font-bold'>Nama Lengkap</div>
                <div>{nasabah.name}</div>
              </div>
              <div>
                <div className='text-sm font-bold'>Alamat</div>
                <div>{nasabah.address}</div>
              </div>
              <div>
                <div className='text-sm font-bold'>Jenis Kelamin</div>
                <div>{nasabah.gender}</div>
              </div>
              <div>
                <div className='text-sm font-bold'>Email</div>
                <div>{nasabah.email || "-"}</div>
              </div>
              <div>
                <div className='text-sm font-bold'>No. HP</div>
                <div>{nasabah.mobile}</div>
              </div>
              <div>
                <div className='text-sm font-bold'>Tanggal Registrasi</div>
                <div>{formatDate(nasabah.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-5 mt-4 md:mt-0'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid grid-cols-2 gap-2'>
              <div className='col-span-2 text-center bg-white rounded shadow border-b p-5'>
                <div className='text-xs font-bold'>
                  Total Saldo Rekening
                  {/* ({nasabah.rekening}) */}
                </div>
                <div className='block text-xl font-bold text-blue-500'>
                  {formatRp(saldo)}
                </div>
              </div>
              <button
                onClick={() => {
                  setModalData(nasabah);
                  setmodalTitle("Penarikan");
                  toggleModal();
                }}
                className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
              >
                <div className='inline-block pr-2 align-middle'>
                  <Icons.Minus />
                </div>
                <span className='inline-block align-middle'>Penarikan</span>
              </button>
              <button
                onClick={() => {
                  setModalData(nasabah);
                  setmodalTitle("Tabung");
                  toggleModal();
                }}
                className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
              >
                <div className='inline-block pr-2 align-middle'>
                  <Icons.Plus />
                </div>
                <span className='inline-block align-middle'>Tabung</span>
              </button>
            </div>
          </div>
          <div className='text-xl py-4'>Transaksi Terakhir</div>
          <Table>
            <TableHead>
              <TableCol>Tanggal</TableCol>
              <TableCol>Tipe Transaksi</TableCol>
              <TableCol>Nominal</TableCol>
              <TableCol>Keterangan</TableCol>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </TableCell>
                    <TableCell
                      className={`${
                        item.transactionType == "Tabung"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.transactionType}
                    </TableCell>
                    <TableCell
                      className={`${
                        item.transactionType == "Tabung"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {`${item.transactionType == "Pemasukan" ? "+ " : "- "}`}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.amount)}
                    </TableCell>
                    <TableCell>{item.note}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
export default Nasabah;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/` +
      context.params.id
  );
  const nasabah = await res.json();
  return {
    props: {
      nasabah,
      session,
    },
  };
}
