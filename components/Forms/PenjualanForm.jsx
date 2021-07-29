import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TambahItemPenjualanModal from "@components/Modals/TambahItemPenjualanModal";
import * as Icons from "heroicons-react";
import DatePicker from "react-datepicker";
import { formatRp } from "@helpers/functions";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";

export default function Penjualan({ onSubmit, sampahType, sampahCategory }) {
  const { register, handleSubmit, setValue, getValues, watch, reset, errors } =
    useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tambahItemModal, setTambahItemModal] = useState(false);
  const [items, setItems] = useState([]);

  const typeOptions = sampahCategory.results.map((cat) => {
    return {
      label: cat.name,
      options: sampahType.results
        .filter((type) => type._category._id == cat._id)
        .map((el) => {
          return {
            label: el.name,
            value: el._id,
            ...el,
          };
        }),
    };
  });

  const handleDelete = (id) => {
    const find = items.filter((item) => item._id != id);

    setItems(find);
  };

  return (
    <div>
      <TambahItemPenjualanModal
        title='Tambah Item'
        items={items}
        setItems={setItems}
        show={tambahItemModal}
        setShow={setTambahItemModal}
        sampahType={typeOptions}
      />
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(e, items);
          reset();
          setItems([]);
        })}
      >
        <div className='w-full sm:w-full md:w-3/4 m-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 mb-2 py-2 px-4'>
            <div>
              <div>
                <div>
                  <div className='text-sm font-medium text-gray-700 py-2 '>
                    Pembeli
                  </div>
                  <input
                    type='text'
                    name='customer'
                    ref={register()}
                    className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
                  />
                </div>
                <div className='w-full'>
                  <div className='text-sm font-medium text-gray-700 py-2 '>
                    Tanggal Transaksi
                  </div>
                  <input
                    type='text'
                    name='transactionDate'
                    value={selectedDate}
                    ref={register()}
                    readOnly={true}
                    hidden
                  />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    nextMonthButtonLabel='>'
                    previousMonthButtonLabel='<'
                  />
                </div>

                <div>
                  <div className='text-sm font-medium text-gray-700 py-2 '>
                    Keterangan
                  </div>
                  <textarea
                    name='note'
                    ref={register()}
                    rows='4'
                    className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
                  />
                </div>
              </div>
            </div>
            <div className='col-span-2'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-medium text-gray-700 py-2 '>
                  Item <span className='text-red-500'>*</span>
                </div>
                <div>
                  <button
                    onClick={() => setItems([])}
                    type='button'
                    className='text-sm px-3 bg-red-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                  >
                    <Icons.Refresh
                      size='1rem'
                      className='inline-block align-middle'
                    />
                    <span className='align-middle'>Reset</span>
                  </button>
                  <button
                    onClick={() => setTambahItemModal(!tambahItemModal)}
                    type='button'
                    className='text-sm px-3 bg-green-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                  >
                    <Icons.Plus
                      size='1rem'
                      className='inline-block align-middle'
                    />
                    <span className='align-middle'>Tambah Item</span>
                  </button>
                </div>
              </div>
              <div className='w-full overflow-x-auto rounded-md'>
                <Table>
                  <TableHead>
                    <TableCol className='w-16'>No.</TableCol>
                    <TableCol>Jenis Sampah</TableCol>
                    <TableCol className='w-16'>Qty</TableCol>
                    <TableCol>Harga</TableCol>
                    <TableCol className='w-16'>Jumlah</TableCol>
                    <TableCol></TableCol>
                  </TableHead>
                  <TableBody>
                    {items.length > 0 &&
                      items.map((item, i) => {
                        return (
                          <TableRow key={item._id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>
                              {formatRp(item.buyerPrice)}/{item.unit}
                            </TableCell>
                            <TableCell>
                              {formatRp(item.qty * item.buyerPrice)}
                            </TableCell>
                            <TableCell className='text-right'>
                              <button
                                onClick={() => handleDelete(item._id)}
                                type='button'
                                className='text-sm bg-red-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                              >
                                <Icons.X size='1rem' />
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
              <div className='text-right py-2 text-lg font-medium'>
                TOTAL :{" "}
                {formatRp(
                  items.reduce((total, item) => {
                    return total + item.buyerPrice * item.qty;
                  }, 0)
                )}
              </div>
            </div>
          </div>
          <div className='py-2 flex justify-end'>
            <div>
              <button
                type='submit'
                className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  reset();
                }}
                type='button'
                className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
