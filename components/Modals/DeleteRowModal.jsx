import Modal from "@components/Modal";

const DeleteRowModal = ({ title, data, message, show, setShow, onDelete }) => {
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <Modal
      title={title}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
      zClass='z-50'
    >
      <Modal.Content>
        <div>{message}</div>
        <div>
          Anda yakin ingin menghapus{" "}
          <span className='font-bold'>{data.name}</span>?
        </div>
      </Modal.Content>
      <Modal.Footer>
        <button
          onClick={onDelete}
          type='button'
          className='font-medium px-3 bg-red-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
        >
          Hapus
        </button>
        <button
          onClick={toggleShow}
          type='button'
          className='font-medium px-3 bg-gray-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
        >
          Batal
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteRowModal;
