import React from 'react';
const ValidationErrorsList = props => {
  const { validationErrors } = props;
  console.log(validationErrors)
  let errorsList = ''
  if(validationErrors.length > 0){
   errorsList =  <ul className="error--list">
      {validationErrors.map((error, index) => {
        return <li key={`${error}-${index}`}>{error}</li>;
      })}
    </ul>
  }
  return errorsList
};
export default ValidationErrorsList;
