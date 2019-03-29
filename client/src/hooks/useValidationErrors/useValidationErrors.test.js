import React from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useValidationErrors from './useValidationErrors'
describe('useValidationErrors ',() => {
  afterEach(cleanup)
  const validationErrors = [
    {location: "body", param: "email", value: "test@gmail.com", msg: "Email is already used,please user another one"},
    {location: "body", param: "password", value: "sdvsdfwevw123", msg: "Wrong password"}
  ]
  it('should return empthy arrays ',() => {
    const {result} = renderHook(() => useValidationErrors())
  expect(result.current.validationErrorMessages).toEqual([])
  expect(result.current.validationErrorParams).toEqual([])
  })
  it('should map validation error msgs to validationErrorMessages and params to validationErrorParams',() => {
const {result} = renderHook(() => useValidationErrors())
act(() => {result.current.toggleValidationErrors(validationErrors)})
  expect(result.current.validationErrorMessages).toEqual(["Email is already used,please user another one","Wrong password"])
  expect(result.current.validationErrorParams).toEqual(["email","password"])
  })
})
