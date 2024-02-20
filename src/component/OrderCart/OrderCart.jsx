import React from 'react'
import Style from './OrderCart.module.css'
import Box from '../Box/Box'
import OrderCartContent from './OrderCartContent/OrderCartContent'

export default function OrderCart() {
  return (
    <div className={Style.ordercart}>
  <Box />
      <OrderCartContent/>
        
        </div>
  )
}
