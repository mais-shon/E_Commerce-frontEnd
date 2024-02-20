import React, { useContext, useEffect, useState } from 'react'
import Style from './Box.module.css'
import Order from '../Order/Order';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function Box() {
    let [category,setCategory]=useState([]);
const token =localStorage.getItem('userToken');
const [user,setUser]=useState([])
function userToken() {
 

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded User:', decoded);
      setUser(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}

    async function displayCatgory(){
        let {data}=await axios.get('https://mais-gaduation.onrender.com/category/getAllCategory',{headers:{Authorization:`Mais__Hi${token}`}});
       setCategory(data.allCategory)
    }
    useEffect(() => {
      userToken()
displayCatgory();
       }, []); 
 
  return (

<div className={Style.scroll}>
    <div className={Style.box}>
       <div    className="top">
        <div className="row">
         
        {user && user.role === 'Admin' && (
  <div className="col-12">
    <Link className={Style.link} to='/dashbord' style={{marginLeft:'7%',}}><i className="fa-solid fa-house-chimney" style={{marginRight:'2%'}}></i>DashBord</Link>
  </div>
)}

        {user && user.role === 'stakeHolder' && (
  <div className="col-12">
    <Link className={Style.link} to='/StoreProfile' style={{marginLeft:'7%',}}><i className="fa-solid fa-house-chimney" style={{marginRight:'2%'}}></i>My Profile</Link>
  </div>
)}
            {user && user.role === 'Customer' && (
  <>
    <div className="col-12">
      <Link className={Style.link} to='/WishList'><i className="fa-solid fa-bookmark px-2"></i>My favourite</Link>
    </div>
    <div className="col-12">
      <Link className={Style.link} to='/OrderCart'><i className="fa-solid fa-cart-shopping px-2"></i>Order Cart</Link>
    </div>
  </>
)}
{user.role === 'stakeHolder' || user.role === 'Customer' ? (
  <div className="row">
    <div className="col-12"> 
    <Link className={Style.link} to={user.role === 'Customer' ? '/Order' : '/stakeHolderOrders'}>
  <i className="fa-solid fa-truck-arrow-right px-2"></i>
  {user.role === 'Customer' ? 'My orders' : 'My Orders'}
</Link>

    </div>
  </div>
) : (
  <div className="row">
    <div className="col-12">
      <Link className={Style.link} to='/AllUsers'> <i className="fa-solid fa-user-group mx-2"></i>All Users </Link>
    </div>
    <div className="col-12">
      <Link className={Style.link} to='/AllCategory'><i className="fa-solid fa-layer-group mx-2"></i>All Categories</Link>
    </div>
    <div className="col-12">
      <Link className={Style.link} to='/CustomerReport'><i className="fa-solid fa-table mx-2"></i>Customer Report</Link>
    </div>
    <div className="col-12">
      <Link className={Style.link} to='/ProductReport'><i className="fa-solid fa-table-columns mx-2"></i>Product Report</Link>
    </div>
    <div className="col-12">
      <Link className={Style.link} to='/AllOrder'><i className="fa-solid fa-truck mx-2"></i>All Orders</Link>
    </div>
  </div>
)}
            <div className="col-12">
            <Link  className={Style.link} to='/AllProduct' ><i className="fa-solid fa-shirt px-2"></i>All Products</Link>
            </div>
            <div className="col-12">
            <Link  className={Style.link} to='/Stores'> <i className="fa-solid fa-store px-2"></i>Stores</Link>
            </div>
            <div className="col-12">
            <Link  className={Style.link} to='/UpdateAccount'><i className="fa-regular fa-pen-to-square px-2"></i>Update Account</Link>
            </div>
         
      
        </div>
        
        {user.role === 'stakeHolder' || user.role === 'Customer' ? (
  <div className="row">
    <h3>Categories</h3>
    {category.map((element) => (
      <div key={element._id} className="col-12">
        <Link to={`/categorystore/${element._id}`} className={Style.link}>
          {element.name}
        </Link>
      </div>
    ))}
  </div>
) : (
  null  // Or any other component/message you want to render for other roles
)}
      
      
      
        
       </div>
       </div>    

    </div>
  )
}
