import {
    UserGroupOutline,
    UserAddOutline,
    SwitchVerticalOutline,
    PlusOutline,
    CashOutline,
} from "heroicons-react";

import AdminLayout from "../components/Layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";

export default function tes() {
    return (
        <AdminLayout>
            <div className='flex flex-wrap'>
                <DashboardCard
                    borderColor='border-green-400'
                    icon={
                        <SwitchVerticalOutline
                            className='text-gray-500'
                            size='100%'
                        />
                    }
                    title='Total Pengeluaran Tunai'
                    value='Rp. 353365959'
                />
                <DashboardCard
                    borderColor='border-green-400'
                    icon={
                        <SwitchVerticalOutline
                            className='text-gray-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Total Sampah Yang Ditabung'
                    value='Rp. 353365959'
                />
                <DashboardCard></DashboardCard>
            </div>
        </AdminLayout>
    );
}
