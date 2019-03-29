import React from 'react'

import {render,cleanup,fireEvent} from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom';
import Input from './Input'

describe('<Input />',() => {
    const setHook = jest.fn()
    const value= 'test'
    const newValue="test compleated"
    const type= 'text'
    const placeholder= 'Test Placeholder'
    const name= 'test'
    let errorArr = []
    const { container, rerender,queryByPlaceholderText,queryByValue ,getByPlaceholderText } = render (<Input setHook={setHook} value={value} type={type} placeholder={placeholder} errorArr={errorArr} name={name} />)

    it('should render with the correct name,placeholder,value,className and type', async () => {
        const inputElement =  getByPlaceholderText(placeholder)
        expect(inputElement).toBeTruthy;
        expect(inputElement.value).toEqual(value);
        expect(inputElement.className).toEqual('input');
        expect(inputElement.type).toEqual(type);
        expect(inputElement.name).toEqual(name);
      });
      describe('onChange Event', () => {
        beforeEach(() => {
          const inputElement = getByPlaceholderText(placeholder) ;
          fireEvent.change(inputElement, { target: { value: newValue } });
        });
        it('setHook should be called', () => {
          expect(setHook).toBeCalled();
          expect(setHook).toBeCalledTimes(1);
        });
      });

      
//  it('error handling', () => {
//      const newErrorArr = ['test']
//   rerender(<Input setHook={setHook} value={value} type={type} placeholder={placeholder} errorArr={newErrorArr} name={name} />)
//   const inputWithError = getByPlaceholderText(placeholder)
//   console.log(inputWithError)
// }) 
})
