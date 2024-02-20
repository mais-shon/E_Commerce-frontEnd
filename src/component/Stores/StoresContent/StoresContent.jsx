import React, { useEffect, useState } from 'react'
import Style from './StoresContent.module.css'
import   image  from '../../../img/portrait-high-resolution-logo.png'
import axios from 'axios';
import   image2  from '../../../img/onlineshop.png'
export default function StoresContent() {
  let [search,setSearch]=useState([]);
  let [stores,setStores]=useState([]);
let token =localStorage.getItem('userToken')
 async function displayStores(){
let {data}=await axios.get('https://mais-gaduation.onrender.com/user/getAllstakeHolder',{   headers: { Authorization: `Mais__Hi${token}` }})
setStores(data.users);
};
 useEffect(()=>{
displayStores()
 },[token])
  return (
    <div className={Style.super}>
        <div className="container ">
<div  >
   <img src={image}  className={Style.image} />
</div>
<div className={Style.content}>
<input type='search' name='pname' style={{width:'64rem',padding:'1% 2%',borderRadius:'5px',marginBottom:'2%'}} placeholder='Please seach by name' valye={search} onChange={(e)=>{setSearch(e.target.value)}}/>
<div className="row">
{stores.filter((element) => {
  if (search === '') {
    return element;
  } else if (element.firstName.includes(search)) {
    return element;
  }
}).map((element) => (
  <div className="col-4" key={element.id}>
    <div className={Style.card}>
      <div className="card" style={{ width: '20rem', maxHeight: '20rem', height: '20rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div > 
          {element.profilePic && element.profilePic.secure_url ? (
            <img className={Style.img} src={element.profilePic.secure_url} alt="Card image cap" style={{ width: '17rem', maxHeight: '15rem', height: '15rem' ,textAlign:'center', marginTop:'2%'}} />
          ) : (
            <img className={Style.img} src={image2} alt="Default Image" style={{ width: '17rem', maxHeight: '15rem', height: '15rem' , marginTop:'2%'}} />
          )}
        </div>
        <div className="card-body">
          <h3 className="card-text " style={{width: '200%',marginLeft:'-28%',marginTop:'-9%'}}>{element.firstName} {element.lastName}</h3>
          <p className="card-text" style={{width: '200%',marginLeft:'-29%',marginTop:'-4%'}}>{element.categoryName}</p>
        </div>
      </div>
    </div>
  </div>
))}
        
        
        </div>
        </div>
    </div></div>


  )
}
