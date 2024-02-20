import React from 'react'
import Style from './PostProduct.module.css'
import Box from '../Box/Box'
import PostProductContent from './PostProductContent/PostProductContent'
export default function PostProduct() {
  return (
    <div className={Style.super}>
        <Box/>
<PostProductContent/>

    </div>
  )
}
