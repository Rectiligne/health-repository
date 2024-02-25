// useStore.ts
import { useEffect, useState } from "react";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>(null as unknown as F);

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
