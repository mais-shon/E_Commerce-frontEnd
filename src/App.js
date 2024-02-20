import React, { useEffect, useState } from 'react';
import LayOut from './component/LayOut/LayOut';
import Welcome from './component/Welcome/Welcome';
import Logup from './component/Logup/Logup';
import Login from './component/Login/Login';
import NotFound from './component/NotFound/NotFound';
import {  RouterProvider, createBrowserRouter} from 'react-router-dom';

import  {jwtDecode}  from "jwt-decode";
import Home from './component/Home/Home';
import ProtectedRouter from './component/ProtectedRouter/ProtectedRouter'
import Box from './component/Box/Box';
import WishList from './component/WishList/WishList';
import UpdateAccount from './component/UpdateAccount/UpdateAccount';
import Order from './component/Order/Order';
import AllProduct from './component/AllProduct/AllProduct';
import Stores from './component/Stores/Stores';
import OrderCart from './component/OrderCart/OrderCart';
import StoreProfile from './component/StoreProfile/StoreProfile';
import SpecificProduct from './component/SpecificProduct/SpecificProduct';
import { CounterContextProvider } from './component/Context/CounterContext';
import CategoryStore from './component/CategoryStore/CategoryStore';
import StoreProduct from './component/StoreProduct/StoreProduct';
import PostProduct from './component/PostProduct/PostProduct';
import Cart from './component/Cart/Cart';
import DashBord from './component/DashBord/DashBord';
import AllCategory from './component/AllCategory/AllCategory';
import AllUsers from './component/AllUsers/AllUsers';
import CustomerReport from './component/CustomerReport/CustomerReport';
import StakeHolderOrders from './component/StakeHolderOrders/StakeHolderOrders';





function App() {
  let[user,setUser]=useState(null);


  function userToken(){
   let token =localStorage.getItem('userToken');
    let decoded=jwtDecode(token);
    setUser(decoded);
  }

  useEffect(()=>{
    if (localStorage.getItem('userToken')){
      userToken();
    }
  },[]);


 
  let routers=createBrowserRouter([
    {path:'Logup',element:<Logup/>},
    {path:'Login',element:<Login userToken={userToken}  />},
  
    {path:'',element:<LayOut  user={user}  setUser={setUser} />,children:[
      {index:true,element:<Welcome/>},
      {path: 'Box', element: <ProtectedRouter  user={user}><Box user={user}/></ProtectedRouter>},
      {path: 'Home', element: <ProtectedRouter  user={user}><Home/></ProtectedRouter>},
   //{path:'Home',element:<Home/>},
      {path:'*',element:<NotFound/>},
      {path:'Welcome',element:<Welcome/>},
      {path: 'WishList', element: <ProtectedRouter  user={user}><WishList user={user}/></ProtectedRouter>}, 
      {path: 'UpdateAccount', element: <ProtectedRouter  user={user}><UpdateAccount user={user}/></ProtectedRouter>}, 
      {path: 'Order', element: <ProtectedRouter  user={user}><Order user={user}/></ProtectedRouter>}, 
      {path: 'SpecificProduct/:id', element: <ProtectedRouter  user={user}><SpecificProduct user={user}/></ProtectedRouter>}, 
      {path:'AllProduct',element:<AllProduct/>},
      {path:'Stores',element:<Stores/>},
      {path: 'OrderCart', element: <ProtectedRouter  user={user}><OrderCart user={user}/></ProtectedRouter>}, 
      {path: 'StoreProfile', element: <ProtectedRouter  user={user}><StoreProfile user={user}/></ProtectedRouter>}, 
      {path: 'categorystore/:id', element: <ProtectedRouter  user={user}><CategoryStore user={user}/></ProtectedRouter>}, 
      {path: 'storeproduct/:id', element: <ProtectedRouter  user={user}><StoreProduct user={user}/></ProtectedRouter>}, 
      
      
      {path: 'postproduct', element: <ProtectedRouter  user={user}><PostProduct  user={user}/></ProtectedRouter>},
      {path: 'cart', element: <ProtectedRouter  user={user}><Cart  user={user}/></ProtectedRouter>},
   
      {path: 'dashbord', element: <ProtectedRouter  user={user}><DashBord  user={user}/></ProtectedRouter>},
      {path:'StakeHolderOrders',element:<StakeHolderOrders/>},
      {path:'allcategory',element:<AllCategory/>},
      {path:'allusers',element:<AllUsers/>},
      {path:'customerreport',element:<CustomerReport/>},

     
    
    
    ]}
  ])
  return (
   <CounterContextProvider>
      <RouterProvider router={routers}></RouterProvider>
      </CounterContextProvider>

  )
}

export default App;