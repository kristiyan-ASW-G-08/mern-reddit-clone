import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import CommunityPreview from './CommunityPreview';
import {BrowserRouter} from 'react-router-dom'

describe('<CommunityPreview/>',() => {
    const community = {
        name:'test',
  icon:'default',
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  creator: 'test master',
  subscribers:10,
  _id:'1',
    }
  
    
    const { container, rerender,getByTestId,queryByValue ,getByPlaceholderText,getByText } = render (<CommunityPreview community={community}  />,{wrapper:BrowserRouter})
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it('should have community name element',  () => {
        const communityName =  getByText(`c/${community.name}`)
        expect(communityName.className).toMatch('community-preview-body-name')
        expect(communityName).toBeTruthy;
      });

      it('should have element image with test id "community-logo"', async () => {
        const communityLogo =  getByTestId(`community-logo`)
        expect(communityLogo).toBeTruthy()
        expect(communityLogo.src).toMatch(`http://localhost:8080/images/${community.icon}`)
        expect(communityLogo.alt).toMatch(community.name)
      });
     
      it('should have element with post.title text',  () => {
        const communitySubscribers =  getByText(`${community.subscribers} subscribers`)
        expect(communitySubscribers.className).toMatch('community-preview-body-subscribers')
        expect(communitySubscribers).toBeTruthy;
      });
      
})

