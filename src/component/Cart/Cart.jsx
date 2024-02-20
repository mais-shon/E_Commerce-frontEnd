import React from 'react'
import Style from './Cart.module.css';
import Box from '../Box/Box'
import CartContent from './CartContent/CartContent';
export default function Cart() {
  return (
    <div className={Style.super}>
        <Box/>
        <CartContent/>


    </div>
  )
}
