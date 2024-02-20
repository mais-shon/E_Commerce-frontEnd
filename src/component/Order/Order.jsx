import React from 'react'
import Style from './Order.module.css'
import Box from '../Box/Box'
import OrderContent from './OrderContent/OrderContent'
export default function Order() {

  
  return (
    <div className={Style.super}>

      <Box/>
      <OrderContent/>
    </div>
  )
}
