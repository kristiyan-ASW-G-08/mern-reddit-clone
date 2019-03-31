import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import CommunityDetails from './CommunityDetails';
import AuthContextTestWrapper from '../../../AuthContext/AuthContextTestWrapper'
const updateUserDataReducer = jest.fn()
describe('<CommunityDetails/>',() => {
    
    const community = {
      name:'test',
      icon:'jest',
      subscribers:3000,
      _id:'121d2',
      creator:'asdasdca'
    }
    const deletePostElement  = jest.fn()

    const authState = {
      isAuth:true,userId:community.creator,token:'sadsda',userData:{communities:[]}
    }
    const { container,getByText,getByTestId } = render (<CommunityDetails  community={community}  />,{wrapper: ({ children }) => (
      <AuthContextTestWrapper authState={authState} children={children} />
      )})
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it('should have element image with test id "community-logo"', async () => {
        const communityLogo =  getByTestId(`community-logo`)
        expect(communityLogo).toBeTruthy()
        expect(communityLogo.src).toMatch(`http://localhost:8080/images/${community.icon}`)
        expect(communityLogo.alt).toMatch(community.name)
      });
      it('should have element with "community.name" text', async () => {
        const communityName =  getByText(`${community.name}`)
        expect(communityName.className).toMatch('community-name')
        expect(communityName).toBeTruthy;
      });
      it('should have element with "Subscribers community.subscribers" text', async () => {
        const communitySubscribers =  getByText(`Subscribers ${community.subscribers}`)
        expect(communitySubscribers.className).toMatch('community-subscribers')
        expect(communitySubscribers).toBeTruthy;
      });
      it('should have element with "Create Post" text', async () => {
        const createPostButton =  getByText('Create Post')
        expect(createPostButton).toBeTruthy;
      });
      it('mode tools link should exist', async () => {
        const modToolsLink =  getByText('Mod Tools')
        expect(modToolsLink).toBeTruthy;
      });
      
})
