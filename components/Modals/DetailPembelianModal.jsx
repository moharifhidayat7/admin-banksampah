import Modal from "@components/Modal";
import { formatRp } from "@helpers/functions";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";

const DetailPembelianModal = ({ title, data, show, toggleShow, onDelete }) => {
  const router = useRouter();
  return (
    <Modal
      title={title}
      show={show}
      toggleShow={toggleShow}
      className='md:w-1/2'
      zClass='z-30'
    >
      <Modal.Content>
        <div>
          <div>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='w-1/5'></th>
                  <th></th>
                  <th className='w-1/5'></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border px-5 py-2'>Nama Penjual</td>
                  <td className='border px-5 py-2'>
                    {data._nasabah ? data._nasabah.name : data.customer}
                  </td>
                  <td className='border px-5 py-2'>No. Transaksi</td>
                  <td className='border px-5 py-2'>{data.invoice_id}</td>
                </tr>
                <tr>
                  <td className='border px-5 py-2'>Alamat</td>
                  <td className='border px-5 py-2'>
                    {data._nasabah && data.address}
                  </td>
                  <td className='border px-5 py-2'>Tanggal Transaksi</td>
                  <td className='border px-5 py-2'>
                    {new Date(data.transactionDate).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className='border px-5 py-2'>Keterangan</td>
                  <td className='border px-5 py-2'>{data.note}</td>
                  <td className='border px-5 py-2'>Jenis Transaksi</td>
                  <td className='border px-5 py-2'>{data.transactionType}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='w-full overflow-x-auto rounded-md py-4'>
            <Table>
              <TableHead>
                <TableCol className='w-16'>No.</TableCol>
                <TableCol>Jenis Sampah</TableCol>
                <TableCol className='w-16'>Qty</TableCol>
                <TableCol>Harga Satuan</TableCol>
                <TableCol className='w-16'>Jumlah</TableCol>
              </TableHead>
              <TableBody>
                {data.items &&
                  data.items.map((item, i) => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item._sampahType.name}</TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>
                          {formatRp(item._sampahType.price)}/
                          {item._sampahType.unit}
                        </TableCell>
                        <TableCell>
                          {formatRp(item.qty * item._sampahType.price)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className='flex justify-between items-center'>
          <div className='text-lg font-medium'>
            Total : {formatRp(data.total)}
          </div>
          <div>
            <a
              href={router.pathname + "/print/" + data._id}
              target='_blank'
              className='font-medium px-3 bg-yellow-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-yellow-500 hover:text-yellow-500 focus:outline-none p-1 text-white'
            >
              Print
            </a>
            <button
              onClick={() => {
                onDelete();
                toggleShow();
              }}
              type='button'
              className='font-medium px-3 bg-red-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
            >
              Hapus
            </button>
            <button
              onClick={toggleShow}
              type='button'
              className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
            >
              Batal
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default DetailPembelianModal;
