export const TOGGLEMODAL = 'TOGGLEMODAL';

const toggleModal = (newModalState) => {
  try {
      console.log('yolo')
    console.log(newModalState)
   return newModalState
  } catch (err) {
  }
}
export const modalReducer = (isAuth, action) => {
  switch (action.type) {
    case TOGGLEMODAL:
      return toggleModal(action.newModalState);
    default:
      return isAuth;
  }
};
