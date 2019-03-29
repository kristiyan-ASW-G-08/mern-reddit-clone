import React, { useState } from 'react';
const useValidationErrors = () => {
  const [validationErrorMessages, setValidationErrorMessages] = useState([])
  const [validationErrorParams, setValidationErrorParams] = useState([])
  const toggleValidationErrors = (validationErrors) => {
    setValidationErrorMessages(validationErrors.map(validationError => validationError.msg))
    setValidationErrorParams(validationErrors.map(validationError => validationError.param))
  }
  return  {validationErrorMessages,validationErrorParams,toggleValidationErrors}
  }
export default useValidationErrors