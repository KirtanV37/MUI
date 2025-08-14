import { useState } from "react";

const usePage = () => {
  const [page, setPage] = useState(0);

  return { page, setPage };
};

export default usePage;
