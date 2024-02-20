import React from 'react';
import Style from './AllCategory.module.css';
import AllCategoryContent from './AllCategoryContent/AllCategoryContent';
import Box from '../Box/Box';

export default function AllCategory() {
  return (
    <div className={Style.super}>
      <Box />
      <AllCategoryContent />
    </div>
  );
}
