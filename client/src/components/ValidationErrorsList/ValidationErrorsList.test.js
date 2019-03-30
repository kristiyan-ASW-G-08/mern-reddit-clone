import React from 'react'
import {render,cleanup,fireEvent, getByTestId} from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom';
import ValidationErrorsList from './ValidationErrorsList'

describe('<ValidationErrorsList />',() => {
    const validationErrorsMessages = []
    const { container, rerender,queryByTestId ,getByTestId } = render (<ValidationErrorsList validationErrorMessages={validationErrorsMessages}/>)

    it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it("errors-list", async () => {
        const errorsList =  queryByTestId('error-list')
        expect(errorsList).toBeNull();
        const newErrorsList = ['Email is already taken!','Wrong Password!']
        rerender(<ValidationErrorsList validationErrorMessages={newErrorsList}/>)
        const rerenderedErrorsList =  getByTestId('error-list')
        expect(rerenderedErrorsList.childElementCount).toBe(2)
      });
    })
