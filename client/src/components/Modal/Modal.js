import React, { Suspense, lazy } from 'react';
import useModalContext from '../../hooks/useModalContext/useModalContext';
import Loader from '../Loader';
import logo from '../../assets/logo.svg';
const Portal = lazy(() => import('../Portal/Portal'));
const Modal = () => {
  const { on, message, Component } = useModalContext();
  return (
    <>
      {on ? (
        <Suspense fallback={<Loader />}>
          <Portal>
            {Component ? (
              <div className="modal-backdrop">
                  {Component}
              </div>
            ) : (
              <div className="message-modal-container">
                <div className="message-modal">
                  <img className="message-modal-logo" alt="logo" src={logo} />
                  <p className="message-modal-message">{message}</p>
                </div>
              </div>
            )}
          </Portal>
        </Suspense>
      ) : (
        ''
      )}
    </>
  );
};
export default Modal;
