import * as Icons from "heroicons-react";
import { useRouter } from "next/router";

const SortButton = () => {
  const router = useRouter();

  const isDesc = router.query.sort && router.query.sort[0] == "-";

  const handleClick = () => {
    delete router.query.page;
    router.query.sort = isDesc
      ? router.query.sort.replace("-", "")
      : router.query.sort
      ? "-" + router.query.sort
      : "-_id";
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return (
    <button
      onClick={handleClick}
      className='form-input px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm'
    >
      {isDesc ? <Icons.ArrowUp size='1rem' /> : <Icons.ArrowDown size='1rem' />}
    </button>
  );
};
export default SortButton;
