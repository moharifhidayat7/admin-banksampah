import { useState, useRef, useEffect } from "react";
import * as Icons from "heroicons-react";

const SelectMenu = ({
  options,
  onChange,
  label,
  selected = "",
  defaultValue = "",
  onClick = () => {
    return;
  },
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(selected);

  const toggleList = () => {
    setOpen(!open);
  };

  const opt = [{ label: label, value: "" }, ...options];

  const dv =
    defaultValue == "" ? (selected == "" ? opt[0] : checked) : defaultValue;

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className='w-full relative'>
      <button
        type='button'
        className='w-full text-base md:text-sm bg-white border border-gray-300 rounded-md shadow-sm form-input'
        onClick={() => {
          toggleList();
          onClick();
        }}
      >
        <div className='flex justify-between items-center'>
          <span>{dv.label}</span>
          <span>
            <Icons.Selector size='1rem' />
          </span>
        </div>
      </button>
      {open && (
        <div
          ref={ref}
          className='z-10 py-1 max-h-56 absolute bg-white shadow-md w-full rounded-md overflow-auto mt-2 border-gray-300'
        >
          {opt.map((op, i) => {
            return (
              <div
                disabled={op.disabled ? "disabled" : ""}
                onClick={() => {
                  onChange(op);
                  setChecked(op);
                  toggleList();
                }}
                className='border-b-2 border-gray-100 px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer flex justify-between items-center'
                key={i}
              >
                <span>{op.label}</span>
                {selected.value == op.value && (
                  <span>
                    <Icons.Check size='1rem' className='text-green-400' />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SelectMenu;
