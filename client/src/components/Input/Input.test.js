import React from 'react'

import {render,cleanup} from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom';
import Input from './Input'

describe('<Input />',() => {
    describe('without error',() => {
    const setHook = jest.fn()
    const value= 'test'
    const type= 'text'
    const placeholder= 'Test Placeholder'
    const name= 'test'
    let errorArr = []
    const { container, rerender,queryByPlaceholderText,queryByValue ,getByPlaceholderText } = render (<Input setHook={setHook} value={value} type={type} placeholder={placeholder} errorArr={errorArr} name={name} />)
    beforeEach(() => {    
        
    })
    it('should have placeholder text equal to placeholder',() => {
        expect(queryByPlaceholderText(placeholder)).toBeTruthy()
    })
    it('should have value text equal to value',() => {
        expect(queryByValue(value)).toBeTruthy()
    })
    it('should have input class',() => {
        expect(getByPlaceholderText(placeholder).className).toMatch('input')
    })
    it('should have name equal to name',() => {
        expect(getByPlaceholderText(placeholder).name).toMatch(name)
    })

    })
    //////Currently dosn't work  /////

    describe('with error',() => {
        const setHook = jest.fn()
    const value= 'test'
    const type= 'text'
    const placeholder= 'Test Placeholder'
    const name= 'test'
        const errorArr = ['test']
        const { getByPlaceholderText } = render (<Input setHook={setHook} value={value} type={type} placeholder={placeholder} errorArr={errorArr} name={name}/>)
        it('should have input class',() => {
            console.log(getByPlaceholderText(placeholder))
            expect(getByPlaceholderText(placeholder).className).toMatch('input')
        })
    })
})
