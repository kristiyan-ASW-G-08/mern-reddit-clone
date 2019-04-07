import React from 'react'
const SideDrawer = ({on,toggle}) => {
    return (
        <div className={`side-drawer ${on ? 'active' : ''}`}>
        <div className="side-drawer-container"></div>
        <div onClick={toggle} className="side-drawer-backdrop"></div>
        </div>
     
    )
}
export default SideDrawer