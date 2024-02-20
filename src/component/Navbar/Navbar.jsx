import React from 'react'
import { Link } from 'react-router-dom'

import Style from "./Navbar.module.css";
function Navbar({user,logOut}) {
  return (

   <nav className={`${Style.navbar} navbar navbar-expand-lg w-100 h-100`}>
<div className="container w-100">
 
  <div className="  collapse navbar-collapse w-100 h-100" id="navbarSupportedContent ">
  <ul className="navbar-nav me-auto mb-2">
    <div className={Style.portrait}>
  <li className="nav-item active">
      <Link className={`${Style.portrait} nav-link`} to="Welcome">
        Portrait
      </Link>
    </li></div>
    <li  className={Style.icon}> <i className="fa-solid fa-cart-shopping"></i></li>
 
    </ul>

    <ul className="navbar-nav ms-auto mb-2">
        
    {user && user.role === 'stakeHolder' && (
    <li className="nav-item">
      <Link className="nav-link mc-4" to='/StoreProfile'> Profile <i className="fa-solid fa-house-chimney" ></i></Link>
    </li>
  )}


    {!user ? <>
    <div className={Style.signin}>
    <li className="nav-item active">
    <Link className="nav-link " to="Login">Sign in</Link>
  </li></div>
  <div className={Style.Signup}>
  <li className="nav-item">
    <Link className="nav-link" to="Logup">Sign up</Link>
  </li>
  </div>
    </>:
    <div className={Style.signout}>
      <li className="nav-item">
      <p className="nav-link" onClick={logOut}> Sign out</p>
    </li>
    </div>
    }
    
    
    </ul>
  </div></div>
</nav>
  )
}

export default Navbar