import PenjualanLayout from "../../../components/Layouts/PenjualanLayout";
import DashboardCard from "../../../components/DashboardCard";
import {
  UserGroupOutline,
  UserAddOutline,
  SwitchVerticalOutline,
  PlusOutline,
  CashOutline,
} from "heroicons-react";
export default function Index() {
   return (
      <PenjualanLayout>
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <DashboardCard
               borderColor="border-green-400"
               textColor="text-green-500"
               icon={
                  <SwitchVerticalOutline className="text-green-500" size="100%" />
               }
               title="Total Pemasukan Penjualan Produk"
               value="Rp. 353365959"
            />
            <DashboardCard
               borderColor="border-yellow-400"
               textColor="text-yellow-500"
               icon={
                  <SwitchVerticalOutline className="text-yellow-500" size="100%" />
               }
               title="Total Produk di Etalase"
               value="250 Produk"
            />
         </div>
      </PenjualanLayout>
   );
}
