import BhrLayout from "../../../components/Layouts/BhrLayout";

import DashboardCard from "../../../components/DashboardCard";
import {
    UserGroupOutline,
    UserAddOutline,
    SwitchVerticalOutline,
    PlusOutline,
    CashOutline,
} from "heroicons-react";

function index() {
    return (
        <BhrLayout>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                <DashboardCard
                    borderColor='border-red-400'
                    textColor='text-red-500'
                    icon={
                        <SwitchVerticalOutline
                            className='text-red-500'
                            size='100%'
                        />
                    }
                    title='Total Pengeluaran Tunai'
                    value='Rp. 353365959'
                />
                <DashboardCard
                    borderColor='border-green-400'
                    icon={
                        <CashOutline
                            className='text-green-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Total Pemasukan Bank'
                    value='Rp. 353365959'
                />
                <DashboardCard
                    borderColor='border-blue-400'
                    icon={
                        <CashOutline
                            className='text-blue-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Total Sampah Masuk'
                    value='562623 Kg'
                />
            </div>
        </BhrLayout>
    );
}

export default index;
