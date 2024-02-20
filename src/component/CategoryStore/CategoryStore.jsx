import React from 'react'
import Box from '../Box/Box'
import CategoryStoreContent from './CategoryStoreContent/CategoryStoreContent'
import Style from './CategoryStore.module.css'
export default function CategoryStore() {
  return (
    <div className={Style.super}>
        <Box />
        <CategoryStoreContent/>
    </div>
  )
}
