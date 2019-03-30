import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { render, fireEvent, waitForElement } from 'react-testing-library';
import Post from './Post';


import {AuthContextData} from '../../../AuthContext/AuthContext'
const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}
describe('<Post/>',() => {
    const post = {
        title:'post',
        author:'NewUser',
        comments:0,
        communityName:'react',
        comments:0
    }
    const community = {
        communityName:'react'
    }
    const deletePostElement  = jest.fn()

    
    const { container, rerender,queryByPlaceholderText,queryByValue ,getByPlaceholderText,getByText } = render (<Post post={post} community={community} deletePostElement={deletePostElement} />,{wrapper: ({ children }) => (
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
        const element =  getByText(`u/${post.author}`)
        expect(element.className).toMatch('post-author')
        expect(element).toBeTruthy;
      });
      it('should have element with post.title text', async () => {
        const element =  getByText(`${post.title}`)
        expect(element.className).toMatch('post-title')
        expect(element).toBeTruthy;
      });
      
})

