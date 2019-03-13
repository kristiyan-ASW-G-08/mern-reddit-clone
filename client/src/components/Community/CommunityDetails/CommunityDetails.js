import React from 'react'
const CommunityDetails = props => {
    console.log(props)
    const {name,icon,subscribers} = props
    return (
        <div className="community-details">
        <div className="community-banner">
            <div className="community-logo">
            <img src={`http://localhost:8080/images/${icon}`} alt={`${name}`}/>
            </div>
            </div>
            <h1>{name}</h1>
            <h1>Subscribers :{subscribers}</h1>
            <div className="buttons-container">
            <button className="button">
                Subscibe
            </button>
            <button className="button">
                Create Post
            </button>
            </div>
        </div>
    )
}
export default CommunityDetails 