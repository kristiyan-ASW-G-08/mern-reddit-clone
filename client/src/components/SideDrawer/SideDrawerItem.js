import React from 'react'
import {NavLink} from 'react-router-dom'
const SideDrawerItem= ({content,active,toggle}) => {
    return (
        <li className="side-drawer-container-list-item"><NavLink onClick={toggle} to={active} activeClassName="active">{content}</NavLink></li>
    )
}
export default SideDrawerItem