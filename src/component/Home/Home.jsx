import React from 'react'
import Style from './Home.module.css'
import Box from '../Box/Box'
import HomeContent from './HomeContent/HomeContent'
export default function Home() {
  return (
    <div className={Style.super}>
      <Box/>
      <HomeContent/>

    </div>
  )
}
