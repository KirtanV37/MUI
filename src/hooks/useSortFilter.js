import { useCallback, useState } from "react";

const useSortFilter = () => {
  const [sort, setSort] = useState({
    field: "",
    order: "",
  });

  const handleSort = useCallback(({ field, order }) => {
    setSort({ field, order });
  }, []);

  return { sort, setSort, handleSort };
};

export default useSortFilter;
