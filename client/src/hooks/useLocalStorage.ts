import { useEffect, useState, Dispatch } from "react";

export const useLocalStorage = <T extends string>(
  key: string
): [T | null, Dispatch<string>] => {
  const getValue = () => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };
  const [value, setValue] = useState(getValue);
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      const item = localStorage.getItem(key);
      if (item && !value) {
        localStorage.removeItem(key);
      }
    }
  }, [value, key]);

  return [value, setValue];
};
