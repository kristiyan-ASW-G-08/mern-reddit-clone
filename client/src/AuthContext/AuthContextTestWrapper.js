import {AuthContextData} from './AuthContext'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'
const AuthContextTestWrapper = ({authState,children}) => {
    return (
       <AuthContextData.Provider value={{authState}}>
        <BrowserRouter>
          {children}
          </BrowserRouter>
        </AuthContextData.Provider>
    )
}
export default AuthContextTestWrapper 