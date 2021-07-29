export default function ImageUpload({ name, image, setImage }) {
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <div className='relative bg-white border border-gray-300 overflow-hidden rounded-md shadow-sm'>
      <div className='absolute right-2 top-2 z-30'>
        {image.preview && (
          <button
            type='button'
            onClick={() => {
              setImage({});
            }}
            className='text-sm px-1 bg-red-500 hover:bg-white shadow-sm border-white rounded-md border hover:border-red-500 hover:text-red-500 focus:outline-none text-white'
          >
            clear
          </button>
        )}
      </div>
      <div className={`z-10 ${!image.preview && "h-16"}`}>
        {image.preview && <img src={image.preview} alt='ktp' />}
      </div>
      <div className='z-20 w-full top-0 left-0 h-full absolute'>
        <label
          htmlFor={name}
          className='w-full h-full flex justify-center items-center cursor-pointer hover:bg-black hover:bg-opacity-60 text-sm font-medium italic text-gray-700 hover:text-white'
        >
          {!image.preview && <span>Pilih File ...</span>}
        </label>
        <input
          type='file'
          className='hidden'
          onChange={handleChange}
          id={name}
          name={name}
          accept='image/*'
        />
      </div>
    </div>
  );
}
