import React from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = React.useState(initialValues || {});
  const [touchedValues, setTouchedValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleChange = event => {
    const { target } = event;
    if (target) {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  const handleBlur = event => {
    const { target } = event;
    const { name } = target;
    setTouchedValues({
      ...touchedValues,
      [name]: true
    });
    const e = validate(values);
    setErrors({
      ...errors,
      ...e
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const e = validate(values);
    setErrors({
      ...errors,
      ...e
    });
    onSubmit({ values, e });
  };
  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  };
};

export default useForm;
