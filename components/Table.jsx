const TableCol = ({ children }) => {
  return (
    <th class='dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
      {children}
    </th>
  );
};

const TableHead = ({ children }) => {
  return (
    <thead>
      <tr class='w-full h-12 bg-gray-700 text-white border-gray-300 border-b py-8'>
        <th class='dark:text-gray-400 font-normal pl-8 text-left text-sm tracking-normal leading-4'></th>
        {children}
      </tr>
    </thead>
  );
};

const TableCell = ({ children }) => {
  return (
    <td class='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
      {children}
    </td>
  );
};

const TableRow = ({ children }) => {
  return (
    <tr class='h-12 border-gray-300 border-b'>
      <td class='text-sm pl-8 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'></td>
      {children}
    </tr>
  );
};
const TableBody = ({ children }) => {
  return (
    <tbody>
      {children}

      <tr class='h-12 border-gray-300 border-b'>
        <td
          colSpan='6'
          class='text-sm text-center pl-8 pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'
        >
          <a href='#'>Lihat Semua Transaksi Sampah</a>
        </td>
      </tr>
    </tbody>
  );
};

const Table = ({ children }) => {
  return (
    <div class='mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
      <div class='w-full overflow-x-scroll xl:overflow-x-hidden'>
        <table class='min-w-full bg-white dark:bg-gray-800'>{children}</table>
      </div>
    </div>
  );
};

export { Table, TableHead, TableBody, TableCol, TableRow, TableCell };
