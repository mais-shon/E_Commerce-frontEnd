import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Style from './OrderContent.module.css';

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const token = localStorage.getItem('userToken');

  const getOrderHistory = async () => {
    try {
      const { data } = await Axios.get('https://mais-gaduation.onrender.com/order/getCustomerOrders', {
        headers: { Authorization: `Mais__Hi${token}` }
      });

      console.log(data);

      setOrderHistory(data.order); // Assuming your data has an 'order' property
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, [token]);

  return (
    <div className={Style.super}>
      <div className={Style.head}>
        <h1>My Orders</h1>
      </div>
      <div className={Style.content}>
        <ul>
          {orderHistory.map((order, index) => (
            <li key={order._id} className={Style.order}>
              <div className={Style.contain}>
                <p>Order number: {index + 1}</p>
                <p>Status: {order.status}</p>
                {order.products.map((product, productIndex) => (
                  <div key={productIndex}>
                    <p>Product {productIndex + 1} - finalPrice: {product.finalPrice}</p>
                  </div>
                ))}
                <p>Note: {order.note}</p>
              </div>
              <div className={Style.cancel} style={{ display: 'flex', alignItems: 'center' }}>
                <button className={Style.cancell}>Cancel this order</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
