import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  return {
    value,
    setValue,
    error,
    setError,
    reset: () => setValue(""),
    bind: {
      value,
      onChangeText: text => {
        setError("");
        setValue(text);
      }
    }
  };
};