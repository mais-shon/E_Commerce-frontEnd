import React from 'react'
import Box from '../Box/Box'
import StoreProductContent from './StoreProductContent/StoreProductContent'
import Style from './StoreProduct.module.css'
export default function StoreProduct() {
  return (
    <div className={Style.super}>
        <Box/>
        <StoreProductContent/>
    </div>
  )
}
