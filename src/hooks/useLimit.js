import { useState } from "react";

const useLimit = (defaultLimit = 1, options = [1, 2, 5, 10, 25, 50, 100]) => {
  const [limit, setLimit] = useState(defaultLimit);
  return { limit, setLimit, limitOptions: options };
};

export default useLimit;
