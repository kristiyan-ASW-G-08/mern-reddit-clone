import React from 'react'
import Dropdown from './Dropdown';
import { render, fireEvent, waitForElement,cleanup  } from 'react-testing-library';
import AuthContextTestWrapper from '../../AuthContext/AuthContextTestWrapper'



  describe('<Dropdown/>',() => {
    afterEach(cleanup)
    it('calling render with the same component on the same container does not remount', () => {
        const authState = {
            isAuth:false,userId:null,token:null,userData:null
          }
        const { container,getByText,getByTestId,rerender } = render (<Dropdown  />,{wrapper: ({ children }) => (
            <AuthContextTestWrapper authState={authState} children={children} />
            )})
       
        let signUpButton = (waitForElement(() => getByText('SignUp')))
        let loginButton = (waitForElement(() => getByText('Login')))
        expect(signUpButton).toBeTruthy()
        expect(loginButton).toBeTruthy()
        // rerender(<Dropdown  />,{wrapper: ({ children }) => (
        //     <AuthContextTestWrapper authState={authState} children={children} />
        //     )})

        //  signUpButton = (waitForElement(() => getByText('SignUp')))
        //  loginButton = (waitForElement(() => getByText('Login')))
        // expect(signUpButton).toBeFalsy()
        // expect(loginButton).toBeFalsy()
      })
   
  })
