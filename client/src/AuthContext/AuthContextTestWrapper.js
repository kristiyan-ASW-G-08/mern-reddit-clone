import {AuthContextData} from './AuthContext'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'
const AuthContextTestWrapper = ({authState,children,updateUserDataReducer}) => {
    return (
       <AuthContextData.Provider value={{authState,updateUserDataReducer}}>
        <BrowserRouter>
          {children}
          </BrowserRouter>
        </AuthContextData.Provider>
    )
}
export default AuthContextTestWrapper 