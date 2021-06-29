import PenjualanLayout from "../../../components/Layouts/PenjualanLayout";
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCol,
} from "../../../components/Table";
export default function DetailTransaksi() {
   return (
      <PenjualanLayout>
         <div className="text-2xl mb-2">Detail Transaksi Penjualan Produk</div>
         <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
           <Table>
            <TableHead>
               <TableCol>Nama Produk</TableCol>
               <TableCol>Jumlah Produk</TableCol>
               <TableCol>Total Harga</TableCol>
               <TableCol>Pembeli</TableCol>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Kompos</TableCell>
                <TableCell>3</TableCell>
                <TableCell>300.000</TableCell>
                <TableCell>Iis Dahlila</TableCell>
              </TableRow>
            </TableBody>
            </Table>
         </div>
      </PenjualanLayout>
   );
}
