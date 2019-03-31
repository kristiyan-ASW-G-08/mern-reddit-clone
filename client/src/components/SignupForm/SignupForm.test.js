import React from 'react'

import {render,fireEvent, getByValue,waitForElement} from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
jest.mock('../../util/postData');
import SignupForm from './SignupForm'
describe('<SignupForm />',() => {
    const history = createBrowserHistory()
    history.replace = jest.fn()
    const username = "testUser";
    const email = "testEmail@email.com";
    const password = 'testpass1012'
    const matchPassword = 'testpass1012'
    const { container, getByPlaceholderText, getByValue,getByText } = render (<SignupForm />,{wrapper:BrowserRouter})
    beforeEach(() => {    
        const usernameInput = getByPlaceholderText('Username')
        fireEvent.change(usernameInput, {target : {value : username}})

        const emailInput = getByPlaceholderText('Email')
        fireEvent.change(emailInput, {target : {value : email}})

        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(passwordInput, {target : {value : password}})

        const matchPasswordInput = getByPlaceholderText('Repeat your password')
        fireEvent.change(matchPasswordInput, {target : {value : matchPassword}})
        const submitButton = getByText('SIGN UP')
        fireEvent.click(submitButton)
    })
    it("should update input values", async () => {
        const updatedUsernameInput = await waitForElement(() => getByValue(username))
        const updatedEmailInput = await waitForElement(() => getByValue(email))
        const updatedPasswordInput = await waitForElement(() => getByValue(password))
        const updatedMatchPasswordInput = await waitForElement(() => getByValue(matchPassword))
        expect(updatedUsernameInput).toBeTruthy
        expect(updatedEmailInput).toBeTruthy
        expect(updatedPasswordInput).toBeTruthy
        expect(updatedMatchPasswordInput).toBeTruthy
      });

  
    //   it('should call history.replace',() => {
          
    //     const replaceSpy = jest.spyOn(history, 'replace');
    //     expect(replaceSpy).toBeCalled()
    //     replaceSpy.mockRestore()
    //   })
})