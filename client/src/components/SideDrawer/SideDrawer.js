import React from 'react'
import SideDrawerItem from './SideDrawerItem';
const SideDrawer = ({on,toggle,listItems}) => {
    return (
        <div className={`side-drawer ${on ? 'active' : ''}`}>
        <div className="side-drawer-container">
        <header className="side-drawer-container-header"></header>
        <ul className="side-drawer-container-list">
        {listItems.map(listItem => {
            return <SideDrawerItem key={listItem.active}  content={listItem.content} active={listItem.active} toggle={toggle}/>
        })}
        </ul>
        </div>
        <div onClick={toggle} className="side-drawer-backdrop"></div>
        </div>
     
    )
}
export default SideDrawer