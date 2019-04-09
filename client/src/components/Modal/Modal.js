import React, { Suspense, lazy } from 'react';
// import useToggle from '../../hooks/useToggle'
import useModalContext from '../../hooks/useModalContext/useModalContext';
import Loader from '../Loader';
import logo from '../../assets/logo.svg';
const Portal = lazy(() => import('../Portal/Portal'));
const Modal = () => {
  const { on,message,Component } = useModalContext();
  return (
    <>
      {on ? (
        <Suspense fallback={<Loader />}>
          <Portal>
            {Component ? <Component /> :  <div className="modal-container">
            <div className="modal">
             <img className="modal-logo" alt="logo" src={logo}/>
              <p className="modal-message">{message}</p>
              </div>
              </div>}
           
          </Portal>
        </Suspense>
      ) : (
        ''
      )}
    </>
  );
};
export default Modal;
