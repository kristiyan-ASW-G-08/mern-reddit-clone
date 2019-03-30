import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';
import PostsContainer from './PostsContainer';
import {AuthContextData} from '../../AuthContext/AuthContext'
const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}
describe('<PostsContainer/>',() => {
        const posts = [{
            title:'post',
            author:'NewUser',
            comments:0,
            communityName:'react',
            comments:0,
            _id:0
        },{
            title:'post',
            author:'NewUser',
            comments:0,
            communityName:'react',
            comments:0,
            _id:1
        }]
        const getNextPage  = jest.fn()
        const setPosts = jest.fn()
        const {rerender,getByTestId,getByText} = render (<PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts} />,{wrapper: ({ children }) => (
            <AuthContextData.Provider value={{authState}}>
            <BrowserRouter>
              {children}
              </BrowserRouter>
            </AuthContextData.Provider>
          )})
        it('should have 2 children',async () => {
            const element = await waitForElement(() => getByTestId('posts-container'))
            expect(element.children.length).toBe(2)
        })
        it('should have firstChild with 2 children',async () => {
            const element = await waitForElement(() => getByTestId('posts-container'))
            expect(element.firstElementChild.children.length).toBe(2)
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