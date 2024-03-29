const TableCol = ({ children, className, colspan = 1 }) => {
  return (
    <th
      colSpan={colspan}
      className={`dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4 ${className}`}
    >
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

const TableCell = ({ children, className, colspan = 1 }) => {
  return (
    <td
      colSpan={colspan}
      className={`text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 ${className}`}
    >
      {children}
    </td>
  );
};

const TableRow = ({ children, className = "", onClick = () => {} }) => {
  return (
    <tr
      onClick={onClick}
      className={`h-12 border-gray-300 border-b hover:bg-green-100 ${className}`}
    >
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
    <table
      className={`w-full shadow-sm bg-white dark:bg-gray-800 table-auto ${className}`}
    >
      {children}
    </table>
  );
};

export { Table, TableHead, TableBody, TableCol, TableRow, TableCell };
