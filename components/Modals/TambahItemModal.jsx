import Modal from "@components/Modal";
import { useState } from "react";
import SelectMenu from "@components/Input/SelectMenu";
import Select from "react-select";

const TambahItemModal = ({
  title,
  sampahType,
  items,
  setItems,
  show,
  setShow,
}) => {
  const [qty, setQty] = useState("");
  const [selected, setSelected] = useState("");

  const toggleShow = () => {
    setShow(!show);
  };

  const handleTambah = async () => {
    if (qty == 0) {
      return;
    }

    if (selected.length < 1) {
      return;
    }

    const find = items.filter((item) => item._id == selected._id);

    if (find.length > 0) {
      const newItems = items.map((item) => {
        if (item._id == selected._id) {
          item.qty = qty;
        }
        return item;
      });

      setItems(newItems);
    } else {
      setItems([...items, { ...selected, qty: qty }]);
    }
    setQty("");
    setSelected("");
    toggleShow();
  };

  return (
    <Modal
      title={title}
      show={show}
      toggleShow={toggleShow}
      className='sm:w-1/2 md:w-96'
    >
      <Modal.Content>
        <div>
          <div className='text-sm font-medium text-gray-700 py-2 '>
            Jenis Sampah
          </div>
          <Select
            instanceId='tambahItem'
            options={sampahType}
            onChange={(e) => setSelected(e)}
          ></Select>
        </div>
        <div>
          <div className='text-sm font-medium text-gray-700 py-2 '>Qty</div>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type='number'
            className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <button
          onClick={handleTambah}
          type='button'
          className='font-medium px-3 bg-blue-500 hover:bg-white shadow-sm border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
        >
          Tambah
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
export default TambahItemModal;
