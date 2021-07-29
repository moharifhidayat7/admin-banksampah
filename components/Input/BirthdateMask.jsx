import InputMask from "react-input-mask";
import { useState } from "react";

export default function BirthdateMask({ defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    const { value } = newState;
    const selection = newState.selection;
    const cursorPosition = selection ? selection.start : null;

    if (value.endsWith("-") && userInput !== "-" && !value.endsWith("-")) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }

    return {
      value,
      selection,
    };
  };
  return (
    <InputMask
      mask='99-99-9999'
      value={value}
      onChange={onChange}
      beforeMaskedValueChange={beforeMaskedValueChange}
    />
  );
}
