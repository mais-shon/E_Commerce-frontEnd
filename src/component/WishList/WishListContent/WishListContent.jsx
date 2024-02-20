import React, { useEffect, useState } from 'react';
import Style from './WishListContent.module.css';
import Axios from 'axios';

export default function WishListContent() {
  const [wishListContent, setWishListContent] = useState([]);
  const token = localStorage.getItem('userToken');

  const getAllList = async () => {
    try {
      const { data } = await Axios.get('https://mais-gaduation.onrender.com/product/', {
        headers: { Authorization: `Mais__Hi${token}` },
      });
      setWishListContent(data.wishList);
    } catch (error) {
      console.error('Error fetching wish list content:', error);
    }
  };


  const removeFromWishlist = async (itemId) => {
    try {
      await Axios.delete(`https://mais-gaduation.onrender.com/product/removeFromWishlist/${itemId}`, {
        headers: { Authorization: `Mais__Hi${token}` },
      });

      // Update the local state to remove the item
      setWishListContent((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  useEffect(() => {
    getAllList();
  }, []);

  return (
    <div className="container">
      <div className={Style.head}>
        <h1>My favorite</h1>
      </div>
      <div className={Style.supper}>
        <div className="row">
          {wishListContent.map((element) => (
            <div className="col-4" key={element._id}>
              <div className={Style.card}>
                <div className="card" style={{ width: '20rem', height: '20rem' }}>
                  <img
                    className="card-img-top pt-2"
                    src={element.mainImage.secure_url}
                    style={{ width: '18rem', height: '15rem', margin: 'auto' }}
                    alt="Card image cap"
                  />
                  <div className="card-body ">
                    <div className={Style.head2}>
                      <h3 className="card-title w-100">{element.name}</h3>
                    </div>
                    <p className={Style.par}>{element.finalPrice}</p>
                    <div
                      className={Style.icon}
                      onClick={() => removeFromWishlist(element._id)}
                    >
                      <i className="fa-solid fa-heart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}