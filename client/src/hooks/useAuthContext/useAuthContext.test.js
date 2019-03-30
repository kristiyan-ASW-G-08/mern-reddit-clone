import React,{createContext} from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useAuthContext from './useAuthContext'
import {AuthContextData} from '../../AuthContext/AuthContext'
describe('useAuthCountext',() => {
  let authContext
  const authState =  {isAuth:false,token:null,userId:null,userData:null}
  it('should create on with initial state false ',() => {
     renderHook(() => authContext = useAuthContext(), {
      wrapper: ({ children }) => (
        <AuthContextData.Provider value={{authState}}>
          {children}
        </AuthContextData.Provider>
      )})
  expect(authContext).toEqual(authState)
  })
  
})







// import React from 'react'
// import {testHook, cleanup} from 'react-testing-library'
// import useAuthContext from './useAuthContext'
// import {AuthContextData} from '../../AuthContext/AuthContext'
// describe('useAuthContext',() => {
//   afterEach(cleanup)
//   it('should create on with initial state false ',() => {
//       let authState
//     testHook(() => (authState = useAuthContext()), AuthContextData)
//     expect(authState).toEqual({})
//   })

// })






