import React, { useEffect, useState } from 'react';
import Style from './StoreProfileContent.module.css';
import   image  from '../../../img/portrait-high-resolution-logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import   image2  from '../../../img/onlineshop.png'

export default function SoreProfileContent() {

    let [stakeholder,setStakeHolder]=useState([]);
    let[product,setproduct]=useState([]);
    let [info,setInfo]=useState([]);
    const token =localStorage.getItem('userToken');
   
    let displayInfo = async () => {
      let { data } = await axios.get('https://mais-gaduation.onrender.com/user/getUserProfile', {
        headers: { Authorization: `Mais__Hi${token}` }
      });
      console.log(data)
     setInfo(data.user)
    };
    


 
    let displayproduct = async () => {
        try {
          let { data } = await axios.get('https://mais-gaduation.onrender.com/product/getproductforsatkeholder', {
            headers: { Authorization: `Mais__Hi${token}` }
          });
          setproduct(data.products); 
        } catch (error) {
          console.error('Error fetching products:', error);
          // Handle the error, e.g., display an error message to the user
        }
      };
      
      useEffect(() => {
        displayInfo();
        displayproduct();
      }, []);



  return (
  
 <div className={Style.super}>
<div className="container ">
<div  >
   <img src={image}  className={Style.image} />
</div>
<div className={Style.content}>
<div>
<div>
  {info && info.profilePic ? (
    <img src={info.profilePic.secure_url} alt="image" className={Style.img} />
  ) : (
    <img src={image2} alt="Default Image" className={Style.img} />
  )}
</div>
    <div>
        <h2 className={Style.head}>{info.firstName} {info.lastName}</h2>
        <Link className={Style.post} to='/postproduct'><i className="fa-solid fa-plus"></i> Post new product </Link>
        <Link className={Style.update} to='/UpdateAccount'><i className="fa-regular fa-pen-to-square px-2"></i> Update Account </Link>
       
       
        <div className={Style.bio}>
<p>{info.Bio}</p>
        </div>
   
   
   
    </div>

    <div className={Style.products}>
     <div className="row">

     {product.map((element) => (
  <div className="col-6" key={element._id}>
    <div className={Style.card}>
      <div className="card" style={{ width: '19rem' ,height:'19rem'}}>
        <img className="card-img-top"  style={{width: '17rem' ,height:'15rem',margin:'auto',paddingTop:'1%'}} src={element.mainImage.secure_url} alt="Product Image" />
        <div className="card-body">
          <p className="card-text" style={{marginTop:'-3%'}}>{element.name}</p>
          <p className="card-text"  style={{marginTop:'-4%'}}>{element.finalPrice}</p>
        </div>
      </div>
    </div>
  </div>
))}

</div>
</div>
</div>
</div>
</div>
</div>


    
  )
}
