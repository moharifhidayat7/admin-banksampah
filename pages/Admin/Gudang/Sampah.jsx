import AdminLayout from "../../../components/Layouts/AdminLayout";
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCol,
} from "../../../components/Table";
import { useState, useReducer } from "react";
import * as Icons from "heroicons-react";
const formState = {
   jenisSampah: "",
   satuan: "",
   harga: 0,
};

const formReducer = (state, action) => {
   switch (action.type) {
      case "update":
         return { ...state, ...action.data };
      case "reset":
         return formState;
      default:
         return state;
   }
};

function Sampah() {
   const [formData, dispatch] = useReducer(formReducer, formState);

   const [data, setData] = useState([
      { jenisSampah: "Kardus", satuan: "Kg", harga: 255336 },
   ]);

   const createHandler = (e) => {
      e.preventDefault();
      setData([...data, formData]);
      dispatch({ type: "reset" });
   };

   const numOnly = (e) => {
      let regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
         dispatch({ type: "update", data: { harga: e.target.value } });
      }
   };
   return (
      <AdminLayout>
         <h1 className="text-4xl mb-5">Harga Sampah</h1>
         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <div className="col-span-2">
               <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
                  <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
                     <Table>
                        <TableHead>
                           <TableCol>Jenis Sampah</TableCol>
                           <TableCol>Satuan</TableCol>
                           <TableCol>Harga</TableCol>
                           <TableCol>Action</TableCol>
                        </TableHead>
                        <TableBody data={data}>
                           {data.map((row, index) => {
                              return (
                                 <TableRow key={index}>
                                    <TableCell>{row.jenisSampah}</TableCell>
                                    <TableCell>{row.satuan}</TableCell>
                                    <TableCell>{row.harga}</TableCell>
                                    <TableCell>X</TableCell>
                                 </TableRow>
                              );
                           })}
                        </TableBody>
                     </Table>
                  </div>
               </div>
            </div>
            <div>
               <div className="bg-white mb-4 dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
                  <div className="px-5 pt-5 pb-2">
                     <h1 className="text-gray-800 font-bold">
                        Tambah Jenis Sampah
                     </h1>
                  </div>
                  <div className="px-5 pb-5 flex justify-center">
                     <div className="w-full">
                        <div>
                           <label>Jenis Sampah</label>
                           <input
                              className="block mt-2 focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border"
                              placeholder="Masukkan Jenis Sampah"
                              value={formData.jenisSampah}
                              onChange={(e) =>
                                 dispatch({
                                    type: "update",
                                    data: {
                                       jenisSampah: e.target.value,
                                    },
                                 })
                              }
                           />
                        </div>
                        <div>
                           <label>Kategory</label>
                           <select className="block px-4 py-3 w-full border rounded mb-2 mt-2">
                              <option value="1">Tes</option>
                           </select>
                        </div>
                        <div>
                           <label>Satuan</label>
                           <input
                              className="block mt-2 focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border"
                              placeholder="Masukkan Satuan"
                              value={formData.satuan}
                              onChange={(e) =>
                                 dispatch({
                                    type: "update",
                                    data: {
                                       satuan: e.target.value,
                                    },
                                 })
                              }
                           />
                        </div>
                        <div>
                           <label>Harga</label>
                           <input
                              onChange={numOnly}
                              value={formData.harga}
                              pattern="[0-9]*"
                              className="block appearance-none mt-2 bg-white focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border"
                              placeholder="Masukkan Harga"
                           />
                        </div>

                        <button
                           type="button"
                           onClick={createHandler}
                           className="block bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 py-1 text-white font-bold"
                        >
                           Tambah
                        </button>
                     </div>
                  </div>
               </div>
               <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
                  <div className="px-5 pt-5 pb-2">
                     <h1 className="text-gray-800 font-bold">Kategori</h1>
                  </div>
                  <div className="px-5 pb-5 flex justify-center">
                     <div className="w-full">
                        <div>
                           <input
                              className="block mt-2 focus:outline-none px-4 py-3 focus:bg-white mb-2 rounded w-full focus:ring-blue-300 focus:ring-2 border"
                              placeholder="Masukkan Kategori"
                           />
                        </div>

                        <button
                           type="button"
                           className="block bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 py-1 text-white font-bold"
                        >
                           Tambah
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </AdminLayout>
   );
}

export default Sampah;

