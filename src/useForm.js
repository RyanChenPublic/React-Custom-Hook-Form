import { useState } from "react";

const useForm = (options) => {
  const [values, setValues] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = options?.validation(values);
    if (validation.account || validation.password) {
      setErrors(validation);
      return;
    }
    options.onSubmit(values);
    return;
  };

  const handleChange = (event) => {
    event.persist();
    const target = event.target;
    setValues((values) => ({
      ...values,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
