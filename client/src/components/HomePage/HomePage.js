import React,{useContext} from 'react'
import { withRouter } from 'react-router-dom';
import {AuthContextData} from '../../AuthContext/AuthContext'
const HomePage = props => {
    const context = useContext(AuthContextData)
    console.log(context)
    return (
        <div className="home-page">
        Home
        </div>
    )
}
export default withRouter(HomePage)