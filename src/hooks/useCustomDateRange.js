import { useState } from "react";

const useCustomDateRange = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return { startDate, setEndDate, setStartDate, endDate };
};

export default useCustomDateRange;
