import React,{useContext} from 'react'
import {AuthContextData} from '../../AuthContext/AuthContext'
const useAuthContext = () => {
    const {authState,loginReducer,
      logoutReducer,
      updateUserDataReducer,} = useContext(AuthContextData) 
      const {isAuth,token,userId,userData} = authState
    return {isAuth,token,userId,userData,loginReducer,logoutReducer,updateUserDataReducer}
  }
  export default useAuthContext