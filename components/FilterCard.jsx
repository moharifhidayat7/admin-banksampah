import * as Icons from "heroicons-react";

const FilterCard = ({ children, title, onReset, className = "" }) => {
  return (
    <div
      className={`flex flex-col space-y-2 bg-white rounded-md shadow p-2 ${className}`}
    >
      <div className='flex flex-row justify-between items-center'>
        <span className='text-sm font-medium text-gray-700'>{title}</span>
        <button
          onClick={onReset}
          type='button'
          className='text-sm text-red-500 hover:text-red-800'
        >
          <Icons.Refresh size='0.8rem' className='inline-block align-middle' />
          <span className='inline-block align-middle'>Reset</span>
        </button>
      </div>
      {children}
    </div>
  );
};

FilterCard.Content = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default FilterCard;
