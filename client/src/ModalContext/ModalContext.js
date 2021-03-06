import React, { useState, useReducer, createContext,useEffect } from 'react';
import {modalReducer,TOGGLEMODAL} from './reducers'
const Context = createContext();
const ModalContext = props => {
  const [modalState, dispatch] = useReducer(modalReducer, {
    on:false,
    message:null,
    Component:null,
  });
  const toggleModalReducer = newModalState => {
    console.log(newModalState)
    dispatch({type:TOGGLEMODAL,newModalState})
    if(newModalState.message){
      setTimeout(() => {
      dispatch({type:TOGGLEMODAL,newModalState:{on:false,message:null}})
    },2000)
    }
  }

  return (
    <Context.Provider
      value={{
       modalState,
       toggleModalReducer,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const ModalContextData = Context ;
export const ModalContextConsumer = Context.Consumer
export default ModalContext;
