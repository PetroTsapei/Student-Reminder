import { useState, useEffect } from 'react';

export const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleSubmit = e => {
    e.preventDefault();
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
  }
};