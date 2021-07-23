import { useState } from "react";
import { useRouter } from "next/router";
import FilterCard from "./FilterCard";
import Filter from "./Filter";

const TableFilter = ({
  children,
  filterField,
  setStartDate = "",
  setEndDate = "",
  className = "",
}) => {
  const router = useRouter();

  const [refs, setRefs] = useState([]);

  const handleReset = () => {
    delete router.query.page;
    delete router.query.range;

    setStartDate && setStartDate(new Date().setDate(1));
    setEndDate &&
      setEndDate(
        new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
      );

    for (let i = 0; i < filterField.length; i++) {
      refs.current[i].select.setValue({
        label: filterField[i].selectLabel + " ...",
        value: "",
      });
    }

    for (let i = 0; i < filterField.length; i++) {
      const element = filterField[i];
      delete router.query[element.field];
    }

    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };
  return (
    <FilterCard title='Filter' className='md:col-span-3' onReset={handleReset}>
      <FilterCard.Content className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <Filter filterField={filterField} setRefs={setRefs} />
        {children}
      </FilterCard.Content>
    </FilterCard>
  );
};

export default TableFilter;
