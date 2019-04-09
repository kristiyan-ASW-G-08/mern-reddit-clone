import React,{useContext,useEffect} from 'react'
import {ModalContextData} from '../../ModalContext/ModalContext'
const useModalContext = () => {
    const {modalState,toggleModalReducer} = useContext(ModalContextData) 
    const {on,message,Component}  = modalState
    return {on,message,Component,toggleModalReducer}
  }
  export default useModalContext