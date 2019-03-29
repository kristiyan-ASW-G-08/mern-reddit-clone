import React from 'react'
import {render,fireEvent,waitForElement,cleanup} from 'react-testing-library'
import Toggle from './Toggle'


describe('<Toggle />',() => {
    afterEach(cleanup)
    const Content = () => (<h1>Content</h1>)
    const { container, getByText,queryByTestId } = render (
        <Toggle>
        {({ on, toggle }) => (
          <>
            <div>
                <div data-testid="container">
              {on ? <Content/> : '' }
              </div>
              <button
                className="button button-toggle"
                onClick={toggle}
              >
                {on ? 'Close' : 'Open'}
              </button>
            </div>
            
          </>
        )}
        </Toggle>)

        it(`container should have 0 children`, async() => {
            const container = queryByTestId('container')
            expect(container.children.length).toBe(0)
        })

        
        // it(`button with text Open should exist `, async() => {
        //     const button = await waitForElement(() => getByText('Open'))
        //     expect(button).toBeTruthy()
        // })

        // describe('toggle',() => {
        //     beforeEach( async() => {
        //         const button = await waitForElement(() => getByText('Close'))
        //         console.log(button)
        //         fireEvent.click(button)
        //     })})

            // it(`container should have 1 child`, async() => {
            //     const container = queryByTestId('container')
            //     expect(container.children.length).toBe(1)
            // })
            // it(`button with text Open should exist `, async() => {
            //     const button = await waitForElement(() => getByText('Close'))
            //     expect(button).toBeTruthy()
            // })
    
})

