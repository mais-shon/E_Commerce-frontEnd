import React, { useEffect, useState } from 'react';
import portrait from '../../img/39545341-c50a9184-4e05-11e8-88e0-0e1f3fa4834b.png';
import Style from './Welcome.module.css';
import axios from 'axios';

function Welcome() {

  let [products,setProducts]=useState([]);
  let allProducts = async() => {
   let {data}=await axios.get('https://mais-gaduation.onrender.com/product/getAllProduct');
   setProducts(data.products)
  };
  

  useEffect(() => {
   allProducts();
  
  }, []); 


  return (
    <div className="container">
      <div className={Style.super}>
        <img src={portrait} alt="Portrait" style={{ width: '90%', height: '40%' ,marginTop: '4%' }}/>
      </div>
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


  
  );
}

export default Welcome;