import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Navigate, Outlet} from 'react-router-dom';
import {useNavigate } from 'react-router-dom'




export default function LayOut ({user,setUser}) {
  let navigate=useNavigate();
  function logOut(){
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/Welcome')

  }
  return (
    <div>
<Navbar user={user} logOut={logOut} />

<Outlet>

</Outlet>



    </div>
  )
}
