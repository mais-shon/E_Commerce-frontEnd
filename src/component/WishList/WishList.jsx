import React from 'react';
import Box from '../Box/Box';
import Style from './WishList.module.css';
import WishListContent from './WishListContent/WishListContent';

export default function WishList() {
  return (
    <div className={Style.favorite}>
      <Box />
      <WishListContent  />
    </div>
  );
}