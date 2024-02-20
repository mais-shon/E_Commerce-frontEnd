import React, { useEffect, useState } from 'react';
import Style from './StakeHolderOrderContent.module.css';
import axios from 'axios';

export default function StakeHolderOrderContent() {
  let [orders, setOrders] = useState([]);
  let token = localStorage.getItem('userToken');

  async function displayorder() {
    let { data } = await axios.get('https://mais-gaduation.onrender.com/order/', {
      headers: { Authorization: `Mais__Hi${token}` },
    });
    setOrders(data.orders);
  }

  useEffect(() => {
    displayorder();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {

    console.log(orderId)
    try {
      // Make an API call to update the order status
      await axios.patch(
        `https://mais-gaduation.onrender.com/order/updateStatus/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: { Authorization: `Mais__Hi${token}` },
        }
      );
      // Update the local state with the updated order status
      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      );

      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    // Implement cancel order logic here, if needed
    console.log('Order canceled:', orderId);
  };

  return (
    <div className={Style.super}>
      <h1 className={Style.head}>My Orders</h1>
      <div className={Style.content}>
        <ul>
          {orders.map((order, index) => (
            <li key={order.orderId} className={Style.order}>
              <div className={Style.contain}>
                <p>Order number: {index + 1}</p>

                <p>Note: {order.note}</p>
        
                <label htmlFor={`statusSelect-${order.orderId}`}>Status:</label>
              
              <select className='mx-2'
                id={`statusSelect-${order.orderId}`}
                value={order.status}
                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="onWay">On Way</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
                <option value="approved">Approved</option>
                {/* Add more options as needed */}
              </select>
              </div>
              <div className={Style.cancel} style={{ display: 'flex', alignItems: 'center' }}>
                {order.status === 'Pending' && (
                  <button className={Style.cancell} onClick={() => cancelOrder(order.orderId)}>
                    Cancel this order
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
