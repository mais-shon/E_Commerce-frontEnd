import React from 'react'
import AllProductContent from './AllProductContent/AllProductContent'
import Box from '../Box/Box'
import Style from'./AllProduct.module.css';

export default function AllProduct() {
  return (
    <div className={Style.super}>
      <Box/>
<AllProductContent/>

    </div>
  )
}
