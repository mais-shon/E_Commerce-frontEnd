import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import   image  from '../../../img/portrait-high-resolution-logo.png'
import Style from './CategoryStoreContent.module.css';
import   image2  from '../../../img/onlineshop.png'
import Stores from '../../Stores/Stores';
export default function CategoryStoreContent() {
  let { id } = useParams();
  const [stores, setStores] = useState([]);
  let [search,setSearch]=useState([]);
  const token = localStorage.getItem('userToken');

 
    async function getStores() {
      try {
        const { data } = await axios.get(`https://mais-gaduation.onrender.com/user/getstakeHolder/${id}`, {
          headers: { Authorization: `Mais__Hi${token}` }
        });
       setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }
useEffect(()=>{
    getStores();
 ;
},[id, token])

  return (
    <div>
   <div className={Style.super} >
        <div className="container ">
<div><img src={image}  className={Style.image} style={{width:'68rem'}} /></div>
<div className={Style.content}>
<h2 className={Style.head}>Stores</h2>
<input type='search' name='pname' style={{width:'64rem',padding:'1% 2%',borderRadius:'5px',marginBottom:'2%'}} placeholder='Please seach by name' valye={search} onChange={(e)=>{setSearch(e.target.value)}}/>
<div className="row">
{stores.filter((element) => {
  if (search === '') {
    return element;
  } else if (element.firstName.includes(search)) {
    return element;
  }
}).map((element) => (
    <div className="col-4" key={element._id}>
      {/* Wrap the entire card in Link */}
      <Link to={`/storeproduct/${element._id}`} className={Style.link}>
        <div className={Style.card} style={{width:'70rem'}}>
          <div className="card" style={{ width: '20rem', maxHeight: '20rem', height: '20rem' ,marginBottom:'2%'}}>
            <img
              className="card-img-top my-1"
              src={element.profilePic?.secure_url || image2}
              alt="Card image cap"
              style={{ width: '19rem', maxHeight: '19rem', height: '15rem', margin: 'auto' }}
            />
            {/* Removed the empty Link component from here */}
            <div className="card-body">
              <h3 className="card-text" style={{ width: '18rem', maxHeight: 'fix-contex', fontSize: "19px", marginTop: "-6%" }}>
                {element.firstName} {element.lastName}
              </h3>
              <p className="card-text" style={{ width: '18rem', maxHeight: 'fix-contex', fontSize: "17px", marginLeft: "4%", marginTop: "-4%" }}>
                {element.address}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ))}



</div>
</div></div>
</div>
</div>
    

  );
  }