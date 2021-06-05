import NavbarBendahara from "../../../components/Navbar/NavbarBendahara";
import CardGudang from "../../../components/CardGudang";
import * as Icon from "heroicons-react";
export default function Pendaftaran() {
   return (
      <div>
         <NavbarBendahara />
         <div className="m-4 lg:flex lg:justify-center ">
            <div className="bg-white z-50 lg:w-3/5 p-2 flex flex-col shadow-lg ">
               <h3 className="text-center uppercase font-medium mb-4">
                  Daftar Nasabah Bank Sampah
               </h3>
               <form action="">
                  <div className="mx-10 flex flex-col  my-4 space-y-3">
                     <div className="lg:flex lg:justify-between lg:space-x-2 lg:mx-20">
                        <div className="flex flex-col lg:w-1/2">
                           <label htmlFor="">
                              NIK <span className="text-red-600">*</span>
                           </label>
                           <input
                              placeholder="112233"
                              type="text"
                              className="border-b-2 focus:outline-none hover:border-pink-500"
                           />
                        </div>
                        <div className="flex flex-col lg:w-1/2">
                           <label htmlFor="">
                              Nama <span className="text-red-600">*</span>
                           </label>
                           <input
                              placeholder="John"
                              type="text"
                              className="border-b-2 focus:outline-none hover:border-pink-500"
                           />
                        </div>
                     </div>
                     <div className="lg:flex lg:justify-between lg:space-x-2 lg:mx-20">
                        <div className="flex flex-col lg:w-1/2">
                           <label htmlFor="">
                              Tanggal Lahir
                              <span className="text-red-600"> *</span>
                           </label>
                           <input
                              type="date"
                              className="border-b-2 focus:outline-none hover:border-pink-500"
                           />
                        </div>
                        <div className="flex flex-col lg:w-1/2">
                           <label htmlFor="">
                              Jenis Kelamin{" "}
                              <span className="text-red-600">*</span>
                           </label>
                           <select
                              name=""
                              className="border-b-2 lg:mt-0.5 focus:outline-none hover:border-pink-500"
                              id=""
                           >
                              <option value="Laki-Laki">Laki-Laki</option>
                              <option value="Perempuan">Perempuan</option>
                           </select>
                        </div>
                     </div>
                     <div className="lg:flex lg:justify-between lg:space-x-2 lg:mx-20">
                        <div className="flex flex-col lg:w-1/2">
                           <label htmlFor="">
                              No. Hp <span className="text-red-600">*</span>
                           </label>
                           <input
                              placeholder="082XXXXXX"
                              type="number"
                              className="border-b-2 focus:outline-none hover:border-pink-500"
                           />
                        </div>

                        <div className="flex flex-col lg:w-1/2">
                           <label htmlFor="">
                              Keanggotaan{" "}
                              <span className="text-red-600">*</span>
                           </label>
                           <select
                              name=""
                              className="border-b-2 focus:outline-none hover:border-pink-500"
                              id=""
                           >
                              <option value="Kelompok">Kelompok</option>{" "}
                              <option value="Umum">Umum</option>
                           </select>
                        </div>
                     </div>
                     <div className="flex flex-col lg:px-20">
                        <label htmlFor="">Email</label>
                        <input
                           placeholder="example@gmail.com"
                           type="email"
                           className="border-b-2 focus:outline-none hover:border-pink-500"
                        />
                     </div>
                     <div className="flex flex-col lg:px-20">
                        <label htmlFor="">
                           Scan KTP <span className="text-red-600">*</span>
                        </label>
                        <input
                           type="file"
                           className="border-b-2 pb-1 focus:outline-none hover:border-pink-500"
                        />
                     </div>
                     <button className="py-1 px-10 lg:mx-20 bg-blue-800  text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800">Create</button>
                  </div>
                
               </form>
            </div>
         </div>
         {/*  */}
         <div className="hidden fixed bottom-0">
            <img
               className="bottom-48  left-28   rounded-full w-52 shadow-lg border-2 overflow-hidden"
               src="https://image.freepik.com/free-vector/staff-is-presenting-plan-via-video-call_1150-43199.jpg"
               alt=""
            />
            <img
               className="bottom-4 left-2   rounded-full w-52 shadow-lg border-2 overflow-hidden"
               src="https://image.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg"
               alt=""
            />
            <img
               className="bottom-4 left-36 rounded-full w-52 shadow-lg border-2 overflow-hidden"
               src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg"
               alt=""
            />
         </div>
      </div>
   );
}
