import React from 'react';
import Style from './DashBord.module.css';
import Box from '../Box/Box';
import Dashboard from './DashBordContent/DashBordContent';

export default function DashBord() {
  return (
    <div className={Style.super}>
<Box/>
<Dashboard/>
    </div>
  )
}
