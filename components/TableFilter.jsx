import SearchText from "@components/Input/SearchText";
import Sort from "@components/Sort";
import Filter from "@components/Filter";
const TableFilter = () => {
  return (
    <div className='grid grid-cols-5 gap-2 mb-2'>
      <Sort />
      <Filter />
      {/* <div className='flex flex-col space-y-2 bg-white rounded-md shadow p-2'>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-sm font-medium text-gray-700'>
            Tanggal Registrasi
          </span>
          <button
            type='button'
            className='text-sm text-red-500 hover:text-red-800'
          >
            <Icons.Refresh
              size='0.8rem'
              className='inline-block align-middle'
            />
            <span className='inline-block align-middle'>Reset</span>
          </button>
        </div>
        <div className='flex flex-row space-x-2'>
          <SelectMenu
            defaultValue={sortOptions[0]}
            onChange={(op) => {
              console.log(op);
            }}
            opt={[{ label: "1212" }, { label: "1212" }, { label: "1212" }]}
          ></SelectMenu>
          <SelectMenu
            defaultValue={sortOptions[0]}
            onChange={(op) => {
              console.log(op);
            }}
            opt={[{ label: "1212" }, { label: "1212" }, { label: "1212" }]}
          ></SelectMenu>
        </div>
      </div>
      <div className='flex flex-col space-y-2 bg-white rounded-md shadow p-2'>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-sm font-medium text-gray-700'>Pencarian</span>
          <button
            type='button'
            className='text-sm text-red-500 hover:text-red-800'
          >
            <Icons.Refresh
              size='0.8rem'
              className='inline-block align-middle'
            />
            <span className='inline-block align-middle'>Reset</span>
          </button>
        </div>
        <div className='flex flex-col space-y-2'>
          <SearchText />
        </div>
      </div> */}
    </div>
  );
};
export default TableFilter;
