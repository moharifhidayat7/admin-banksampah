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

export default function Pembelian() {
   return (
      <div>
         <NavbarGudang />
         <form action="">
            <div className="bg-white shadow-md m-4 lg:grid lg:grid-cols-3 lg:gap-4  rounded-sm p-2 space-y-4">
               <div className="space-y-4 lg:col-span-1">
                  <div className="flex lg:hidden flex-col space-y-2 md:flex-row md:space-y-0  justify-between">
                     <h3 className="flex text-gray-800">
                        <Icon.ShoppingCart /> Gudang <Icon.ChevronRight />
                        Pembelian
                     </h3>
                     <h3 className="text-gray-800 ">
                        Sisa Saldo Gudang : <strong>Rp.192.168.001</strong>
                     </h3>
                  </div>
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
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>Tanggal</label>
                           <input
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 bg-gray-200 px-0.5"
                              value="15-12-2021"
                              disabled
                           />
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="flex  justify-between items-center">
                           <label>Tipe Transaksi</label>
                           <select
                              name="transactionType"
                              className="focus:outline-none py-0.5 w-1/2 border px-0.5"
                           >
                              <option value="TABUNG">TABUNG</option>
                              <option value="CASH ">CASH </option>
                           </select>
                        </div>
                     </div>
                  </CardGudang>
                  <CardGudang title="Informasi Penjual/Nasabah">
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>Nama</label>
                           <input
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           />
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>Alamat</label>
                           <input
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           />
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="flex justify-between items-center">
                           <label>No. Hp</label>
                           <input
                              type="text"
                              className="py-0.5 focus:outline-none w-1/2 border px-0.5"
                           />
                        </div>
                     </div>
                  </CardGudang>
               </div>
               <div className="flex flex-col  lg:col-span-2 space-y-5">
                  <div className="lg:flex hidden lg:justify-between">
                     <h3 className="flex text-gray-800">
                        <Icon.ShoppingCart /> Gudang <Icon.ChevronRight />
                        Pembelian
                     </h3>
                     <h3 className="text-gray-800 ">
                        Sisa Saldo Gudang : <strong>Rp.192.168.001</strong>
                     </h3>
                  </div>

                  <div className="flex flex-col md:items-center md:flex-row">
                     <div className="flex  lg:w-1/2 lg:flex-row md:items-center">
                        <label>Pilih Item:</label>
                        <select
                           name="item"
                           className="focus:outline-none mx-3 py-0.5 w-1/2 md:w-3/5 border px-0.5"
                        >
                           <option value="Kardus">Kardus</option>
                        </select>
                     </div>
                     <div className="flex  lg:flex-nowrap md:items-center">
                        <label>Qty:</label>
                        <input
                           type="number"
                           className="focus:outline-none mx-3 py-0.5 w-1/3 mt-2 md:mt-0 md:w-3/5 border px-0.5"
                        />
                     </div>
                     <button className="py-1 mt-2 md:mt-0 px-4 bg-gray-300 font-medium">
                        Tambahkan
                     </button>
                  </div>
                  <div className="max-h-52 h-36 overflow-y-auto">
                     <Table>
                        <TableHead>
                           <TableCol>#</TableCol>
                           <TableCol>ID</TableCol>
                           <TableCol>Item</TableCol>
                           <TableCol>Harga</TableCol>
                           <TableCol>Qty</TableCol>
                           <TableCol>Sub Total</TableCol>
                           <TableCol></TableCol>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell>12312</TableCell>
                              <TableCell>Kardus</TableCell>
                              <TableCell>Rp.12002</TableCell>
                              <TableCell>21</TableCell>
                              <TableCell>Rp.12133</TableCell>
                              <TableCell>
                                 <button className="bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-0.5 text-white">
                                    <Icon.X />
                                 </button>
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </div>
                  <div>
                     <div className="flex justify-end mt-4 font-medium bg-blue-200 p-2 text-xl items-center">
                        Total : <p className="ml-4 mr-4">Rp.2042818</p>
                     </div>
                     <div className="flex flex-col items-end">
                        <div>
                           Bayar :
                           <input
                              type="number"
                              className="focus:outline-none border mt-2 ml-4 w-32"
                           />
                        </div>
                        <div>
                           Kembali :
                           <input
                              type="number"
                              className="focus:outline-none border mt-2 ml-4 w-32"
                              value="233.334"
                              disabled
                           />
                        </div>
                     </div>
                     <div className="flex justify-end mt-2 space-x-10">
                        <button className="py-1 px-10 bg-red-700 text-white ring ring-transparent hover:ring-red-700 focus:outline-none hover:bg-white hover:text-red-700">
                           Reset
                        </button>
                        <button className="py-1 px-10 bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800">
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
