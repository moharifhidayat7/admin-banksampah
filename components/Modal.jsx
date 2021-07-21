const Modal = ({ children, title, show, toggleShow }) => {
  return (
    <div className='relative'>
      <div
        className={`modal z-40 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 ${
          show ? "" : "hidden"
        }`}
        onMouseDown={toggleShow}
      >
        <div
          className='w-full sm:w-1/2 md:w-96 m-5'
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='bg-white py-2 px-4 rounded-md shadow-md border-gray-300'>
            <div>
              <div className='text-lg font-medium'>{title}</div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.Content = ({ children }) => {
  return <div className='py-2 text-md'>{children}</div>;
};
Modal.Footer = ({ children }) => {
  return <div className='text-right'>{children}</div>;
};
export default Modal;
