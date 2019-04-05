import React,{useContext,useEffect} from 'react'
import {ModalContextData} from '../../ModalContext/ModalContext'
const useAuthContext = () => {
    const {modalState,toggleModalReducer,} = useContext(ModalContextData) 
    const {on,message}  = modalState
    useEffect(() => {
 setTimeout(() => {
      toggleModalReducer({on:false,message:null})
    },10000)
    },[])

    return {on,message,toggleModalReducer}
  }
  export default useAuthContext