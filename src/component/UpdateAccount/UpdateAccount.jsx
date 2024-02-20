import React from 'react'
import Style from './UpdateAccount.module.css'
import Box from '../Box/Box'
import UpdateAccountContent from './UpdateAccountContent/UpdateAccountContent'
export default function UpdateAccount() {
  return (
    <div className={Style.super}>
      <Box/>
      <UpdateAccountContent/>
    </div>
  )
}
