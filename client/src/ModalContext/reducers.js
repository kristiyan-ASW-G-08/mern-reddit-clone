export const TOGGLEMODAL = 'TOGGLEMODAL';
const toggleModal = (newModalState) => {
  try {
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
