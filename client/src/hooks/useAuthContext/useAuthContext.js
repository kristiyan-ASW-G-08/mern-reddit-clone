import React,{useContext} from 'react'
import {AuthContextData} from '../../AuthContext/AuthContext'
const useAuthContext = () => {
    const {authState} = useContext(AuthContextData) 
    const {isAuth,token,userId,userData} = authState
    return {isAuth,token,userId,userData}
  }
  export default useAuthContext