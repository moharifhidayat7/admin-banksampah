import SelectMenu from "@components/Input/SelectMenu";
import * as Icons from "heroicons-react";
import { useEffect, useState } from "react";
import FilterCard from "@components/FilterCard";
import { useRouter } from "next/router";

const Filter = ({ filterField, className = "" }) => {
  const router = useRouter();

  const [selected, setSelected] = useState([]);

  const filterSelected = (op) => {
    const arr = [];
    for (let i = 0; i < filterField.length; i++) {
      if (op == filterField[i]) {
        selected[i] = op;
      } else {
        selected[i] = "";
      }
    }
    setSelected(arr);
  };

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

  const handleReset = () => {
    delete router.query.page;
    for (let i = 0; i < filterField.length; i++) {
      const element = filterField[i];
      delete router.query[element.field];
    }

    filterSelected({});

    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return (
    <FilterCard title='Filter' onReset={handleReset} className={className}>
      <FilterCard.Content className='flex flex-row space-x-2 items-center'>
        {filterField.map((select, i) => {
          return (
            <SelectMenu
              key={i}
              label={select.selectLabel}
              onChange={(op) => {
                filterSelected(op);
                handleSelect(op, select);
              }}
              selected={selected[i]}
              options={select.options}
              defaultValue={
                router.query[select.field]
                  ? select.options.filter(
                      (s) => s.value == router.query[select.field]
                    )[0]
                  : ""
              }
            />
          );
        })}
      </FilterCard.Content>
    </FilterCard>
  );
};
export default Filter;
