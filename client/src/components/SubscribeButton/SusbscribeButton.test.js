import React from 'react';

import { render, cleanup, fireEvent } from 'react-testing-library';
import AuthContextTestWrapper from '../../AuthContext/AuthContextTestWrapper'
import SubscribeButton from './SubscribeButton';
import postData from '../../util/postData';
jest.mock('../../util/postData');

  const id='1'
  const updateUserDataReducer = jest.fn()
   
describe('<SubscribeButton />', () => {
    describe('testing subscribe button',() => {
        const authState =  {isAuth:true,token:'sometoken',userId:'someUserId',userData:{communities:[]}}
        const { container, rerender,getByTestId,getByText} = render (<SubscribeButton id={id} />,{wrapper: ({ children }) => (
        <AuthContextTestWrapper authState={authState} updateUserDataReducer={updateUserDataReducer} children={children} />
      )})

      beforeEach(() => {
        const subButton = getByText('Subscribe')
        fireEvent.click(subButton)
    })
      it('snapshot', () => {
        expect(container).toMatchSnapshot();
      });
      it('button with text Subscribe text should exist',() => {
        const subButton = getByText('Subscribe')
        expect(subButton).toBeTruthy()
      })
     
      it('should render with the correct name,placeholder,value,className and type', async () => {
         expect(updateUserDataReducer).toBeCalled()
        });

        
    })
  describe('user is subscribed',()=> {
    const newAuthState = {isAuth:true,token:'sometoken',userId:'someUserId',userData:{communities:['1']}}
    const { container, rerender,getByTestId,getByText} = render(<SubscribeButton id={id} />,{wrapper: ({ children }) => (
       <AuthContextTestWrapper authState={newAuthState} updateUserDataReducer={updateUserDataReducer} children={children} />
     )})
    it('button with Unsubscribe test should exist', () => {
          const subButton = getByText('Unsubscribe')
          expect(subButton).toBeTruthy()
    })
  })
 
});
