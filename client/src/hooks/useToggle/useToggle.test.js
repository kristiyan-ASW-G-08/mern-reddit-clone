import React from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useToggle from './useToggle'

describe('useToggle',() => {
  afterEach(cleanup)
  it('should create on with initial state false ',() => {
    const {result } = renderHook(() => useToggle(true))
  expect(result.current.on).toBeTruthy()
  })
  it('should create on with initial state false ',() => {
  const {result } = renderHook(() => useToggle(false))
  expect(result.current.on).toBeFalsy()
  })

  it(`should change state ot oposite`,() => {
    const {result } = renderHook(() => useToggle(true))
    expect(result.current.on).toBeTruthy()
    act(() => {result.current.toggle()})
    expect(result.current.on).toBeFalsy()
  })
})