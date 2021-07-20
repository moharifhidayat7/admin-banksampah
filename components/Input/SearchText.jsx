import * as Icons from "heroicons-react";
import { useState } from "react";
const SearchText = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState("");
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(keyword);
  };
  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className='relative w-full flex space-x-2'>
      <div className='flex-grow'>
        <input
          onChange={handleChange}
          onKeyPress={handleKeypress}
          className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
          type='text'
          placeholder='Search'
        />
      </div>
      <button
        onClick={handleSubmit}
        type='button'
        className='form-input px-3 py-1 font-bold bg-white border border-gray-300 rounded-md shadow-sm'
      >
        <Icons.SearchOutline size='1rem' />
      </button>
    </div>
  );
};

export default SearchText;
