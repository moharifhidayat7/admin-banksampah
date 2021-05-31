import Card from "../../components/Card";
export default function PembelianProduk() {
   return (
      <>
         <div className="fixed top-0 w-full">
            <div className="bg-gradient-to-l from-green-300 to-yellow-300 h-12 shadow-lg flex items-center">
               <p className='text-center w-full font-mono font-bold text-lg'>KASIR PEMBELIAN PRODUK</p>
            </div>
         </div>
         <div className="grid grid-cols-3 mt-16 gap-5 px-8">
            <div className="col-span-2">
               <div className="text-2xl mb-2"> Etalase Produk</div>
               {/* Tes */}
               <div className="grid grid-cols-3 my-2">
                  <Card
                     img="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2019/12/29/3541851566.jpg"
                     stok="20"
                     title="kompos"
                     berat="15kg"
                     deskripsi="Kompos adalah anuna nunauanusn"
                     harga="2000.000.000"
                  />
                  <Card />
                  <Card />
               </div>
            </div>
            <div>
               <div className="text-2xl mb-2">Keranjang</div>
               <div className="bg-white rounded-xl p-2 px-4 ">
                  <p className="font-semibold mb-4">Ringkasan belanja</p>
                  <div className="flex justify-between font-mono text-gray-600">
                     <p>Kompos 15Kg (3 pcs)</p>
                     <p>Rp.200.020.000</p>
                  </div>
                  <div className="flex justify-between font-mono text-gray-600">
                     <p>Pot (1 pcs)</p>
                     <p>Rp.120.000</p>
                  </div>
                  <hr />
                  <div className="my-4 font-semibold flex justify-between">
                     <p>Total Harga</p>
                     <p>Rp.203.301.333</p>
                  </div>
                  <button className="text-lg font-bold text-white bg-green-500 w-full rounded-md py-2 hover:bg-green-600 transition">
                     Beli
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}
