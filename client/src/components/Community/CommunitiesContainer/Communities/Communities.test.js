import React from 'react';
import { render } from 'react-testing-library';
import Communities from './Communities';
import {BrowserRouter} from 'react-router-dom'

describe('<Communities/>',() => {
    const communities = [
        {
            name:'test',
      icon:'default',
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      creator: 'test master',
      subscribers:10,
      _id:'1',
        },
        {
            name:'test',
      icon:'default',
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      creator: 'test master',
      subscribers:10,
      _id:'2',
        }
    ]
    
    const { container, rerender,getByTestId} = render (<Communities communities={communities} />,{wrapper:BrowserRouter
      })
    
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it('should have 3 children',() => {
        const element =  getByTestId('communities')
        expect(element.children.length).toBe(2)
    })
      
})

