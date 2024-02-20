import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Style from './StoreProductContent.module.css'
export default function StoreProductContent() {
    let { id } = useParams();
    const token = localStorage.getItem('userToken');
  const [products,setProdcuts]=useState([]);
   
      async function getproducts() {
        try {
          const { data } = await axios.get(`https://mais-gaduation.onrender.com/product/${id}`, {
            headers: { Authorization: `Mais__Hi${token}` }
          });
          setProdcuts(data.products)
        
        } catch (error) {
          console.error("Error fetching stores:", error);
        }
      }
    
    useEffect(()=>{
      getproducts();
   ;
  },[id, token])
  
  return (
    <div className={Style.super}>
        <h2  className={Style.head}> Welcome in our store <i className="fa-regular fa-face-smile-wink" /></h2>
<div className="row " style={{marginTop:'5%'}}>
        {products.map((element) => (
    <div className="col-4" key={element._id}>
      <Link  to={`/SpecificProduct/${element._id}`} style={{textDecoration:'none'}}>
        <div className={Style.card} style={{width:'70rem'}}>
          <div className="card" style={{ width: '20rem', maxHeight: '20rem', height: '20rem' ,marginBottom:'2%'}}>
            <img
              className="card-img-top my-1"
              src={element.mainImage.secure_url} 
              alt="Card image cap"
              style={{ width: '19rem', maxHeight: '19rem', height: '15rem', margin: 'auto' }}
            />
            {/* Removed the empty Link component from here */}
            <div className="card-body">
              <h3 className="card-text" style={{ width: '18rem', maxHeight: 'fix-contex', fontSize: "19px", marginTop: "-6%" }}>
              {element.name}
              </h3>
              <p className="card-text" style={{ width: '18rem', maxHeight: 'fix-contex', fontSize: "17px", marginLeft: "4%", marginTop: "-4%" }}>
                {element.finalPrice}
              </p>
            </div>
          </div>
        </div>
        </Link>
    </div>
  ))}
</div>
    </div>
  )
}
