import * as Icon from "heroicons-react";
import CardGudang from "../../../components/CardGudang";
import NavbarGudang from "../../../components/Navbar/NavbarGudang";
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCol,
} from "../../../components/Table";
import {useState} from 'react'
import * as Icons from 'heroicons-react'
import { register } from "react-scroll/modules/mixins/scroller";
import {useForm} from 'react-hook-form'

// Optional alamat,nohp,infolain
export default function Penjualan({sampahType}) {
   const { register, handleSubmit, setValue, reset, errors } = useForm();
   const [items, setItems] = useState([])
   const [qty, setQty] = useState(0);
   const [price, setPrice] = useState(0)
   const [temp, setTemp] = useState([]);

   const onSubmit = async (data) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahSale`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({...data, items: items, transactionDate: '2021-06-06'}),
     }).then(async (res) => {
         alert("Penjualan Sampah Berhasil");
         reset()
         setItems([])
     });
   }

   const handleAdd = (e) => {
      e.preventDefault();

      if (qty == 0) {
          return;
      }

      if (temp.length < 1) {
          return;
      }

      const find = items.filter((item) => item._sampahType._id == temp._id);

      if (find.length > 0) {
          const newItems = items.map((item) => {
              if (item._sampahType._id == temp._id) {
                  item.qty = qty;
                  item.price = price;
              }
              return item;
          });

          setItems(newItems);
      } else {
          setItems([...items, { _sampahType: temp, qty: qty, price: price }]);
      }
  };

  const formatRp = (number) => {
   return new Intl.NumberFormat("id-ID", {
       style: "currency",
       currency: "IDR",
   }).format(number);
};

  const handleDelete = (id) => {
      const find = items.filter((item) => item._sampahType._id != id);

      setItems(find);
  };

  const handleSelect = (e) => {
   const tipe = sampahType.filter(
       (jenis) => jenis._id == e.target.value
   )[0];
   setTemp({
       ...tipe,
   });
};

   return (
      <div>
         <NavbarGudang />
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white shadow-md m-4 lg:grid lg:grid-cols-3 lg:gap-4  rounded-sm p-2 space-y-4">
               <div className="space-y-4 lg:col-span-1">
                  <h3 className="flex text-gray-800 lg:hidden">
                     Penjualan Sampah
                  </h3>
                  <CardGudang title="Informasi Nota">
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>Kasir</label>
                           <input
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 bg-gray-200 px-0.5"
                              value="Admin"
                              disabled
                           />
                        </div>
                     </div>
                  </CardGudang>
                  <CardGudang title="Informasi Pembeli">
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>
                              Nama <span className="text-red-500">*</span>
                           </label>
                           <input
                              name="customer"
                              ref={register({required: true})}
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           />
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>Alamat</label>
                           <input
                              name="address"
                              ref={register()}
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           />
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>No. Hp</label>
                           <input
                              name="mobile"
                              ref={register()}
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           />
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>Keterangan</label>
                           <textarea
                           name="note"
                           ref={register()}
                           row="3"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           ></textarea>
                        </div>
                     </div>
                  </CardGudang>
               </div>
               <div className="flex flex-col lg:col-span-2 space-y-5 ">
                  <h3 className="lg:flex text-gray-800 hidden">
                     Penjualan Sampah
                  </h3>
                  <div className="flex flex-col  md:flex-row">
                     <div className="flex  lg:w-1/2 lg:flex-row md:items-center">
                        <label>Pilih Item:</label>
                        <select
                                    className='focus:outline-none mx-3 py-0.5 w-1/2 md:w-3/5 border px-0.5'
                                    defaultValue='0'
                                    onChange={handleSelect}
                                >
                                    <option value='0' disabled>
                                        Pilih Jenis Sampah
                                    </option>
                                    {sampahType.map((list) => {
                                        return (
                                            <option
                                                key={list._id}
                                                value={list._id}
                                            >
                                                {list.name}
                                            </option>
                                        );
                                    })}
                                </select>
                     </div>
                     <div className="flex lg:flex-row md:items-center">
                        <label>Qty:</label>
                        <input
                        value={qty}
                        onChange={(e)=>setQty(parseInt(e.target.value))}
                           type="number"
                           className="focus:outline-none mx-3 py-0.5 w-1/3 mt-2 md:mt-0 md:w-32 border px-0.5"
                        />
                     </div>
                     <div className="flex  lg:flex-row md:items-center">
                        <label>Harga Jual:</label>
                        <input
                        value={price}
                        onChange={(e)=>setPrice(parseInt(e.target.value))}
                           type="number"
                           className="focus:outline-none mx-3 py-0.5 w-1/3 mt-2 md:mt-0 md:w-3/5 border px-0.5"
                        />
                     </div>
                     <button type="button" onClick={handleAdd} className="py-1 mt-2 md:mt-0 px-4 bg-gray-300 font-medium">
                        Tambahkan
                     </button>
                  </div>
                  <div className="">
                  <Table>
                        <TableHead>
                            <TableCol>Jenis Sampah</TableCol>
                           
                            <TableCol>Qty.</TableCol>
                            <TableCol>Harga Jual</TableCol>
                            <TableCol></TableCol>
                        </TableHead>

                        <TableBody className='h-6'>
                            {items.map((item) => {
                                return (
                                    <TableRow key={item._sampahType._id}>
                                        <TableCell>
                                            <label>
                                                {item._sampahType.name}
                                            </label>
                                        </TableCell>
                                        <TableCell>
                                            <label>{item.qty}</label>
                                        </TableCell>
                                        <TableCell>
                                            <label>
                                                {formatRp(
                                                    item.price
                                                )}
                                            </label>
                                        </TableCell>
                                        <TableCell className='float-right'>
                                            <button
                                            type="button"
                                                className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDelete(
                                                        item._sampahType._id
                                                    );
                                                }}
                                            >
                                                <Icons.X />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                  </div>
                  <div>
                     <div className="flex justify-end mt-4 font-medium bg-blue-200 p-2 text-xl items-center">
                        Total : <p className="ml-4 mr-4">{formatRp(items.reduce((tot, item) => {
                return tot + parseInt(item.price)
            }, 0))}</p>
                     </div>
                     <div className="flex justify-end mt-2 space-x-10">
                     <button type="button" onClick={(e)=>{
                        reset();
                        setItems([])
                     }} className="py-1 px-10 bg-red-700 text-white ring ring-transparent hover:ring-red-700 focus:outline-none hover:bg-white hover:text-red-700">
                         Reset
                        </button>
                        <button type="submit" className="py-1 px-10 bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800">
                           Submit
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}
export async function getServerSideProps() {
   const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
   );
   const sampahType = await res.json();
   return {
       props: {
           sampahType,
       },
   };
}
