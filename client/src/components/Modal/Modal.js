import React, { Suspense, lazy } from 'react';
// import useToggle from '../../hooks/useToggle'
import useModalContext from '../../hooks/useModalContext/useModalContext';
import Loader from '../Loader';
const Portal = lazy(() => import('../Portal/Portal'));
const Modal = () => {
  const { on,message } = useModalContext();
  return (
    <>
      {on ? (
        <Suspense fallback={<Loader />}>
          <Portal>
          
                <h1 className="modal-title">{message}</h1>
                
          </Portal>
        </Suspense>
      ) : (
        ''
      )}
    </>
  );
};
export default Modal;
