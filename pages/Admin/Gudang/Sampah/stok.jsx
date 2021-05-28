import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Layouts/AdminLayout";
import * as Icons from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";

function Stok({ priceList, transactions, sampahCategory }) {
    const [modal, setModal] = useState(false);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const delTransaction = async (id) => {
        await fetch("http://localhost:3000/api/sampahTransaction/" + id, {
            method: "DELETE",
        }).then((res) => {
            refreshData();
        });
    };

    const getQty = (sampahId) => {
      console.log(sampahId)
        const items = transactions.map((trx)=>{
          return trx.items
        })
        const group = items.filter(item => item.length>0)

        const qtt = group.map(g=>{
          return g.filter(s=>s._sampahType._id == sampahId._sampahType._id)
        })
        const total = qtt.reduce((total, item)=>{
          console.log(item[0])
          return total + item[0].qty
        },0)
        return total

    }

    return (
        <AdminLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'>Stok Sampah Gudang</h1>

                
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol className='w-32'>Jenis</TableCol>
                        <TableCol>Kategori</TableCol>
                        <TableCol>Quantity</TableCol>
                        <TableCol>Satuan</TableCol>
                        <TableCol>Harga Beli</TableCol>
                        <TableCol></TableCol>
                    </TableHead>

                    <TableBody>
                        {priceList.map((type, index) => {
                            if (type.price != 0) {
                            return (
                                <TableRow key={type._id}>
                                    <TableCell>
                                {type._sampahType.name}
                                    </TableCell>
                                    <TableCell>
                                    {
                                                            type._sampahType
                                                                ._category.name
                                                        }
                                    </TableCell>
                                    <TableCell>
                                      {/* {getQty(type)} */}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell
                                    >
                                        asdsd
                                    </TableCell>
                                    
                                    <TableCell className='float-right'>
                                    <button
                                            className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                                            
                                        >
                                            <Icons.Eye />
                                        </button>
                                        <button
                                            className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                            onClick={() =>
                                                delTransaction(trx._id)
                                            }
                                        >
                                            <Icons.Trash />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );}
                        })}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/sampahTransaction");
    const transactions = await res.json();
    const res2 = await fetch("http://localhost:3000/api/priceList");
    const priceList = await res2.json();
    const res3 = await fetch("http://localhost:3000/api/sampahCategory");
    const sampahCategory = await res3.json();
    return {
        props: {
            transactions,
            priceList,
            sampahCategory
        },
    };
}

export default Stok;
