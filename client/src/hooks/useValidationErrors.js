import React, { useState } from 'react';
import ValidationErrorsList from '../components/ValidationErrorsList/ValidationErrorsList'
const useValidationErrors = () => {
  const [validationErrorMessages, setValidationErrorMessages] = useState([])
  const [validationErrorParams, setValidationErrorParams] = useState([])
  const toggleValidationErrors = (validationErrors) => {
    console.log(validationErrors)
    setValidationErrorMessages(validationErrors.map(validationError => validationError.msg))
    setValidationErrorParams(validationErrors.map(validationError => validationError.param))
  }
  return  [validationErrorMessages,validationErrorParams,toggleValidationErrors]
  }
export default useValidationErrors