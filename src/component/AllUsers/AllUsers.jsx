import React from 'react'
import Style from './AllUsers.module.css'
import Box from '../Box/Box'
import AllUsersContent from './AllUsersContent/AllUsersContent'
export default function AllUsers() {
  return (
    <div className={Style.super}>
<Box/>
<AllUsersContent/>

    </div>
  )
}
