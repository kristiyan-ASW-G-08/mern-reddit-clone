import React from 'react'

import {render,fireEvent, getByValue,waitForElement} from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom';
import SignupForm from './SignupForm'

describe('<SignupForm />',() => {
    const username = "testUser";
    const email = "testEmail@email.com";
    const password = 'testpass1012'
    const matchPassword = 'testpass1012'
    const { container, getByPlaceholderText, getByValue,getByText } = render (<BrowserRouter><SignupForm/></BrowserRouter>)
    beforeEach(() => {    
        const usernameInput = getByPlaceholderText('Username')
        fireEvent.change(usernameInput, {target : {value : username}})

        const emailInput = getByPlaceholderText('Email')
        fireEvent.change(emailInput, {target : {value : email}})

        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(passwordInput, {target : {value : password}})

        const matchPasswordInput = getByPlaceholderText('Repeat your password')
        fireEvent.change(matchPasswordInput, {target : {value : matchPassword}})
    })
    it("should change input value", async () => {
        const updatedUsernameInput = await waitForElement(() => getByValue(username))
        const updatedEmailInput = await waitForElement(() => getByValue(email))
        const updatedPasswordInput = await waitForElement(() => getByValue(password))
        const updatedMatchPasswordInput = await waitForElement(() => getByValue(matchPassword))
        expect(updatedUsernameInput).toBeTruthy
        expect(updatedEmailInput).toBeTruthy
        expect(updatedPasswordInput).toBeTruthy
        expect(updatedMatchPasswordInput).toBeTruthy
      });
})