import React from 'react';
import { render } from 'react-testing-library';
import Comments from './Comments';
import AuthContextTestWrapper from '../../../AuthContext/AuthContextTestWrapper'

const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}
describe('<Comments/>',() => {
    const comments = [{
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
    },{
        creationDate :'2019-04-01T13:51:12.885Z',
        communityId :'testId',
        authorId :"authorId",
        author :"Kujo Joraro",
        postId :'testPostId',
        postTitle: 'tstPostTitle',
        content :'Yare Yare Daze',
        upvotes :110,
        downvotes :13,
        comments:2,
        _id:2,
    },,{
        creationDate :'2019-04-01T13:51:12.885Z',
        communityId :'testId',
        authorId :"authorId",
        author :"Kujo Joraro",
        postId :'testPostId',
        postTitle: 'tstPostTitle',
        content :'Yare Yare Daze',
        upvotes :110,
        downvotes :13,
        comments:2,
        _id:3,
    }]
    const toggle = jest.fn()
  const setEditComment =   jest.fn()
 const on = false
    const deleteCommentElement  = jest.fn()
    const { container, rerender,getByTestId} = render (<Comments comments={comments} deleteCommentElement={deleteCommentElement} on={on} toggle={toggle} setEditComment={setEditComment} />,{wrapper: ({ children }) => (
        <AuthContextTestWrapper authState={authState} children={children} />
      )})
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it('should have 3 children',() => {
        const element =  getByTestId('comments')
        expect(element.children.length).toBe(3)
    })
      
})

