import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { render, fireEvent, waitForElement } from 'react-testing-library';
import PostContainer from './PostContainer';

import {AuthContextData} from '../../../AuthContext/AuthContext'
const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}
describe('<PostContainer/>',() => {
    const post = {
        title:'post',
        author:'NewUser',
        comments:0,
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        communityName:'react',
        comments:0
    }

    const { getByText } = render (<PostContainer post={post}  />,{wrapper: ({ children }) => (
        <AuthContextData.Provider value={{authState}}>
        <BrowserRouter>
          {children}
          </BrowserRouter>
        </AuthContextData.Provider>
      )})

    it('should have element with c/post.communityName text', async () => {
        const element =  getByText(`c/${post.communityName}`)
        expect(element.className).toMatch('post-community')
        expect(element).toBeTruthy;
      });
      it('should have element with u/post.author text', async () => {
        const element =  getByText(`Posted by u/${post.author}`)
        expect(element.className).toMatch('post-author')
        expect(element).toBeTruthy;
      });
      it('should have element with post.title text', async () => {
        const element =  getByText(`${post.title}`)
        expect(element.className).toMatch('post-title')
        expect(element).toBeTruthy;
      });
      it('should have element with post.content text', async () => {
        const element =  getByText(`${post.content}`)
        expect(element.className).toMatch('post-content')
        expect(element).toBeTruthy;
      });
      
})

