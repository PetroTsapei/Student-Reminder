import { useState, useEffect } from "react";

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

export const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = () => {
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (text, name) => {
    if (errors[name]) {
      setIsSubmitting(false);
      delete errors[name];
    }
    setValues(values => ({ ...values, [name]: text }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues
  }
};