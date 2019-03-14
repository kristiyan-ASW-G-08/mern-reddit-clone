import React,{useContext} from 'react'
import {AuthContextData} from '../../../AuthContext/AuthContext'
import { Link,} from 'react-router-dom';
import subscribe from './subscribe';
const CommunityDetails = props => {
    const {authState} = useContext(AuthContextData)
    const {name,icon,subscribers} = props
    const subscirbeHandler = () => {
       
    }
    return (
        <div className="community-details">
        <h3 className="community-details-title">Community Details</h3>
        <div className="community-banner">
            <div className="community-logo">
            <img src={`http://localhost:8080/images/${icon}`} alt={`${name}`}/>
            </div>
            </div>
            <h1 className="community-name">{name}</h1>
            <h2 className="community-subscribers">Subscribers {subscribers}</h2>
            <div className="buttons-container">
            <button onClick={subscirbeHandler} className="button">
                Subscibe
            </button>
            <button className="button">
                <Link data-testid="create-post"  to={`/create-post/${name}`}>
                Create Post
                </Link>
            </button>
            </div>
        </div>
    )
}
export default CommunityDetails 