import PenjualanLayout from "../../../components/Layouts/PenjualanLayout";
import DashboardCard from "../../../components/DashboardCard";
import {
    UserGroupOutline,
    UserAddOutline,
    SwitchVerticalOutline,
    CollectionOutline,
    CashOutline,
} from "heroicons-react";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Index({ products, orders }) {
    const [product, setProduct] = useState(0);
    const [pemasukan, setPemasukan] = useState(0);
    const router = useRouter();
    useEffect(() => {
        setProduct(products.length);
        setPemasukan(() => {
            return orders.reduce((total, item) => {
                const sub = item.items.reduce((tot, prod) => {
                    return tot + prod._product.price * prod.qty;
                }, 0);
                return total + sub;
            }, 0);
        });
    }, []);

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <PenjualanLayout>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                <DashboardCard
                    borderColor='border-green-400'
                    textColor='text-green-500'
                    icon={
                        <SwitchVerticalOutline
                            className='text-green-500'
                            size='100%'
                        />
                    }
                    title='Total Pemasukan Penjualan Produk'
                    value={formatRp(pemasukan)}
                />
                <DashboardCard
                    borderColor='border-yellow-400'
                    textColor='text-yellow-500'
                    icon={
                        <CollectionOutline
                            className='text-yellow-500'
                            size='100%'
                        />
                    }
                    title='Total Produk di Etalase'
                    value={product + " Produk"}
                />
            </div>
            {/* <div className='my-4'>
            <div className="bg-white rounded shadow-md hidden sm:hidden md:hidden lg:block">
               <div className="border-gray-300 border-b p-5">
                  <h1 className="text-gray-800 font-bold">
                     Notifikasi Pembelian Produk Online
                  </h1>
               </div>
               <div>
                  <div className="flex items-center space-x-5 px-5 py-2 bg-yellow-100 border-gray border-b">
                     <div className="flex-grow">
                        <small className="font-bold">Kompos 15Kg (2 pcs)</small>
                        <span className="text-xs ml-2 text-gray">
                           Iis Dahlila
                        </span>
                        <div>
                           <small>
                              Dusun Kampunganyar RT 02 RW 05 Desa Gumuk,
                              Kecamatan Licin
                           </small>
                        </div>
                     </div>
                     <div className="flex-none">
                        <button className="text-xs rounded bg-green-500 text-white py-1 px-2">
                           X
                        </button>
                     </div>
                  </div>
                  <div className="flex items-center space-x-5 px-5 py-2 border-gray border-b">
                     <div className="flex-grow">
                        <small className="font-bold">Pot (2 pcs)</small>
                        <span className="text-xs ml-2 text-gray">
                         Slamet
                        </span>
                        <br />
                        <small>
                           Dusun Kampunganyar RT 02 RW 05 Desa Gumuk, Kecamatan
                           Licin
                        </small>
                     </div>
                     <div className="flex-none"></div>
                  </div>
                   <div className="text-center text-sm p-4">
                  Akan Tersedia Saat Online
                  </div>
               </div>
            </div>
         </div> */}
        </PenjualanLayout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/order`);
    const orders = await res.json();

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product`);
    const products = await res2.json();

    return {
        props: {
            orders,
            products,
        },
    };
}
