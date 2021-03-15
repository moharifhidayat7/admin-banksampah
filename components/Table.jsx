const Row = () => {
    return (
        <tr class='h-12 border-gray-300 border-b'>
            <td class='text-sm pl-8 pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'></td>
            <td class='text-sm pl-8 pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
                #MC10023
            </td>
            <td class='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
                Toyota Motors
            </td>
            <td class='pr-6 whitespace-no-wrap'>
                <div class='flex items-center'>
                    <p class='ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm'>
                        Carrie AnthonyCarrie
                    </p>
                </div>
            </td>
            <td class='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
                $2,500
            </td>
            <td class='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
                02.03.20
            </td>
        </tr>
    );
};

const Col = ({ children }) => {
    return (
        <th class='dark:text-gray-400 font-normal pl-8 pr-6 text-left text-sm tracking-normal leading-4'>
            {children}
        </th>
    );
};

const Head = ({ children }) => {
    return (
        <tr class='w-full h-12 bg-gray-700 text-white border-gray-300 border-b py-8'>
            {children}
        </tr>
    );
};

const Table = () => {
    return (
        <div class='mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
            <div class='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <table class='min-w-full bg-white dark:bg-gray-800'>
                    <thead></thead>
                    <tbody>
                        <TableRow></TableRow>
                        <TableRow></TableRow>
                        <TableRow></TableRow>
                        <TableRow></TableRow>
                        <TableRow></TableRow>
                        <TableRow></TableRow>
                        <tr class='h-12 border-gray-300 border-b'>
                            <td
                                colSpan='5'
                                class='text-sm text-center pl-8 pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'
                            >
                                <a href='#'>Lihat Semua Transaksi Sampah</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
