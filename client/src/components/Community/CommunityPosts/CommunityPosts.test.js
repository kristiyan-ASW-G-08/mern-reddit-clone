import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import CommunityPosts from './CommunityPosts';
import AuthContextTestWrapper from '../../../AuthContext/AuthContextTestWrapper'
jest.mock('../../../util/getData');
describe('<CommunityPosts/>',() => {
    const communityId = '1234'
    const authState = {
      isAuth:true,userId:'tests',token:'sadsda',userData:{communities:[]}
    }

    const { container,getByTestId } = render (<CommunityPosts  communityId={communityId}  />,{wrapper: ({ children }) => (
      <AuthContextTestWrapper authState={authState} children={children} />
      )})
      console.log(container.current)
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it('posts element should have 2 children',() => {
        const posts =  getByTestId('posts')
        expect(posts.children.length).toBe(2)
    })

    it('posts element children should have className post ',() => {
      const posts =  getByTestId('posts')
      const classNameCheck = Object.values(posts.children).every(child => child.className === 'post')
      expect(classNameCheck).toBe(true)
  })
})
