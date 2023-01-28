import { useState, useEffect } from "react";

// Custom Hook - Short but Powerful Way to handle form data
const UserInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
    },
  };
};

export default UserInput;
