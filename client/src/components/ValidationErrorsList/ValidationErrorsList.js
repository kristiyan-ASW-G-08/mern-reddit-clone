import React from 'react';
const ValidationErrorsList = ({validationErrorMessages}) => {
  let errorsList = '';
  if (validationErrorMessages.length > 0) {
    errorsList = (
      <ul className="error--list" data-testid="error-list">
        {validationErrorMessages.map((error, index) => {
          return <li key={`${error}-${index}`}>{error}</li>;
        })}
      </ul>
    );
  }
  return errorsList;
};
export default ValidationErrorsList;
