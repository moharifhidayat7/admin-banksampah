import { TrendingUp } from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ meta }) => {
  const router = useRouter();

  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <ReactPaginate
      previousLabel={"Sebelumnya"}
      nextLabel={"Selanjutnya"}
      breakLabel={"..."}
      breakLinkClassName={
        "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
      }
      activeLinkClassName={"text-white font-bold"}
      pageLinkClassName={
        "px-3 py-1 bg-gray-700 border border-white rounded-md text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
      }
      disabledClassName={"bg-gray-200"}
      previousLinkClassName={
        "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
      }
      nextLinkClassName={
        "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
      }
      containerClassName={"flex items-center space-x-1 relative"}
      initialPage={meta.currentPage - 1}
      pageCount={meta.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={paginationHandler}
    />
  );
};

export default Pagination;
