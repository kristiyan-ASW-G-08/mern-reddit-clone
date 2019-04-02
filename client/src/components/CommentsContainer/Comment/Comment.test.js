import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import Comment from './Comment';
import AuthContextTestWrapper from '../../../AuthContext/AuthContextTestWrapper'
const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}

describe('<Comment/>',() => {
    const comment = {
        creationDate :'2019-04-01T13:51:12.885Z',
        communityId :'testId',
        authorId :"authorId",
        author :"Joseph Joestar",
        postId :'testPostId',
        postTitle: 'tstPostTitle',
        content :'Your next line is...',
        upvotes :10,
        downvotes :3,
        comments:1
    }
    const toggle = jest.fn()
    const deleteCommentElement  = jest.fn()
    const setEditComment  = jest.fn()
    const on = false
    const humanReadableCreationDate = 'Mon Apr 01 2019'
    
    const { container, rerender,queryByPlaceholderText,queryByValue ,getByPlaceholderText,getByText } = render (<Comment comment={comment} toggle={toggle} deleteCommentElement={deleteCommentElement} setEditComment={setEditComment} on={on} />,{wrapper: ({ children }) => (
      <AuthContextTestWrapper authState={authState} children={children} />
      )})
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })

      it('should have author element',  () => {
        const element =  getByText(`u/${comment.author}`)
        expect(element.className).toMatch('comment-author')
        expect(element).toBeTruthy;
      });
      it('should have date element',  () => {
        const element =  getByText(humanReadableCreationDate)
        expect(element.className).toMatch('comment-date')
        expect(element).toBeTruthy;
      });
      it('should have content element',  () => {
        const element =  getByText(`${comment.content}`)
        expect(element.className).toMatch('comment-content')
        expect(element).toBeTruthy;
      });
      
})

