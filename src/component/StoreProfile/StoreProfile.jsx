import React from 'react'
import Styles from './StoreProfile.module.css'
import Box from '../Box/Box'
import SoreProfileContent from './StoreProfileContent/SoreProfileContent'
export default function StoreProfile() {
  return (
    <div className={Styles.super}>
        <Box/>
      
        <SoreProfileContent/>
       
    </div>
  )
}
