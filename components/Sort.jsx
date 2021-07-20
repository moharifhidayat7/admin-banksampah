import SortButton from "@components/SortButton";
import { useState } from "react";
import { useRouter } from "next/router";
import SelectMenu from "@components/Input/SelectMenu";
import FilterCard from "@components/FilterCard";

const Sort = ({ options }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(
    router.query.sort
      ? options.filter((s) => s.value == router.query.sort.replace("-", ""))[0]
      : ""
  );

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
    setSelected("");
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return (
    <FilterCard title='Urutkan' onReset={handleReset}>
      <FilterCard.Content className='flex flex-row space-x-2'>
        <SelectMenu
          onChange={(op) => {
            setSelected(op);
            handleSelect(op);
          }}
          options={options}
          label='Kolom ...'
          selected={selected}
          defaultValue={selected}
        />
        <SortButton />
      </FilterCard.Content>
    </FilterCard>
  );
};

export default Sort;
