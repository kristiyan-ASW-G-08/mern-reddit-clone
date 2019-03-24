import React from 'react'
import {NavLink} from 'react-router-dom'
const ComponentName= ({path,content}) => {
    return (
        <li>
        <NavLink to={path} activeClassName="active" >
            {content}
        </NavLink>
        </li>
    )
}
export default ComponentName