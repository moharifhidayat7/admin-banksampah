import { SearchOutline } from "heroicons-react";
import * as Smooth from "react-scroll";
export default function NavbarProduk() {
  return (
    <div id='home' className="top-0 relative mb-4 w-full">
    <div className="h-24 bg-white flex justify-between items-center px-14 pb">
       <div className="flex">
          <div className="font-thin font-bold text-4xl text-blue-800 mr-24">
             KASIR
          </div>
          <div className="flex items-center space-x-10 mr-10">
             <Smooth.Link to="kreatif" smooth>
                <button className="font-sans focus:outline-none focus:border-pink-500  text-xl border-b-2 border-transparent hover:border-pink-500 transform hover:scale-105 py-1">
                   Kreatif
                </button>
             </Smooth.Link>

             <Smooth.Link to="kompos" smooth>
                <button className="font-sans focus:outline-none focus:border-pink-500 text-xl border-b-2 border-transparent hover:border-pink-500 transform hover:scale-105 py-1 ">
                   Kompos
                </button>
             </Smooth.Link>
             <Smooth.Link to="allproduct" smooth>
                <button className="font-sans focus:outline-none focus:border-pink-500 text-xl border-b-2 border-transparent hover:border-pink-500 transform hover:scale-105 py-1 ">
                  All Product
                </button>
             </Smooth.Link>
          </div>

          <div className="text-gray-400 flex items-center focus-within:text-pink-500">
             <SearchOutline size="1.2rem" className="z-10" />
             <input
                className="flex border-b-2  -ml-4 pl-5 border-gray-400 items-center text-lg transform w-28 focus:w-60 duration-300 focus:text-gray-500  focus:scale-105 focus:border-pink-500  focus:outline-none"
                type="search"
                name="cari"
                id="cariProduk"
                placeholder="Search"
             />
          </div>
       </div>
       <div>Login</div>
    </div>
 </div>
  )
}
