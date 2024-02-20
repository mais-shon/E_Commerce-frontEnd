import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Footer.module.css'

function Footer() {
  return (
    <div className={Style.footer}>
    <div className="footer-links">
      <div className="row">
        <div className="col-4">
    <ul>
  <li><h4>Copmany infomrantion</h4></li>
  <li><Link className={Style.link}>About Portrait</Link></li>
  <li><Link className={Style.link}>Call Us</Link></li>
  <li><Link className={Style.link}>Be one of our members</Link></li>
  <li><Link className={Style.link}>Social responsibility</Link></li>
</ul>
</div>
<div className="col-4">
    <ul>
  <li><h4>Help Center</h4></li>
  <li><Link className={Style.link}>How to order</Link></li>
  <li><Link className={Style.link}>Frequently asked questions</Link></li>
  <li><Link className={Style.link}>Be one of our members</Link></li>
  <li><Link className={Style.link}>Social responsibility</Link></li>
</ul>
</div>


</div>
    
    </div>
   

  </div>


  )
}

export default Footer