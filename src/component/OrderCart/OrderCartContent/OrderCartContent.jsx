import React, { useEffect, useState } from 'react';
import Style from './OrderCartContent.module.css';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function OrderCartContent() {
  const [OrderCartContent, setOrderCartContent] = useState([]);
  const token = localStorage.getItem('userToken');

  const getAllList = async () => {
    try {
      const { data } = await Axios.get('https://mais-gaduation.onrender.com/cart/', {
        headers: { Authorization: `Mais__Hi${token}` }
      });
      setOrderCartContent(data.cart.products);
    } catch (error) {
      console.error('Error fetching wish list content:', error);
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await Axios.patch(
        'https://mais-gaduation.onrender.com/cart/clearCart',
        null,
        {
          headers: { Authorization: `Mais__Hi${token}` }
        }
      );

      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleMakeOrderClick = () => {
    Swal.fire({
      title: 'Order Form',
      html: `
        <input id="swal-input-phone" class="swal2-input" required placeholder='Your Phone Number '>
        <input id="swal-input-address" class="swal2-input" required placeholder='Your Address'>
        <input id="swal-input-note" class="swal2-input"  required placeholder='Your Notes '>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        return {
          phoneNumber: document.getElementById('swal-input-phone').value,
          address: document.getElementById('swal-input-address').value,
          note: document.getElementById('swal-input-note').value
        };
      }
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await Axios.post(
            'https://mais-gaduation.onrender.com/order/',
            result.value,
            {
              headers: { Authorization: `Mais__Hi${token}` }
            }
          );
  
          if (response.data.message=='success') {
            console.log('Order placed successfully:', response.data);
            Swal.fire({
              icon: 'success',
              title: 'Order Placed Successfully!',
        
            });
          } else {
            console.error('Error placing order. Unexpected response:', response);
            Swal.fire({
              icon: 'error',
              title: 'Error Placing Order',
              text: 'An unexpected error occurred while placing the order.',
            });
          }
        } catch (error) {
          console.error('Error placing order:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error Placing Order',
            text: 'An error occurred while placing the order.',
          });
        }
      }
    });
  };
  
  useEffect(() => {
    getAllList();
  }, []);

  return (
    <div className={Style.superr}>

      <div className="container">
        <div className={Style.head}>
          <h1>My Order Cart</h1>
        </div>
        <div className={Style.supper}>
          <div className="row">
            {OrderCartContent.map((element) => (
              <div className="col-6 my-2" key={element.productId}>
                <div className="card" style={{ display: 'flex' }}>
                  <img
                    src={element.mainImage.secure_url}
                    alt="Small Picture"
                    style={{
                      paddingTop: '3%',
                      width: 200,
                      height: 150,
                      objectFit: 'contain',
                      borderRadius: '8px 0 0 8px'
                    }}
                  />
                  <div className="card-body" style={{ flexGrow: 1 }}>
                    <h5 className="card-header">{element.productName}</h5>
                    <div className="card-body">
                      <p className="card-text">
                        <strong>Color:</strong> {element.color}
                      </p>
                      <p className="card-text">
                        <strong>Size:</strong> {element.size}
                      </p>
                      <p className="card-text">
                        <strong>Quantity:</strong> {element.qty}
                      </p>
                      <button
                        type="button"
                        className="btn bg-secondary text-white"
                        onClick={clearCart}
                      >
                        Delete product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={Style.makeclear}>
            <div className={Style.MakeOrder}>
              <button
                type="button"
                className="btn bg-secondary text-white"
                onClick={handleMakeOrderClick}
              >
                Make Order
              </button>
            </div>
            <div className={Style.clear}>
              <button
                type="button"
                className="btn bg-secondary text-white"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
