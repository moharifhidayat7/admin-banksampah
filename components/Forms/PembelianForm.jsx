import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import TambahItemModal from "@components/Modals/TambahItemModal";
import * as Icons from "heroicons-react";
import { formatRp } from "@helpers/functions";
import DatePicker from "react-datepicker";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";

export default function Pembelian({ onSubmit, sampahType, sampahCategory }) {
  const { register, handleSubmit, setValue, getValues, watch, reset, errors } =
    useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tambahItemModal, setTambahItemModal] = useState(false);
  const [items, setItems] = useState([]);
  const [tabung, setTabung] = useState(false);

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

  const searchNasabah = async (keyword) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile?keyword=${keyword}`
    ).then(async (res) => {
      return await res.json();
    });
    return result.rows.map((el) => {
      return {
        label: `${el.rekening} . ${el.name}`,
        value: el._id,
      };
    });
  };

  return (
    <div>
      <TambahItemModal
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
        })}
      >
        <div className='w-full sm:w-full md:w-3/4 m-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 mb-2 py-2 px-4'>
            <div>
              <div>
                <div>
                  <div className='text-sm font-medium text-gray-700 py-2 '>
                    Nasabah
                  </div>
                  <input type='text' name='_nasabah' ref={register()} hidden />
                  <input type='text' name='customer' ref={register()} hidden />
                  <AsyncCreatableSelect
                    instanceId='selectNasabah'
                    cacheOptions
                    defaultOptions
                    isClearable={true}
                    formatCreateLabel={(userInput) =>
                      `Tambahkan : ${userInput}`
                    }
                    onChange={(e) => {
                      if (e === null) {
                        setValue("customer", "");
                        setValue("_nasabah", "");
                        setValue("transactionType", "CASH");
                        setTabung(false);
                        return;
                      }
                      if (e.__isNew__) {
                        setValue("customer", e.value);
                        setValue("_nasabah", "");
                        setValue("transactionType", "CASH");
                        setTabung(false);
                      } else {
                        setValue("_nasabah", e.value);
                        setValue("customer", "");
                        setTabung(true);
                      }
                    }}
                    loadOptions={searchNasabah}
                  />
                </div>
                <div>
                  <div className='text-sm font-medium text-gray-700 py-2 '>
                    Tipe Transaksi <span className='text-red-500'>*</span>
                  </div>
                  <div>
                    <label className='inline-flex items-center'>
                      <input
                        type='radio'
                        className='form-radio'
                        name='transactionType'
                        ref={register({ required: true })}
                        value='TABUNG'
                        disabled={!tabung ? "disabled" : ""}
                      />
                      <span
                        className={`ml-2 ${!tabung ? "text-gray-400" : ""}`}
                      >
                        TABUNG
                      </span>
                    </label>
                    <label className='inline-flex items-center ml-6'>
                      <input
                        type='radio'
                        className='form-radio'
                        name='transactionType'
                        ref={register({ required: true })}
                        value='CASH'
                      />
                      <span className='ml-2'>CASH</span>
                    </label>
                  </div>
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
                              {formatRp(item.price)}/{item.unit}
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
              <div className='text-right py-2 text-lg font-medium'>
                TOTAL :{" "}
                {formatRp(
                  items.reduce((total, item) => {
                    return total + item.price * item.qty;
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
