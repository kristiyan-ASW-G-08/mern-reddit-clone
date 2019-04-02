import React from 'react';
import { render, fireEvent, waitForElement,wait } from 'react-testing-library';
import CommentBar from './CommentBar';
import AuthContextTestWrapper from '../../../AuthContext/AuthContextTestWrapper'
const updateUserDataReducer = jest.fn()
jest.mock('../../../util/deleteData')
describe('<CommentBar/>',() => {
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
        comments:1,
        _id:1,
    }
    const toggle = jest.fn()
    const deleteCommentElement  = jest.fn()
    const setEditComment  = jest.fn()
    const on = false
    const authState =  {isAuth:true,token:null,userId:comment.authorId,userData:null,updateUserDataReducer}
    const { container, rerender,queryByPlaceholderText,queryByValue ,getByTestId,getByText } = render (<CommentBar comment={comment} toggle={toggle} deleteCommentElement={deleteCommentElement} setEditComment={setEditComment} on={on} />,{wrapper: ({ children }) => (
      <AuthContextTestWrapper authState={authState} children={children} />
      )})
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })

      it('should have edit button',  () => {
        const element =  getByTestId(`edit-button-${comment._id}`)
        expect(element).toBeTruthy;
        fireEvent.click(element)
        expect(toggle).toHaveBeenCalled()
        expect(setEditComment).toHaveBeenCalled()
        expect(setEditComment).toHaveBeenCalledWith(comment)
      });

      it('should have delete button',  () => {
        const element =  getByTestId(`delete-button`)
        expect(element).toBeTruthy;
        fireEvent.click(element)
        wait(() =>expect(deleteCommentElement).toHaveBeenCalled() )
        wait(() =>  expect(setEditComment).toHaveBeenCalledWith(comment._id) )
      
      }); 
       it('should have share button',  () => {
        const element =  getByTestId(`share-button`)
        expect(element).toBeTruthy;
      });

      it('should have save button',  () => {
        const element =  getByTestId(`save-button`)
        expect(element).toBeTruthy;
      });

      
      
    //   it('should have date element', async () => {
    //     const element =  getByText(humanReadableCreationDate)
    //     expect(element.className).toMatch('comment-date')
    //     expect(element).toBeTruthy;
    //   });
    //   it('should have content element', async () => {
    //     const element =  getByText(`${comment.content}`)
    //     expect(element.className).toMatch('comment-content')
    //     expect(element).toBeTruthy;
    //   });
      
})

