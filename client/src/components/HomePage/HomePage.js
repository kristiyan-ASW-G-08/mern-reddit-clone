import React from 'react'
import { withRouter } from 'react-router-dom';
const HomePage = props => {
    console.log(props)
    return (
        <div className="home-page">
        Home
        </div>
    )
}
export default withRouter(HomePage)