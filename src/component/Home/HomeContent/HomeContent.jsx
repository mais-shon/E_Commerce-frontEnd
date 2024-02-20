import React, { useEffect, useState } from 'react'
import Style from './HomeContent.module.css'
import   image  from '../../../img/portrait-high-resolution-logo.png'
import axios from 'axios';
export default function HomeContent() {
  let [products,setProducts]=useState([]);
  let allProducts = async() => {
   let {data}=await axios.get('https://mais-gaduation.onrender.com/product/getAllProduct');
   setProducts(data.products)
  };
  

  useEffect(() => {
   allProducts();
  
  }, []); 

  return (
    <div className={Style.super}>
        <div className="container ">
<div  >
   <img src={image}  className={Style.image} />
</div>
<div className={Style.content}>
<div className="row">

<div className={Style.content}>
<div className="row">
{products.map((element)=>(
        <div className="col-4" >
        <div className={Style.card}>
          <div className="card" style={{ width: '20rem' ,maxHeight:'20rem',height:'20rem'}}>
          <img className="card-img-top my-1" src={element.mainImage.secure_url} alt="Card image cap"   style={{ width: '18rem' ,maxHeight:'15rem',height:'15rem',margin:"auto"}}/>
            <div className="card-body">
              <h3 className="card-text " style={{ width: '18rem' ,maxHeight:'fix-contex' ,fontSize:"19px",marginTop:"-6%"}} >{element.name}</h3>
              <p className="card-text" style={{ width: '18rem' ,maxHeight:'fix-contex' ,fontSize:"17px",marginLeft:"4%",marginTop:"-4%"}}>{element.finalPrice}</p>
            </div>
          </div>
        </div>
        </div>
))}
        
        
        </div>
        </div>
        
        
        
        </div>
        </div>
    </div></div>


  )
}
