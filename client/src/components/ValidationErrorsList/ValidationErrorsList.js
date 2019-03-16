import React from 'react';
const ValidationErrorsList = props => {
  const { validationErrorMessages } = props;
  let errorsList = ''
  if(validationErrorMessages.length > 0){
   errorsList =  <ul className="error--list">
      {validationErrorMessages.map((error, index) => {
        return <li key={`${error}-${index}`}>{error}</li>;
      })}
    </ul>
  }
  return errorsList
};
export default ValidationErrorsList;
