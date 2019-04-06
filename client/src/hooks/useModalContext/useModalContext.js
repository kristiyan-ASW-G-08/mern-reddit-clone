import React,{useContext,useEffect} from 'react'
import {ModalContextData} from '../../ModalContext/ModalContext'
const useModalContext = () => {
    const {modalState,toggleModalReducer,} = useContext(ModalContextData) 
    const {on,message}  = modalState
    return {on,message,toggleModalReducer}
  }
  export default useModalContext