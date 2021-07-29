import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

const Filter = ({ children, filterField, setRefs, className = "" }) => {
  const router = useRouter();

  const selectsRef = useRef(new Array());

  const handleSelect = (op, select) => {
    delete router.query.page;

    if (op.value == "") {
      delete router.query[select.field];
    } else {
      router.query[select.field] = op.value;
    }
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };
  useEffect(() => {
    setRefs(selectsRef);
  }, []);

  return (
    <>
      {filterField.map((select, i) => {
        const selectOptions = [
          {
            label: select.selectLabel + " ...",
            value: "",
          },
          ...select.options,
        ];
        return (
          <div className={`flex flex-row space-x-3 items-center`} key={i}>
            <div className='text-xs font-medium text-gray-700 w-1/4'>
              {select.selectLabel}
            </div>
            <div className='flex-grow'>
              <Select
                instanceId={`selectFilter${i}`}
                ref={(element) => selectsRef.current.push(element)}
                className='text-base md:text-sm border-gray-300 rounded-md shadow-sm'
                defaultValue={
                  router.query[select.field]
                    ? select.options.filter(
                        (s) => s.value == router.query[select.field]
                      )[0]
                    : selectOptions[0]
                }
                onChange={(e) => {
                  handleSelect(e, select);
                }}
                options={selectOptions}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Filter;
