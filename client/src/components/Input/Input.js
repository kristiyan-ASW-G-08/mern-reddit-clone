import React, { useState, useMemo } from 'react';
const errorFunc = (validationErrorParams, name) => {
  let error = false;
  if (validationErrorParams && validationErrorParams.length > 0) {
    if (validationErrorParams.includes(name)) {
      error = true;
    }
  }
  return error;
};
const Input = ({ name,
  setHook,
  placeholder,
  value,
  type,
  validationErrorParams,
  textArea}) => {
  
  const error = useMemo(() => errorFunc(validationErrorParams, name), [
    validationErrorParams,
    name
  ]);
  let component = (
    <input
      className={`input${error ? ' input--error' : ''}`}
      onChange={e => setHook(e.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      // required
    />
  );
  if (textArea) {
    component = (
      <textarea
        className={`input${error ? ' input--error' : ''}`}
        onChange={e => setHook(e.target.value)}
        type={type}
        placeholder={placeholder}
        name={name}
        rows={7}
        value={value}
        // required
      />
    );
  }
  return component;
};
export default Input;
