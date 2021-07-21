import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SelectMenu from "@components/Input/SelectMenu";
import DatePicker from "react-datepicker";
import * as Icons from "heroicons-react";
import TambahItemModal from "@components/Modals/TambahItemModal";
import SearchSelect from "@components/Input/SearchSelect";
import AsyncCreatableSelect from "react-select/async-creatable";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";

export default function PembelianSampahForm({
  onSubmit,
  data = "",
  title,
  sampahType,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("CASH");
  const [tambahItemModal, setTambahItemModal] = useState(false);
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const [nasabah, setNasabah] = useState([]);
  const [tabung, setTabung] = useState(false);

  const router = useRouter();
  const handleCancel = (data) => {
    if (data != "") {
      router.back();
    } else {
      router.push(
        router.pathname.split("/").slice(0, -1).join("/"),
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  const handleDelete = (id) => {
    const find = items.filter((item) => item._id != id);

    setItems(find);
  };

  const formatRp = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const send = () => {
    if (items.length > 0) {
      onSubmit({
        nasabah,
        transactionType,
        transactionDate: selectedDate,
        note,
        items,
      });
    }
  };

  const searchNasabah = async (keyword) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile?keyword=${keyword}`
    ).then(async (res) => {
      return await res.json();
    });
    return result.rows.map((el) => {
      return {
        ...el,
        label: `${el.rekening} . ${el.name}`,
        value: el._id,
      };
    });
  };

  useEffect(() => {
    if (data != "") {
      setNasabah(data._nasabah ? data._nasabah : []);
      setTransactionType(data.transactionType);
      setSelectedDate(data.transactionDate);
      setNote(data.note ? data.note : "");
      setItems(data.items);
    }
  }, []);

  return (
    <div>
      <TambahItemModal
        title='Tambah Item'
        data={[]}
        items={items}
        setItems={setItems}
        show={tambahItemModal}
        setShow={setTambahItemModal}
        sampahType={sampahType}
      />
      <div className='bg-white py-2 px-4 rounded-md shadow-md border-gray-300 m-auto w-3/4'>
        <div>
          <h3 className='text-lg font-medium'>{title}</h3>
        </div>
        <div className='grid grid-cols-3 gap-5 mb-2'>
          <div>
            <div>
              <div>
                <div className='text-sm font-medium text-gray-700 py-2 '>
                  Nasabah
                </div>
                <AsyncCreatableSelect
                  instanceId='selectNasabah'
                  cacheOptions
                  defaultOptions
                  formatCreateLabel={(userInput) => `Tambahkan : ${userInput}`}
                  value={nasabah}
                  onChange={(e) => {
                    if (e.__isNew__) {
                      setTabung(true);
                      setTransactionType("CASH");
                    } else {
                      setTabung(false);
                      setTransactionType("TABUNG");
                    }
                    setNasabah(e);
                  }}
                  loadOptions={searchNasabah}
                />
              </div>
              <div>
                <div className='text-sm font-medium text-gray-700 py-2 '>
                  Tipe Transaksi
                </div>
                <div>
                  <label class='inline-flex items-center'>
                    <input
                      type='radio'
                      class='form-radio'
                      name='transactionType'
                      value='TABUNG'
                    />
                    <span class='ml-2'>TABUNG</span>
                  </label>
                  <label class='inline-flex items-center ml-6'>
                    <input
                      type='radio'
                      class='form-radio'
                      name='transactionType'
                      value='CASH'
                    />
                    <span class='ml-2'>CASH</span>
                  </label>
                </div>
              </div>
              <div className='w-full'>
                <div className='text-sm font-medium text-gray-700 py-2 '>
                  Tanggal Transaksi
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                  selectsRang
                  nextMonthButtonLabel='>'
                  previousMonthButtonLabel='<'
                />
              </div>

              <div>
                <div className='text-sm font-medium text-gray-700 py-2 '>
                  Keterangan
                </div>
                <textarea
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  rows='4'
                  className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
                />
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex justify-between items-center'>
              <div className='text-sm font-medium text-gray-700 py-2 '>
                Item
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
                  <TableCol>Harga Satuan</TableCol>
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
                            {formatRp(item.price)}/{item.denom}
                          </TableCell>
                          <TableCell>
                            {formatRp(item.qty * item.price)}
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
          </div>
        </div>
        <div className='flex justify-end w-full'>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                send();
              }}
              type='button'
              className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              type='button'
              className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
