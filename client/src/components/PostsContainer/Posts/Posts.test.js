import React from 'react';
import { render } from 'react-testing-library';
import Posts from './Posts';
import AuthContextTestWrapper from '../../../AuthContext/AuthContextTestWrapper'
const updateUserDataReducer = jest.fn()
const authState =  {isAuth:false,token:null,userId:null,userData:null,updateUserDataReducer}
describe('<Posts/>',() => {
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
    const deletePostElement  = jest.fn()
    const { container, rerender,getByTestId} = render (<Posts posts={posts} deletePostElement={deletePostElement} />,{wrapper: ({ children }) => (
        <AuthContextTestWrapper authState={authState} children={children} />
      )})
      it('snapshot',() => {
        expect(container).toMatchSnapshot()
    })
    it('should have 2 children',() => {
        const element =  getByTestId('posts')
        expect(element.children.length).toBe(2)
    })
      
})

