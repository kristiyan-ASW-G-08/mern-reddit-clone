import React from 'react'
import { render, cleanup ,waitForElement} from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar'

describe('<Navbar />',() => {
    let isAuth = false
  
    afterEach(cleanup)
    it(`Navbar should display login and signup links if isAuth is false and shouldn't display logout`,  () => {
        const {  queryByTestId } = render(<BrowserRouter><Navbar isAuth={isAuth} /></BrowserRouter>)
        const signUp = queryByTestId('signup')
        const login = queryByTestId('login')
        const logout = queryByTestId('logout')
        expect(logout).toBeNull()
        expect(signUp).toBeTruthy()
        expect(login).toBeTruthy()

      })

      it(`Navbar should display logout  if isAuth is true  shouldnt display login and signup`, () => {
          isAuth = true
        const {   queryByTestId} = render(<BrowserRouter><Navbar isAuth={isAuth} /></BrowserRouter>)
        const signUp =  queryByTestId('signup')
        const login =  queryByTestId('login')
        const logout =  queryByTestId('logout')
        expect(signUp).toBeNull()
        expect(login).toBeNull()
        expect(logout).toBeTruthy()
      })
})
