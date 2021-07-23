import { TrendingUp } from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Pagination = ({ page, maxPage, start, end, pageRange }) => {
  const router = useRouter();

  const newQuery = (p) => {
    router.query.page = p;
    const queryString = Object.keys(router.query)
      .map((key) => key + "=" + router.query[key])
      .join("&");
    return `${router.pathname}?${queryString}`;
  };

  const pageStart =
    page > pageRange && page > maxPage - pageRange
      ? page >= maxPage
        ? maxPage - pageRange + 1
        : Math.floor(page / pageRange) * pageRange + 1
      : page <= pageRange && 1;

  return (
    <div className='flex items-center space-x-2'>
      <div className='flex space-x-1'>
        {page > 1 && (
          <Link href={page > 1 ? newQuery(page - 1) : "#"}>
            <a
              className={
                "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
              }
            >
              Sebelumnya
            </a>
          </Link>
        )}
        {pageStart > pageRange && (
          <Link href={newQuery(1)}>
            <a
              className={
                "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
              }
            >
              {1}
            </a>
          </Link>
        )}
        {pageStart > pageRange && (
          <Link href={pageStart - 1 ? newQuery(pageStart - 1) : "#"}>
            <a
              className={
                "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
              }
            >
              ...
            </a>
          </Link>
        )}

        {[...Array(maxPage)].map((e, i) => {
          const active =
            page == i + pageStart
              ? "bg-white border border-2 border-gray-700 text-gray-700 font-bold"
              : "bg-gray-700 border border-2 border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white";
          if (i > 4 || i + pageStart > maxPage) {
            return "";
          }
          return (
            <Link
              href={page == i + pageStart ? "#" : newQuery(i + pageStart)}
              key={i + pageStart}
            >
              <a className={`px-3 py-1 rounded-md ${active}`}>
                {i + pageStart}
              </a>
            </Link>
          );
        })}
        {pageStart <= maxPage - pageRange && (
          <Link
            href={
              page <= maxPage - pageRange
                ? newQuery(pageStart + pageRange)
                : "#"
            }
          >
            <a
              className={
                "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
              }
            >
              ...
            </a>
          </Link>
        )}

        {page <= maxPage - pageRange && (
          <Link href={newQuery(maxPage)}>
            <a
              className={
                "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
              }
            >
              {maxPage}
            </a>
          </Link>
        )}

        {page < maxPage && (
          <Link href={page > 1 ? newQuery(page + 1) : "#"}>
            <a
              className={
                "px-3 py-1 rounded-md bg-gray-700 border border-white text-white hover:border-gray-700 hover:text-gray-700 hover:bg-white"
              }
            >
              Selanjutnya
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
