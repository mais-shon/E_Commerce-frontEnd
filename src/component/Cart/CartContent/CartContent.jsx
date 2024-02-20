import React from 'react'
import Style from './CartContent.module.css'
export default function CartContent() {
  return (
    <div className={Style.super}>
<div className="container">
    <div className={Style.content}>
        <div className="row">
            <div className="cole-6">
<div className="card" style={{display: 'flex'}}>
  <img src="your-image-url.jpg" alt="Small Picture" style={{width: 100, height: 100, objectFit: 'cover', borderRadius: '8px 0 0 8px'}} />
  {/* Right side with card content */}
  <div className="card-body" style={{flexGrow: 1}}>
    <h5 className="card-header">Featured</h5>
    <div className="card-body">
      <h5 className="card-title">Special title treatment</h5>
      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div></div>
</div>

    </div>
</div>



    </div>
  )
}
