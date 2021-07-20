import SelectMenu from "@components/Input/SelectMenu";
import * as Icons from "heroicons-react";
import { useState } from "react";
import FilterCard from "@components/FilterCard";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";

const DateRangeFilter = ({ title }) => {
  const router = useRouter();

  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
  );

  const defaultStartDate =
    router.query.range && router.query.range.split("s")[0];
  const defaultEndDate = router.query.range && router.query.range.split("s")[1];

  const handleChange = (start, end) => {
    const dateRange =
      new Date(start).toISOString().split("T")[0] +
      "s" +
      new Date(end).toISOString().split("T")[0];
    delete router.query.page;
    router.query.range = dateRange;
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return (
    <FilterCard
      title={title}
      onReset={() => {
        delete router.query.range;
        delete router.query.page;
        router.push({
          pathname: router.pathname,
          query: router.query,
        });
      }}
    >
      <FilterCard.Content className='flex flex-row space-x-1 items-center'>
        <DatePicker
          selected={
            !isNaN(new Date(defaultStartDate))
              ? new Date(defaultStartDate)
              : startDate
          }
          onChange={(date) => {
            setStartDate(date);
            if (date > endDate) {
              setEndDate(new Date(date).setMonth(date.getMonth() + 1));
              handleChange(date, new Date(date).setMonth(date.getMonth() + 1));
            } else {
              handleChange(date, endDate);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel='>'
          previousMonthButtonLabel='<'
        />
        <div>-</div>
        <DatePicker
          selected={
            !isNaN(new Date(defaultEndDate))
              ? new Date(defaultEndDate)
              : endDate
          }
          onChange={(date) => {
            setEndDate(date);
            handleChange(startDate, date);
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          nextMonthButtonLabel='>'
          previousMonthButtonLabel='<'
        />
      </FilterCard.Content>
    </FilterCard>
  );
};
export default DateRangeFilter;
