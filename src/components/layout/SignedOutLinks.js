import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <div className="navcontainer">
            <ul className="left">
            <li><NavLink to="/" className="">
                    <img src="logo.png" alt="Home" style={{height: "2em"}} />
                    
                </NavLink>
            </li>
            <li><h3 style={{cursor: "default"}}>piEnabler</h3></li>
            </ul>
            <ul className="right">
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
                <li><NavLink to='/signin'>Log In</NavLink></li>
            </ul>
        </div>

    )

}

export default SignedOutLinks