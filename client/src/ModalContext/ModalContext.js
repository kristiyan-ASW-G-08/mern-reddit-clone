import React, { useState, useReducer, createContext,useEffect } from 'react';
const Context = createContext();
const ModalContext = props => {
  const [modalState, dispatch] = useReducer(modalReducer, {
    on:false,
    message:null,
  });

  const modalReducer =   newModalState => {
    console.log('modalReducer')
    console.log(newModalState);
    let on;
    let message
    if(newModalState.on){
      on  = true
      message = newModalState.message
    }else {
      on = false;
      message = null
    }
    const updatedModalState =  {
      on,
      message
    }
    console.log(updatedModalState)
    return updatedModalState
  } 
  return (
    <Context.Provider
      value={{
       modalState
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const ModalContextData = Context ;
export const ModalContextConsumer = Context.Consumer
export default ModalContext;
