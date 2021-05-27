const TableCol = ({ children }) => {
    return (
        <th className='dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
            {children}
        </th>
    );
};

const TableHead = ({ children }) => {
    return (
        <thead>
            <tr className='w-full h-12 bg-gray-700 text-white border-gray-300 border-b py-8'>
                <th className='dark:text-gray-400 font-normal pl-5 text-left text-sm tracking-normal leading-4'></th>
                {children}
            </tr>
        </thead>
    );
};

const TableCell = ({ children, className }) => {
    return (
        <td
            className={`text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 ${className}`}
        >
            {children}
        </td>
    );
};

const TableRow = ({ children, className }) => {
    return (
        <tr className={`h-12 border-gray-300 border-b ${className}`}>
            <td className='text-sm w-8 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'></td>
            {children}
        </tr>
    );
};
const TableBody = ({ children, className }) => {
    return (
        <tbody className={className}>
            {children}

            {/* <tr className='h-12 border-gray-300 border-b'>
        <td
          colSpan='6'
          className='text-sm text-center pl-8 pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'
        >
          <a href='#'>Lihat Semua Transaksi Sampah</a>
        </td>
      </tr> */}
        </tbody>
    );
};

const Table = ({ children, className }) => {
    return (
        <table className={`min-w-full bg-white dark:bg-gray-800 ${className}`}>
            {children}
        </table>
    );
};

export { Table, TableHead, TableBody, TableCol, TableRow, TableCell };
