import React from 'react'
const HomeBanner = props => {
    return (
        <div className="home-banner">
        <h1 className="home-banner-title">Home</h1>
        <p className="home-banner-text">Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
        <div className="buttons-container">
        <button className="button">Create Community</button>
        <button className="button">Browse Communities</button>
        </div>
        </div>
    )
}
export default HomeBanner 