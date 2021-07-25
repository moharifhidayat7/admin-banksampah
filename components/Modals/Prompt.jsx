import Modal from "@components/Modal";

export default function Prompt({
  title,
  buttonText,
  message,
  show,
  toggleShow,
  onConfirm,
}) {
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
      </Modal.Content>
      <Modal.Footer>
        <button
          onClick={onConfirm}
          type='button'
          className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
        >
          {buttonText ? buttonText : "Ya"}
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
}
