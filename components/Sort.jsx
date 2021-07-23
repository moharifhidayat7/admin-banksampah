import SortButton from "@components/SortButton";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import SelectMenu from "@components/Input/SelectMenu";
import FilterCard from "@components/FilterCard";
import Select from "react-select";

const Sort = ({ options }) => {
  const router = useRouter();
  const selectRef = useRef();

  const selectOptions = [
    {
      label: "Kolom ...",
      value: "",
    },
    ...options,
  ];

  const handleSelect = (op) => {
    delete router.query.page;
    if (op.value == "") {
      delete router.query.sort;
    } else {
      router.query.sort = op.value;
    }
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  const handleReset = () => {
    delete router.query.page;
    delete router.query.sort;

    selectRef.current.select.setValue(selectOptions[0]);
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return (
    <FilterCard title='Urutkan' onReset={handleReset}>
      <FilterCard.Content className='flex flex-row space-x-2'>
        <Select
          ref={selectRef}
          instanceId='sortSelect'
          className='w-full text-base md:text-sm border-gray-300 rounded-md shadow-sm'
          defaultValue={
            router.query.sort
              ? options.filter(
                  (s) => s.value == router.query.sort.replace("-", "")
                )[0]
              : selectOptions[0]
          }
          onChange={handleSelect}
          options={selectOptions}
        />
        <SortButton />
      </FilterCard.Content>
    </FilterCard>
  );
};

export default Sort;
