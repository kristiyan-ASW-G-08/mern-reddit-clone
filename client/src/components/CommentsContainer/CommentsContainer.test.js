import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';
import CommentsContainer from './CommentsContainer';
import AuthContextTestWrapper from '../../AuthContext/AuthContextTestWrapper'
const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}
describe('<CommentsContainer/>',() => {
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
        const getNextPage  = jest.fn()
        const setComments = jest.fn()
        const toggle = jest.fn()
        const deleteCommentElement = jest.fn()
        const on = false
        const {container,getByTestId,getByText} = render (<CommentsContainer comments={comments} getNextPage={getNextPage} setComments={setComments} on={on} toggle={toggle}/>,{wrapper: ({ children }) => (
            <AuthContextTestWrapper authState={authState} children={children} />
          )})
          it('snapshot',() => {
            expect(container).toMatchSnapshot()
        })
        it('should have 2 children',async () => {
            const element = await waitForElement(() => getByTestId('comments-container'))
            expect(element.children.length).toBe(2)
        })
        it('should have firstChild with 2 children',async () => {
            const element = await waitForElement(() => getByTestId('comments-container'))
            expect(element.firstElementChild.children.length).toBe(3)
        })
        it('should have child with "Load More" text',async () => {
            const element = await waitForElement(() => getByText('Load More'))
            expect(element).toBeTruthy()
        })


        // it('should have element with "No Posts"',async () => {
        //      rerender (<PostsContainer posts={[]} getNextPage={getNextPage} setPosts={setPosts} />)
        //     const element = await waitForElement(() => getByText('No Posts'))
        //     expect(element).toBeTruthy()
        //  }) 
})