import React from 'react';
const ErrorMessage = props => {
  const { errors } = props;
  return (
    <ul className="error--list">
      {errors.map((error, index) => {
        return <li key={`${index}-${error.param}`}>{error.msg}</li>;
      })}
    </ul>
  );
};
export default ErrorMessage;
