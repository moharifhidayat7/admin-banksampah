import React from "react";

function Card({ judul, gambar, total, alt, warna }) {
  return (
    <div className="flex justify-center md:block">
      <div className="bg-white  w-80 rounded-md shadow-lg overflow-hidden">
        <div className={`${warna} text-center text-lg font-bold text-gray-600`}>
          {judul}
        </div>
        <div className="flex justify-center  py-4 items-center w-full">
          <div className={`${warna} p-5 rounded-full`}>
            <img className="w-24" src={gambar} alt={alt} />
          </div>
        </div>
        <div className={`text-center text-gray-800 font-bold text-2xl mb-4`}>
          {total}
        </div>
      </div>
    </div>
  );
}

export default Card;
