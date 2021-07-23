import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";

const DateRangeFilter = ({
  label,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const router = useRouter();

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
    <div className='flex space-x-3 items-center'>
      <div className='w-1/3 text-xs font-medium text-gray-700'>{label}</div>
      <div className='flex space-x-1 items-center'>
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
      </div>
    </div>
  );
};
export default DateRangeFilter;
