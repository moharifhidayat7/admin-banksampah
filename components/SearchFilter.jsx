import { useState } from "react";
import { useRouter } from "next/router";
import FilterCard from "@components/FilterCard";
import SearchText from "@components/Input/SearchText";

const SearchFilter = () => {
  const router = useRouter();

  const handleSubmit = (keyword) => {
    delete router.query.page;

    if (keyword == "") {
      delete router.query.keyword;
    } else {
      router.query.keyword = keyword;
    }
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  const handleReset = () => {
    delete router.query.page;
    delete router.query.keyword;
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return (
    <FilterCard title='Pencarian' onReset={handleReset}>
      <FilterCard.Content className='flex space-x-2'>
        <SearchText onSubmit={handleSubmit} />
      </FilterCard.Content>
    </FilterCard>
  );
};

export default SearchFilter;
