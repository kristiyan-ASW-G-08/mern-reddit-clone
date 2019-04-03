import React,{createContext} from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useAuthContext from './useAuthContext'
import {AuthContextData} from '../../AuthContext/AuthContext'
import AuthContextTestWrapper from '../../AuthContext/AuthContextTestWrapper'
describe('useAuthCountext',() => {
  let authContext
  const authState =  {isAuth:false,token:null,userId:null,userData:null}
  it('should create on with initial state false ',() => {
     renderHook(() => authContext = useAuthContext(), {
      wrapper: ({ children }) => (
        <AuthContextTestWrapper authState={authState} children={children} />
      )})
  expect(authContext).toEqual(authState)
  })
  
})






